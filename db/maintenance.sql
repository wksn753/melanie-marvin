-- Optional scheduled maintenance; removes expired HMAC rate-limit records.
DELETE FROM melanie_marvin.rsvp_rate_limits WHERE expires_at < now() - interval '7 days';

-- Privacy retention: review with the couple and specify a date before enabling.
-- Example ONLY; do not enable without approval:
-- DELETE FROM melanie_marvin.rsvps WHERE created_at < TIMESTAMPTZ '2028-01-01T00:00:00Z';
