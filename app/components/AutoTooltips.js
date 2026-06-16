"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const WORDS = [
  {
    key: "textos",
    label: "Biscoito Passatempo",
    meta: "Valter Nascimento",
    href: "https://open.substack.com/pub/valternascimento/p/biscoito-passatempo-dinossauros-e?utm_source=share&utm_medium=android&r=2x1xhg",
  },
  {
    key: "livros",
    label: "O Que Eu Comi Em Um Ano",
    meta: "Stanley Tucci",
    href: "https://www.amazon.com.br/que-comi-ano-outras-reflex%C3%B5es/dp/8551013416",
  },
  {
    key: "documentários",
    label: "Dahomey",
    meta: "Mati Diop",
    href: "https://letterboxd.com/film/dahomey/",
  },
  {
    key: "coisas",
    label: "microbaile.js",
    meta: "Ivan Souto",
    href: "https://ivansouto.github.io/microbaile/",
  },
];

function Tooltip({ word, active, duration, onMouseEnter, onMouseLeave }) {
  return (
    <span
      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-10 w-48 ${
        active
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-1 scale-95 pointer-events-none"
      }`}
      style={{
        transformOrigin: "bottom center",
        transition: `opacity ${duration}ms cubic-bezier(0.23,1,0.32,1), transform ${duration}ms cubic-bezier(0.23,1,0.32,1)`,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={word.href}
        className="relative block bg-white border border-amber-200 rounded-sm px-3 py-2.5 no-underline"
      >
        <span className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-r border-b border-amber-200 rotate-45" />
        <span className="block font-manrope font-bold tracking-tight text-sm text-stone-900 leading-tight">
          {word.label}
        </span>
        <span className="block font-space-mono text-[10px] uppercase tracking-wider text-amber-600 mt-1">
          {word.meta}
        </span>
      </Link>
    </span>
  );
}

function TooltipWord({ word, index, activeIdx, duration, stop, start }) {
  const active = activeIdx === index;
  return (
    <span className="relative inline-block">
      <span
        className={`font-space-mono tracking-tighter transition-colors ${
          active ? "text-amber-100" : "text-current"
        }`}
        style={{ transitionDuration: `${duration}ms` }}
      >
        {word.key}
      </span>
      <Tooltip
        word={word}
        active={active}
        duration={duration}
        onMouseEnter={stop}
        onMouseLeave={start}
      />
    </span>
  );
}

// null = breathing pause (no tooltip), numbers = word index
const SEQUENCE = [null, 0, 1, 2, 3];
const WORD_DURATION = 3600;
const BREATH_DURATION = 5000;
const ANIM_DURATION = 600;

export default function AutoTooltips() {
  const [activeIdx, setActiveIdx] = useState(null);
  const stepRef = useRef(0);
  const timerRef = useRef(null);

  const tick = useCallback(() => {
    const idx = SEQUENCE[stepRef.current];
    setActiveIdx(idx);
    const delay = idx === null ? BREATH_DURATION : WORD_DURATION;
    timerRef.current = setTimeout(() => {
      stepRef.current = (stepRef.current + 1) % SEQUENCE.length;
      tick();
    }, delay);
  }, []);

  const stop = useCallback(() => clearTimeout(timerRef.current), []);

  const start = useCallback(() => {
    clearTimeout(timerRef.current);
    tick();
  }, [tick]);

  useEffect(() => {
    tick();
    return () => clearTimeout(timerRef.current);
  }, [tick]);

  const duration = ANIM_DURATION;

  const wordProps = { activeIdx, duration, stop, start };

  return (
    <div className="flex flex-col gap-1">
      <p className="font-manrope text-2xl font-semibold text-amber-200">
        Uma curadoria profunda, otimista e multimídia de links amarelos.
      </p>
      <p className="font-manrope text-2xl">
        O <span className="italic">creme de la creme</span> da vadiagem digital
        com <TooltipWord word={WORDS[0]} index={0} {...wordProps} />
        {", "}
        <TooltipWord word={WORDS[1]} index={1} {...wordProps} />
        {", "}
        <TooltipWord word={WORDS[2]} index={2} {...wordProps} /> e{" "}
        <TooltipWord word={WORDS[3]} index={3} {...wordProps} /> ainda sem
        taxonomia digital vigente.
      </p>
    </div>
  );
}
