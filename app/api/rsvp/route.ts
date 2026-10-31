import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { rateLimitIdentity, readSmallJson, sameOrigin, verifyTurnstile } from "@/lib/rsvp-security";
import { validateRsvp } from "@/lib/rsvp-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return json({ error: "Request origin not allowed." }, 403);
  const db = getDb();
  const identity = rateLimitIdentity(request);
  if (!db || !identity) return json({ error: "RSVPs are not available yet. Please contact the couple directly." }, 503);

  let payload: unknown;
  try { payload = await readSmallJson(request); }
  catch { return json({ error: "Please check your response and try again." }, 400); }
  const input = validateRsvp(payload);
  if (!input.ok) return json({ error: "Please review your details and try again." }, 400);
  const body = payload as Record<string, unknown>;
  if (typeof body.website === "string" && body.website.length > 0) return json({ ok: true }, 200); // Bot honeypot

  const configuredOrigin = process.env.SITE_ORIGIN || request.nextUrl.origin;
  const token = typeof body.captchaToken === "string" ? body.captchaToken : "";
  if (!(await verifyTurnstile(token, configuredOrigin))) return json({ error: "Please complete the verification and retry." }, 400);

  const client = await db.connect().catch(() => null);
  if (!client) return json({ error: "We could not receive your response right now." }, 503);
  try {
    await client.query("BEGIN");
    // Shared PostgreSQL-backed fixed window, atomic even across multiple app instances.
    // 6 successful RSVPs per hourly bucket (unverified IP -> shared conservative bucket).
    const limit = await client.query(
      `INSERT INTO melanie_marvin.rsvp_rate_limits (bucket_key, hits, expires_at)
       VALUES ($1, 1, now() + interval '1 hour')
       ON CONFLICT (bucket_key) DO UPDATE
       SET hits = CASE WHEN melanie_marvin.rsvp_rate_limits.expires_at < now()
            THEN 1 ELSE melanie_marvin.rsvp_rate_limits.hits + 1 END,
           expires_at = CASE WHEN melanie_marvin.rsvp_rate_limits.expires_at < now()
            THEN now() + interval '1 hour' ELSE melanie_marvin.rsvp_rate_limits.expires_at END
       WHERE melanie_marvin.rsvp_rate_limits.expires_at < now()
          OR melanie_marvin.rsvp_rate_limits.hits < 6
       RETURNING hits`, [identity],
    );
    if (limit.rowCount === 0) {
      await client.query("ROLLBACK");
      return json({ error: "Too many responses from this connection. Please try again later." }, 429);
    }
    const { data } = input;
    await client.query(
      `INSERT INTO melanie_marvin.rsvps (full_name, email, attending, guests, dietary_notes, message)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [data.name, data.email, data.attending, data.guests, data.dietary, data.message],
    );
    await client.query("COMMIT");
    return json({ ok: true }, 201);
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    // No guest PII in the log or response.
    console.error("RSVP persistence failure", error instanceof Error ? error.message : "Unknown error");
    return json({ error: "We could not save your RSVP. Please try again later." }, 500);
  } finally { client.release(); }
}
