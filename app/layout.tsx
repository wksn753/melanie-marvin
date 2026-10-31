import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-wedding-serif", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-wedding-sans", display: "swap" });
import { wedding } from "@/config/wedding";
import "./globals.css";

const title = `${wedding.couple.first} & ${wedding.couple.second} | Our Wedding`;
export const metadata: Metadata = {
  title,
  description: `The wedding celebration of ${wedding.couple.first} and ${wedding.couple.second}. Details, photos and RSVP in one place.`,
  robots: process.env.ALLOW_INDEXING === "true" ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { title, description: wedding.message, type: "website" },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Per-request rendering is necessary for a nonce-based CSP.
  await headers();
  return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}>{children}</body></html>;
}
