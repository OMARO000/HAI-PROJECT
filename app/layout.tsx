import type { Metadata } from "next";
import { Barlow_Condensed, Barlow, IBM_Plex_Mono, Caveat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HAI Project — Honorable AI Standard",
    template: "%s | HAI Project",
  },
  description: "The standard is public. The record is permanent. A nine-pillar framework for AI that is transparent, accountable, and genuinely built for people.",
  metadataBase: new URL("https://haiproject.xyz"),
  themeColor: "#0B1929",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlowCondensed.variable} ${barlow.variable} ${ibmPlexMono.variable} ${caveat.variable} antialiased min-h-screen flex flex-col`}
      >
        <Nav />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
