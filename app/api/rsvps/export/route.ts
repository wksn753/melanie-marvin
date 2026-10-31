import { type NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { equalSecret } from "@/lib/rsvp-security";
import { csvCell } from "@/lib/rsvp-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const provided = request.headers.get("authorization")?.match(/^Bearer (\S+)$/i)?.[1] ?? "";
  if (!equalSecret(process.env.ADMIN_EXPORT_TOKEN, provided))
    return Response.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  const db = getDb();
  if (!db) return Response.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const cols = ["created_at", "full_name", "email", "attending", "guests", "dietary_notes", "message"] as const;
    const { rows } = await db.query(
      `SELECT created_at, full_name, email, attending, guests, dietary_notes, message
       FROM melanie_marvin.rsvps ORDER BY created_at DESC LIMIT 10000`,
    );
    const csv = [cols.join(","), ...rows.map((row: Record<string, unknown>) => cols.map((col) => csvCell(row[col] instanceof Date ? (row[col] as Date).toISOString() : row[col])).join(","))].join("\r\n");
    return new Response(`\uFEFF${csv}`, { headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="melanie-marvin-rsvps.csv"',
      "Cache-Control": "no-store, private",
      "X-Content-Type-Options": "nosniff",
    } });
  } catch (error) {
    console.error("RSVP export failed", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "Export is temporarily unavailable" }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
