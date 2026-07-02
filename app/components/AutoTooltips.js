"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const ITEMS = [
  {
    key: "textos",
    href: "https://open.substack.com/pub/valternascimento/p/biscoito-passatempo-dinossauros-e?utm_source=share&utm_medium=android&r=2x1xhg",
  },
  {
    key: "livros",
    href: "https://www.amazon.com.br/que-comi-ano-outras-reflex%C3%B5es/dp/8551013416",
  },
  {
    key: "documentários",
    href: "https://letterboxd.com/film/dahomey/",
  },
  {
    key: "coisas",
    href: "https://ivansouto.github.io/microbaile/",
  },
];

function longestCommonPrefix(a, b) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

const SEQUENCE = [null, 0, 1, 2, 3];
const PAUSE_MS = 3600;
const BREATH_MS = 5000;
const TYPE_MS = 28;
const BACK_MS = 16;

export default function AutoTooltips() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [displayedUrl, setDisplayedUrl] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const stepRef = useRef(0);
  const seqTimerRef = useRef(null);
  const urlTimerRef = useRef(null);
  const displayedUrlRef = useRef("");
  const lastItemIdxRef = useRef(null);

  const setUrl = useCallback((url) => {
    displayedUrlRef.current = url;
    setDisplayedUrl(url);
  }, []);

  const animateTo = useCallback(
    (target) => {
      clearTimeout(urlTimerRef.current);
      const from = displayedUrlRef.current;
      const pivot = longestCommonPrefix(from, target);

      setIsAnimating(true);

      const typePhase = (len) => {
        setUrl(target.substring(0, len));
        if (len < target.length) {
          urlTimerRef.current = setTimeout(() => typePhase(len + 1), TYPE_MS);
        } else {
          setIsAnimating(false);
        }
      };

      const backPhase = (len) => {
        setUrl(from.substring(0, len));
        if (len > pivot) {
          urlTimerRef.current = setTimeout(() => backPhase(len - 1), BACK_MS);
        } else {
          typePhase(pivot);
        }
      };

      backPhase(from.length);
    },
    [setUrl],
  );

  const tick = useCallback(() => {
    const idx = SEQUENCE[stepRef.current];
    setActiveIdx(idx);

    if (idx !== null) {
      lastItemIdxRef.current = idx;
      animateTo(ITEMS[idx].href);
    }

    const delay = idx === null ? BREATH_MS : PAUSE_MS;
    seqTimerRef.current = setTimeout(() => {
      stepRef.current = (stepRef.current + 1) % SEQUENCE.length;
      tick();
    }, delay);
  }, [animateTo]);

  useEffect(() => {
    tick();
    return () => {
      clearTimeout(seqTimerRef.current);
      clearTimeout(urlTimerRef.current);
    };
  }, [tick]);

  const getFullHref = () =>
    lastItemIdxRef.current !== null ? ITEMS[lastItemIdxRef.current].href : "";

  const handleOpen = useCallback(() => {
    const href = getFullHref();
    if (!href) return;
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  const wordClass = (i) =>
    `transition-colors duration-[600ms] ${
      activeIdx === i ? "text-amber-100" : ""
    }`;

  return (
    <div className="flex flex-col gap-4  text-[#442304]">
      <div className="space-y-2">
        <p className="font-manrope text-2xl tracking-tigther text-balance font-semibold">
          Todo mês, recomendações de{" "}
          <span className={wordClass(0)}>textos</span>
          {", "}
          <span className={wordClass(1)}>livros</span>
          {", "}
          <span className={wordClass(2)}>documentários</span>
          {" e "}
          <span className={wordClass(3)}>coisas</span>
          {" ainda sem taxonomia vigente."}
        </p>

        <p className="font-manrope text-lg">
          Uma curadoria opionada, profunda e otimista do <br></br>melhor que a
          internet ainda tem pra oferecer.
        </p>
      </div>
      <div className="bg-amber-200 flex px-3 py-2 rounded-full text-xs font-space-mono justify-between items-center gap-2">
        <div className="relative flex-1 overflow-hidden min-w-0">
          <span className="whitespace-nowrap block">
            {displayedUrl}
            {isAnimating && "▋"}
          </span>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-200 to-transparent pointer-events-none" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleOpen}
            disabled={!displayedUrl}
            className="transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-125 active:scale-90 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            title="Abrir em nova aba"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
