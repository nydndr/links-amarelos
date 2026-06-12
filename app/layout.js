import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AgentationWidget from "./agentation-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Links Amarelos",
  description: "Links Amarelos",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <nav className="border-b border-(--amarelo) py-3 px-6 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <div className="bg-(--amarelo) size-8 rounded-full"></div>

            <p className="text-lg">links amarelos</p>
          </div>
        </div>

        <div className="flex gap-2 text-sm">
          <p>Barra de pesquisa</p>
          <p>Documentação</p>
          <p>Blog</p>
          <p>Showcase</p>
          <p>Apoiadores</p>
          <p>Plus</p>
          <p>Substack</p>
          <p>Spotify</p>
        </div>
      </nav>
      <body className="min-h-full flex flex-col">
        {children}
        <AgentationWidget />
      </body>
    </html>
  );
}
