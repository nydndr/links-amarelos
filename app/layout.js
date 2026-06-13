import {
  Geist,
  Geist_Mono,
  Manrope,
  Unbounded,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import AgentationWidget from "./agentation-widget";
import LogoOdometer from "./components/LogoOdometer";

import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Links Amarelos",
  description: "Links Amarelos",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${unbounded.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <nav className="border-b border-(--amarelo) py-3 px-6 flex justify-between items-center">
        <div className="text-white">
          <LogoOdometer />
        </div>

        <div className="flex gap-2 text-sm">
          <Link href="https://amarelodandara.substack.com">
            <p className="text-white bg-red-200 lowercase px-2 py-1 rounded-full">
              Substack
            </p>
          </Link>
          <Link href="https://open.spotify.com/show/043Gs7eyY2KOlotEWSTSxB?si=e7abf2b9730747d7">
            <p className="text-white bg-red-200 lowercase px-2 py-1 rounded-full">
              Spotify
            </p>
          </Link>
          <p>Apoie</p>
        </div>
      </nav>
      <body className="min-h-full flex flex-col">
        {children}
        <AgentationWidget />
      </body>
    </html>
  );
}
