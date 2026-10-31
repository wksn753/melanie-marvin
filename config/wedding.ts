/**
 * MARVIN & MELANIE — wedding details.
 * Fill in the confirmed date and venue when available. An unknown date stays unknown
 * everywhere (including the countdown and calendar), never a made-up example.
 * If the ceremony is in Uganda, use an explicit +03:00 offset in dateTime.
 */
export const wedding = {
  couple: {
    first: "Marvin",
    second: "Melanie",
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
  // Put licensed music under public/audio and update soundtrackOptions in components/Soundtrack.tsx.
  // The supplied Garden Waltz is an original short demo, not a commercial recording.
  // Example: "2027-05-30"; hide RSVP deadline when not yet set.
  rsvpDeadline: null as string | null,
  contact: "",
  // The five real photographs supplied for this invitation (optimized local WebP files).
  gallery: [
    { src: "/photos/marvin-melanie-laughter.webp", alt: "Marvin carries Melanie by the water as they share a playful moment", caption: "All the little joys", shape: "large" },
    { src: "/photos/marvin-melanie-dancing.webp", alt: "Marvin and Melanie laughing and dancing by the water", caption: "Better together", shape: "small" },
    { src: "/photos/melanie-golden-hour.webp", alt: "Melanie reaches back with a smile in the golden evening light", caption: "Golden hour", shape: "small" },
    { src: "/photos/marvin-melanie-joy.webp", alt: "Marvin and Melanie sharing a happy moment on the waterfront", caption: "Simply us", shape: "wide" },
    { src: "/photos/marvin-melanie-beach.webp", alt: "Marvin and Melanie looking down together near the beach", caption: "Our next chapter", shape: "wide" },
  ] as Array<{src:string;alt:string;caption:string;shape:"large"|"small"|"wide"}>,
  faq: [
    { q: "When should I arrive?", a: "Arrival instructions and ceremony time will be shared once the details are confirmed." },
    { q: "Can I bring a plus-one?", a: "Please include only guests covered by your invitation when submitting your RSVP." },
    { q: "How will I find the venue?", a: "We'll update this page with the address and directions as soon as the venue is confirmed." },
  ],
} as const;
