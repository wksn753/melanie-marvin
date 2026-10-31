/** Pure validation; safe to unit-test without a database or HTTP server. */
export interface RsvpInput {
  name: string;
  email: string | null;
  attending: boolean;
  guests: number;
  dietary: string | null;
  message: string | null;
}

function text(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const normal = value.normalize("NFC").trim();
  if (normal.length > maxLength || /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u.test(normal)) return null;
  return normal;
}

export function validateRsvp(value: unknown): { ok: true; data: RsvpInput } | { ok: false } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { ok: false };
  const body = value as Record<string, unknown>;
  const name = text(body.name, 120);
  const email = text(body.email, 180);
  const dietary = text(body.dietary, 300);
  const message = text(body.message, 1000);

  if (!name || name.length < 2 || email === null || dietary === null || message === null) return { ok: false };
  if (email && !/^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/u.test(email)) return { ok: false };
  if (typeof body.attending !== "boolean") return { ok: false };
  if (typeof body.guests !== "number" || !Number.isInteger(body.guests)) return { ok: false };
  if (body.attending && (body.guests < 1 || body.guests > 6)) return { ok: false };
  if (!body.attending && body.guests !== 0) return { ok: false };
  return {
    ok: true,
    data: {
      name,
      email: email || null,
      attending: body.attending,
      guests: body.guests,
      dietary: dietary || null,
      message: message || null,
    },
  };
}

/** Prefix spreadsheet formulas to prevent CSV formula injection in Excel/Sheets. */
export function csvCell(value: unknown): string {
  const original = String(value ?? "");
  const safe = /^[\s\uFEFF]*[=+@\-\t\r\n]/u.test(original) ? `'${original}` : original;
  return `"${safe.replace(/"/g, '""')}"`;
}
