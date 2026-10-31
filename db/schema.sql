-- Apply using a privileged migration role, not the shared Postgres public schema.
-- Grant the runtime account access ONLY to this schema and its necessary tables.
BEGIN;
CREATE SCHEMA IF NOT EXISTS melanie_marvin;
CREATE TABLE IF NOT EXISTS melanie_marvin.rsvps (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name VARCHAR(120) NOT NULL CHECK (char_length(full_name) >= 2),
  email VARCHAR(180),
  attending BOOLEAN NOT NULL,
  guests INTEGER NOT NULL CHECK (guests BETWEEN 0 AND 6),
  dietary_notes VARCHAR(300),
  message VARCHAR(1000),
  CONSTRAINT rsvp_attendance_consistency CHECK ((attending AND guests >= 1) OR (NOT attending AND guests = 0))
);
CREATE INDEX IF NOT EXISTS idx_mm_rsvp_created ON melanie_marvin.rsvps (created_at DESC);
CREATE TABLE IF NOT EXISTS melanie_marvin.rsvp_rate_limits (
  bucket_key CHAR(64) PRIMARY KEY,
  hits INTEGER NOT NULL CHECK (hits >= 1),
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_mm_rl_expiration ON melanie_marvin.rsvp_rate_limits (expires_at);
COMMIT;

-- Optional, run after creating a dedicated login (replace name):
-- GRANT USAGE ON SCHEMA melanie_marvin TO melanie_marvin_app;
-- GRANT SELECT, INSERT ON melanie_marvin.rsvps TO melanie_marvin_app;
-- GRANT USAGE, SELECT ON SEQUENCE melanie_marvin.rsvps_id_seq TO melanie_marvin_app;
-- GRANT SELECT, INSERT, UPDATE ON melanie_marvin.rsvp_rate_limits TO melanie_marvin_app;
-- Never grant access to anon/authenticated roles on shared Supabase installations.
