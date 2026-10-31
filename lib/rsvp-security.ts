import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { isIP } from "node:net";
import type { NextRequest } from "next/server";

export function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin" && site !== "none") return false;
  let expected: string;
  try { expected = new URL(process.env.SITE_ORIGIN || request.nextUrl.origin).origin; }
  catch { return false; }
  return !origin || origin === expected;
}

export function equalSecret(configured: string | undefined, supplied: string): boolean {
  if (!configured || Buffer.byteLength(configured) < 32) return false;
  const a = Buffer.from(configured);
  const b = Buffer.from(supplied);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function rateLimitIdentity(request: NextRequest): string | null {
  const secret = process.env.RATE_LIMIT_SECRET;
  if (!secret || secret.length < 32) return null;
  // Only trust this header if your gateway OVERWRITES it (never forwards user input).
  const allegedIp = process.env.TRUST_PROXY_HEADERS === "true" ? request.headers.get("x-real-ip") : null;
  const address = allegedIp && isIP(allegedIp.trim()) ? allegedIp.trim() : "unidentified-client";
  // Retain no IP in Postgres. The HMAC can be rotated to invalidate existing buckets.
  return createHmac("sha256", secret).update(`rsvp:v1:${address}`).digest("hex");
}

export async function readSmallJson(request: NextRequest, limit = 8192): Promise<unknown> {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") throw Error("Invalid content type");
  const declared = request.headers.get("content-length");
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > limit)) throw Error("Payload too large");
  if (!request.body) throw Error("Empty request");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let used = 0;
  try {
    for (;;) {
      const part = await reader.read();
      if (part.done) break;
      used += part.value.byteLength;
      if (used > limit) throw Error("Payload too large");
      chunks.push(part.value);
    }
  } finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

/** Verification happens server-side. A missing verifier is permitted for local development only. */
export async function verifyTurnstile(token: string, expectedOrigin: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return !process.env.TURNSTILE_SITE_KEY;
  if (!process.env.TURNSTILE_SITE_KEY) return false;
  if (!token || token.length > 2048) return false;
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!response.ok) return false;
    const result: unknown = await response.json();
    if (!result || typeof result !== "object") return false;
    const verdict = result as { success?: unknown; hostname?: unknown };
    return verdict.success === true && (typeof verdict.hostname !== "string" || verdict.hostname === new URL(expectedOrigin).hostname);
  } catch { return false; }
}
