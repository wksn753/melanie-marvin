"use client";

import { type FormEvent, useState } from "react";
import Script from "next/script";

type SubmissionStatus = "idle" | "sending" | "success" | "error";

export function RSVPForm({ siteKey }: { siteKey: string }) {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState("1");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          attending: attending === "yes",
          guests: attending === "yes" ? Number(guestCount) : 0,
          dietary: String(data.get("dietary") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
          website: String(data.get("website") ?? ""),
          captchaToken: String(data.get("cf-turnstile-response") ?? ""),
        }),
      });
      const result: unknown = await response.json();
      const error = typeof result === "object" && result !== null && "error" in result && typeof result.error === "string" ? result.error : null;
      if (!response.ok) throw new Error(error || "Unable to save your RSVP. Please try again.");
      setStatus("success");
      setMessage("Thank you! Your RSVP has been recorded. We can’t wait to celebrate together.");
      form.reset();
      setAttending("yes");
      setGuestCount("1");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      if (siteKey) {
        // A Turnstile token is single-use; allow a fresh challenge on retry.
        const turnstile = (window as Window & { turnstile?: { reset(): void } }).turnstile;
        turnstile?.reset();
      }
    }
  }

  return <form className="rsvp-form" onSubmit={submit}>
    <div className="rsvp-choices" role="group" aria-label="Will you attend?">
      <button type="button" className={attending === "yes" ? "selected" : ""} aria-pressed={attending === "yes"} onClick={() => setAttending("yes")}>Joyfully accepts</button>
      <button type="button" className={attending === "no" ? "selected" : ""} aria-pressed={attending === "no"} onClick={() => setAttending("no")}>Regretfully declines</button>
    </div>
    <div className="form-row">
      <label>Full name <span>*</span><input name="name" maxLength={120} minLength={2} placeholder="Your full name" required autoComplete="name"/></label>
      <label>Email address <small>(optional)</small><input name="email" type="email" maxLength={180} placeholder="you@example.com" autoComplete="email"/></label>
    </div>
    {attending === "yes" && <div className="form-row">
      <label>Number attending <span>*</span><select value={guestCount} onChange={(event) => setGuestCount(event.target.value)} aria-label="Number of people attending">{[1,2,3,4,5,6].map(n => <option value={n} key={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}</select></label>
      <label>Dietary notes <small>(optional)</small><input name="dietary" placeholder="Allergies or preferences" maxLength={300}/></label>
    </div>}
    <label>Leave a little note <small>(optional)</small><textarea name="message" rows={3} maxLength={1000} placeholder="A message for the happy couple..."/></label>
    <div className="visually-hidden" aria-hidden="true"><label>Website <input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    {siteKey && <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/>
      <div className="captcha-control"><div className="cf-turnstile" data-sitekey={siteKey} data-theme="light"/></div>
    </>}
    <p className="rsvp-privacy-note">Your reply is shared only with the couple and their wedding organizers. Please share dietary details only if needed.</p>
    <button className="primary-button rsvp-submit" disabled={status === "sending" || status === "success"} type="submit">
      {status === "sending" ? "Sending your reply…" : status === "success" ? "RSVP received ✓" : "Send your RSVP"}
      {status !== "success" && <span aria-hidden="true">↗</span>}
    </button>
    {message && <p className={`form-feedback ${status}`} role="status" aria-live="polite">{message}</p>}
  </form>;
}
