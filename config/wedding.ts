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
  gallery: [
    { src: "/photos/photo-1.jpg", alt: "Melanie and Marvin together", caption: "The beginning of always", shape: "large" },
    { src: "/photos/photo-2.jpg", alt: "Melanie and Marvin sharing a moment", caption: "Little moments, big love", shape: "small" },
    { src: "/photos/photo-3.jpg", alt: "Melanie and Marvin on an adventure", caption: "Our favorite adventures", shape: "small" },
    { src: "/photos/photo-4.jpg", alt: "A favorite photo of Melanie and Marvin", caption: "And everything in between", shape: "wide" },
  ],
  faq: [
    { q: "When should I arrive?", a: "Arrival instructions and ceremony time will be shared once the details are confirmed." },
    { q: "Can I bring a plus-one?", a: "Please include only guests covered by your invitation when submitting your RSVP." },
    { q: "How will I find the venue?", a: "We'll update this page with the address and directions as soon as the venue is confirmed." },
  ],
} as const;
