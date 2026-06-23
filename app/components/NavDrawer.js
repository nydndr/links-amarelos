"use client";

import { useState } from "react";
import Link from "next/link";

const pages = [
  {
    href: "/sobre",
    label: "Sobre",
    tagline: "Conheça a história, leia o manifesto",
  },
  {
    href: "/apoio",
    label: "Apoio",
    tagline: "Faça parte da comunidade",
  },
  {
    href: "/realizacoes",
    label: "Realizações",
    tagline: "Descubra o que o apoio ajuda a realizar",
  },
];

export default function NavDrawer({
  strokeWidth = 1.5,
  strokeColor = "currentColor",
  size = 20,
}) {
  const [open, setOpen] = useState(false);

  const pad = size * 0.1;
  const x1 = pad;
  const x2 = size - pad;
  const yTop = size * 0.25;
  const yMid = size * 0.5;
  const yBot = size * 0.75;
  const gap = size * 0.25;

  const cls = (name) => `hb-line ${name}${open ? " open" : ""}`;

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        className="flex justify-center items-center size-9 cursor-pointer"
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          className="text-(--amarelo-dark)"
          style={{ "--hb-gap": `${gap}px` }}
        >
          <line
            className={cls("hb-top")}
            x1={x1} y1={yTop} x2={x2} y2={yTop}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <line
            className={cls("hb-mid")}
            x1={x1} y1={yMid} x2={x2} y2={yMid}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <line
            className={cls("hb-bot")}
            x1={x1} y1={yBot} x2={x2} y2={yBot}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        className={`absolute left-0 right-0 top-full z-50 border-b border-(--amarelo) bg-amber-200 transition-[opacity,transform] duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col">
          {pages.map(({ href, label, tagline }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex px-6 py-3 font-manrope items-center gap-2 [&:not(:last-child)]:border-b border-(--amarelo) hover:bg-(--amarelo) group text-(--amarelo-dark)"
            >
              <span className="font-semibold lowercase text-lg tracking-tight group-hover:text-white transition-colors">
                {label}
              </span>
              <span className="group-hover:text-white transition-colors mt-0.5 lowercase">
                {tagline}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
