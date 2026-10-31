/**
 * MELANIE & MARVIN — wedding details.
 * Fill in the confirmed date and venue when available. An unknown date stays unknown
 * everywhere (including the countdown and calendar), never a made-up example.
 * If the ceremony is in Uganda, use an explicit +03:00 offset in dateTime.
 */
export const wedding = {
  couple: {
    first: "Melanie",
    second: "Marvin",
    tagline: "Our next chapter begins with love.",
    story: "We are so grateful for the love and encouragement of the people who surround us. It would mean the world to have you celebrate the beginning of our married life with us. We can't wait to share this special day with you.",
  },
  // Example when confirmed: "2027-06-19T15:00:00+03:00"
  dateTime: null as string | null,
  timezone: "Africa/Kampala",
  city: "Location to be announced",
  venue: {
    name: "Venue to be announced",
    address: "Full details will be shared soon",
    mapUrl: "",
  },
  message: "Together with our families, we warmly invite you to celebrate the beginning of our forever.",
  // Replace these placeholders with the actual order and times once confirmed.
  program: [
    { time: "TBA", name: "Wedding ceremony", detail: "Together, we say 'I do'" },
    { time: "TBA", name: "Photographs & refreshments", detail: "Moments we'll treasure" },
    { time: "TBA", name: "Reception & celebration", detail: "Good food, music and dancing" },
  ],
  dressCode: "To be announced",
  // Example: "2027-05-30"; hide RSVP deadline when not yet set.
  rsvpDeadline: null as string | null,
  contact: "",
  // Add actual photographs when they are supplied. An empty gallery has an intentional
  // botanical editorial state instead of broken requests or fake-photo placeholders.
  gallery: [] as Array<{
    src: string;
    alt: string;
    caption: string;
    shape: "large" | "small" | "wide";
  }>,
  faq: [
    { q: "When should I arrive?", a: "Arrival instructions and ceremony time will be shared once the details are confirmed." },
    { q: "Can I bring a plus-one?", a: "Please include only guests covered by your invitation when submitting your RSVP." },
    { q: "How will I find the venue?", a: "We'll update this page with the address and directions as soon as the venue is confirmed." },
  ],
} as const;
