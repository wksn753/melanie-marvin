/**
 * Marvin & Melanie — wedding details. Times are intentionally not invented.
 * The midnight timestamp anchors the countdown to the calendar DATE in Kampala;
 * it is not the start time of the church ceremony.
 */
export const wedding = {
  couple: {
    first: "Marvin",
    second: "Melanie",
    tagline: "Our next chapter begins with love.",
    story: "Some moments feel like sunshine, others like the sweetest kind of adventure. Through it all, we have found a joy worth celebrating. We would love to share the beginning of this new chapter with the people who mean so much to us.",
  },
  date: "2027-05-01",
  dateTime: "2027-05-01T00:00:00+03:00",
  timezone: "Africa/Kampala",
  city: "Kampala, Uganda",
  ceremony: {
    name: "All Saints Cathedral",
    address: "Nakasero, Kampala, Uganda",
    label: "Church ceremony",
    time: null as string | null,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=All+Saints+Cathedral+Nakasero+Kampala+Uganda",
  },
  reception: {
    name: "Naguru Gardens",
    address: "Naguru, Kampala, Uganda",
    label: "Wedding reception",
    time: null as string | null,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Naguru+Gardens+Kampala+Uganda",
  },
  message: "Together with our families, we warmly invite you to witness our vows and share in the celebration of our marriage.",
  program: [
    { time: "Time to follow", name: "Church ceremony", detail: "All Saints Cathedral, Nakasero" },
    { time: "After the ceremony", name: "Wedding reception", detail: "Naguru Gardens" },
  ],
  dressCode: "Dress code details will be shared soon.",
  rsvpDeadline: null as string | null,
  contact: "",
  /** The two photographs in the central gallery; three more appear throughout the page. */
  gallery: [
    { src: "/photos/melanie-golden-hour.webp", alt: "Melanie smiling by the water in warm golden sunlight", caption: "Golden-hour glow", shape: "portrait" },
    { src: "/photos/marvin-melanie-joy.webp", alt: "Marvin and Melanie smiling and laughing together near the waterfront", caption: "The joy of us", shape: "landscape" },
  ] as Array<{src:string;alt:string;caption:string;shape:"portrait"|"landscape"}>,
  faq: [
    { q: "When is the wedding?", a: "Saturday, 1 May 2027. The ceremony and reception times will be announced." },
    { q: "Where is the church ceremony?", a: "All Saints Cathedral in Nakasero, Kampala." },
    { q: "Where will the reception be held?", a: "Naguru Gardens, Kampala, after the church ceremony." },
    { q: "Can I bring a plus-one?", a: "Please include only guests covered by your invitation when submitting your RSVP." },
  ],
} as const;
