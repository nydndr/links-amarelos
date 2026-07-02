"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const principios = [
  {
    id: "profundo-otimista",
    numero: "01",
    nome: "Profundo e Otimista",
    explainer:
      "Conteúdo escrito com calma e profundidade, otimista sobre a vida e sobre o seu span de atenção.",
    realizacoes: [
      {
        slug: "links-amarelos",
        status: "ativa",
        name: "Links Amarelos",
        description:
          "A curadoria mensal dos creme de la creme da internet. Artigos, vídeos, músicas, imagens, ferramentas e buracos negros digitais — curados à mão.",
        cta: "Assinar",
        href: "https://amarelodandara.substack.com",
        cover: "/brand/links-amarelos-3.png",
      },
      {
        slug: "ondas-amarelas",
        status: "ativa",
        name: "Ondas Amarelas",
        description:
          "A versão em áudio expandida dos links amarelos. O mesmo conteúdo, mas com um tempero a mais que pode morar no rádio do seu carro ou no seu fone de ouvido.",
        cta: "Ouvir",
        href: "https://open.spotify.com/show/043Gs7eyY2KOlotEWSTSxB?si=e7abf2b9730747d7",
        cover: "/brand/ondas-amarelas-6.png",
      },
      {
        slug: "hyperlinks",
        status: "construindo",
        name: "Hyperlinks Amarelos",
        description:
          "Ensaios sobre assuntos específicos formados por muitos links amarelos demais para caber em uma issue ou outra.",
        cta: "Ouvir",
        href: null,
        cover: "/brand/coming-newsletter.png",
      },
    ],
  },
  {
    id: "presente-multimidia",
    numero: "02",
    nome: "Presente e Multimídia",
    explainer:
      "Formatos que vão além do texto e realizações que vão além da internet.",
    realizacoes: [
      {
        slug: "hyperlinks",
        status: "planejada",
        name: "Hyperlinks Amarelos",
        description:
          "Quando um link extrapola os limites de uma newsletter, ele ganha um espaço dedicado em forma de ensaio por áudio.",
        cta: null,
        href: null,
        cover: null,
      },
    ],
  },
  {
    id: "auto-sustentavel",
    numero: "03",
    nome: "Auto-sustentável e Expansivo",
    explainer:
      "Projetos que se financiam e crescem com a comunidade que os sustenta.",
    realizacoes: [
      {
        slug: "arquivo",
        status: "planejada",
        name: "Arquivo Amarelo",
        description:
          "Todo link já compartilhado em Links Amarelos, organizado, pesquisável e anotado. Um acervo vivo de descobertas.",
        cta: null,
        href: null,
        cover: null,
      },
    ],
  },
  {
    id: "apoiado-apoiador",
    numero: "04",
    nome: "Apoiado e Apoiador",
    explainer: "Uma rede de apoio mútuo entre criadores e leitores.",
    realizacoes: [],
  },
];

const statusStyles = {
  ativa: "bg-emerald-100 border-emerald-300 text-emerald-700",
  construindo: "bg-sky-100 border-sky-300 text-sky-700",
  realizada: "bg-violet-100 border-violet-300 text-violet-700",
  planejada: "bg-amber-100/60 border-dashed border-amber-400/60 text-amber-500",
};

