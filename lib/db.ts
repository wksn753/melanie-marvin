import "server-only";
import { Pool } from "pg";

// Avoid per-request pools (which exhaust Postgres connections in serverless hosts).
const globalPg = globalThis as unknown as { weddingPg?: Pool };

export function getDb(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!globalPg.weddingPg) {
    globalPg.weddingPg = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 4,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
      statement_timeout: 5_000,
      application_name: "melanie-marvin-wedding",
    });
    // A pool error should not crash the app without a diagnostic.
    globalPg.weddingPg.on("error", (error) => console.error("RSVP database connection error:", error.message));
  }
  return globalPg.weddingPg;
}
