import {
  Geist,
  Geist_Mono,
  Inter,
  Manrope,
  Unbounded,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import AgentationWidget from "./agentation-widget";
import LogoOdometer from "./components/LogoOdometer";

import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${unbounded.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="border-b border-(--amarelo) py-3 px-6 flex justify-between items-center">
          <Link href="/" className="text-(--amarelo)">
            <LogoOdometer />
          </Link>

          <div className="flex gap-2 text-sm items-center">
            <Link
              href="https://amarelodandara.substack.com"
              className="lowercase flex gap-2 items-center rounded-full px-3 py-1 bg-stone-400/10 border border-orange-400/50  text-orange-800"
            >
              <div className="size-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  imageRendering="optimizeQuality"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  viewBox="0 0 448 511.471"
                >
                  <path
                    fill="#FF681A"
                    d="M0 0h448v62.804H0V0zm0 229.083h448v282.388L223.954 385.808 0 511.471V229.083zm0-114.542h448v62.804H0v-62.804z"
                  />
                </svg>
              </div>
              <p className="font-space-mono">Leia</p>
            </Link>
            <Link
              href="https://open.spotify.com/show/043Gs7eyY2KOlotEWSTSxB?si=e7abf2b9730747d7"
              className="lowercase flex gap-2 items-center rounded-full px-3 py-1 bg-stone-400/10 border border-green-400/50  text-green-800"
            >
              <div className="size-4 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  imageRendering="optimizeQuality"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M32 0C14.3 0 0 14.337 0 32c0 17.7 14.337 32 32 32 17.7 0 32-14.337 32-32S49.663 0 32 0zm14.68 46.184c-.573.956-1.797 1.223-2.753.65-7.532-4.588-16.975-5.62-28.14-3.097-1.07.23-2.14-.42-2.37-1.49s.42-2.14 1.49-2.37c12.196-2.79 22.67-1.606 31.082 3.556a2 2 0 0 1 .688 2.753zm3.9-8.717c-.726 1.185-2.256 1.53-3.44.84-8.602-5.276-21.716-6.805-31.885-3.747-1.338.382-2.714-.344-3.097-1.644-.382-1.338.344-2.714 1.682-3.097 11.622-3.517 26.074-1.835 35.976 4.244 1.147.688 1.49 2.217.765 3.403zm.344-9.1c-10.323-6.117-27.336-6.69-37.2-3.708-1.568.497-3.25-.42-3.747-1.988s.42-3.25 1.988-3.747c11.317-3.44 30.127-2.753 41.98 4.282 1.415.84 1.873 2.676 1.032 4.09-.765 1.453-2.638 1.912-4.053 1.07z"
                    fill="#1ed760"
                  />
                </svg>
              </div>
              <p className="font-space-mono">Ouça</p>
            </Link>
            <Link
              href="/apoio"
              className="font-space-mono font-bold flex px-4 py-2 bg-(--amarelo) rounded-full lowercase tracking-wide text-amber-50 items-center"
            >
              <p>Apoie</p>
            </Link>
          </div>
        </nav>
        <div className="flex-1 bg-[url('/bg-texture.svg')] bg-repeat">
          {children}
        </div>
        <AgentationWidget />
      </body>
    </html>
  );
}