function RealizacaoCard({ r }) {
  return (
    <div className="relative py-12 px-6 aspect-square flex flex-col justify-between">
      <span
        className={`absolute top-4 right-4 lowercase rounded-full text-xs font-space-mono px-2 py-0.5 border ${statusStyles[r.status] ?? statusStyles.planejada}`}
      >
        {r.status}
      </span>

      {r.cover ? (
        <Image
          src={r.cover}
          width={400}
          height={400}
          alt={r.name}
          className="size-30 aspect-square rounded-sm outline outline-2 outline-amber-300 rotate-1 shrink-0 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-translate-y-1"
        />
      ) : (
        <div className="size-20 rounded-sm border-2 border-dashed border-amber-400/40 flex items-center justify-center shrink-0">
          <span className="font-space-mono text-xs text-amber-600">
            em breve
          </span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div>
          <h3 className="font-unbounded text-base tracking-tight text-amber-900 leading-tight">
            {r.name}
          </h3>
        </div>
        <p className="font-manrope text-sm text-amber-800 leading-relaxed mt-1">
          {r.description}
        </p>
        {r.cta && r.href && (
          <Link
            href={r.href}
            className="font-space-mono lowercase text-xs mt-2 inline-block text-blue-600 hover:text-blue-800 transition-colors"
          >
            {r.cta} →
          </Link>
        )}
      </div>
    </div>
  );
}

function Accordion({ principio }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasContent = principio.realizacoes.length > 0;

  return (
    <div className="border-b border-amber-300">
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative w-full bg-amber-200 flex items-start gap-4 px-6 pt-5 cursor-pointer text-left overflow-hidden transition-[max-height] duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${open ? "max-h-56 pb-6" : "max-h-[3.75rem]"}`}
        aria-expanded={open}
      >
        <div
          className={`absolute inset-0 bg-[url('/bg-texture-cutting-pad.svg')] bg-cover pointer-events-none transition-opacity duration-300 ${hovered && !open ? "opacity-100" : "opacity-0"}`}
        />
        <span className="relative font-space-mono text-xs text-(--amarelo) shrink-0 w-6 mt-1">
          {principio.numero}
        </span>

        <div className="relative flex-1 flex flex-col">
          <h2 className="font-unbounded text-3xl md:text-4xl lg:text-5xl tracking-tight text-amber-900 leading-none">
            {principio.nome}
          </h2>
          <p className="font-manrope text-sm text-amber-700 mt-2 leading-snug">
            {principio.explainer}
          </p>
        </div>

        <span
          className={`relative font-space-mono text-amber-600 text-xl shrink-0 transition-transform duration-300 mt-0.5 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="border-t border-(--amarelo)/40">
          {hasContent ? (
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-(--amarelo)/40">
              {principio.realizacoes.map((r) => (
                <RealizacaoCard key={r.slug} r={r} />
              ))}
            </div>
          ) : (
            <p className="font-space-mono text-sm text-amber-600 lowercase py-4 px-6">
              realizações a caminho
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RealizacoesPage() {
  return (
    <main className="min-h-screen bg-(--amarelo) w-full md:max-w-4xl md:mx-auto">
      {/* Header */}
      <section className="border-b border-amber-200 px-8 py-16 space-y-6">
        <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50 text-white w-fit">
          realizações
        </p>
        <h1 className="font-unbounded text-4xl md:text-6xl text-amber-100 tracking-tight leading-tight">
          O que nasce daqui
        </h1>
        <p className="font-manrope text-xl text-amber-100 max-w-lg leading-relaxed">
          Links Amarelos é a semente. As realizações são tudo que cresce a
          partir dela — organizadas pelos quatro princípios do manifesto.
        </p>
        <Link
          href="/sobre#manifesto"
          className="font-space-mono lowercase text-sm text-amber-200 underline underline-offset-4 decoration-amber-400/50 hover:text-amber-100 transition-colors"
        >
          ler o manifesto →
        </Link>
      </section>

      {/* Accordions */}
      <section className="border-x border-(--amarelo) bg-amber-200">
        {principios.map((p) => (
          <Accordion key={p.id} principio={p} />
        ))}
      </section>

      {/* Support CTA */}
      <section className="px-8 py-16 space-y-4 text-center">
        <p className="font-manrope text-xl font-semibold text-amber-100 tracking-tight">
          Essas realizações vivem do seu apoio.
        </p>
        <p className="font-manrope text-amber-200 text-sm">
          Cada assinante pago ajuda a manter o conteúdo principal gratuito e a
          financiar novos projetos.
        </p>
        <div className="pt-4">
          <Link
            href="/apoio"
            className="font-space-mono lowercase px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm"
          >
            ver planos de apoio
          </Link>
        </div>
      </section>
    </main>
  );
}
