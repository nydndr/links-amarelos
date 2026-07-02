"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import YellowCircle from "../components/YellowCircle";
import Button from "../components/Button";

const statusStyles = {
  ativa: "",
  construindo: "",
  realizada: "",
  planejada: "",
};

function StatusPill({ status }) {
  return (
    <span className={`a ${statusStyles[status] ?? statusStyles.planejada}`}>
      {status}
    </span>
  );
}

function RealizacaoCard({ status, name, cover, cta, href, children }) {
  return (
    <div className="">
      <StatusPill status={status} />

      {status === "construindo" ? (
        <YellowCircle filled className="size-30 shrink-0" />
      ) : status === "planejada" ? (
        <YellowCircle className="size-30 shrink-0" />
      ) : cover ? (
        <Image
          src={cover}
          width={400}
          height={400}
          alt={name}
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
        <h3 className="font-unbounded text-base tracking-tight text-amber-900 leading-tight">
          {name}
        </h3>
        {children}
        {cta && href && (
          <Link
            href={href}
            className="font-space-mono lowercase text-xs mt-2 inline-block text-blue-600 hover:text-blue-800 transition-colors"
          >
            {cta} →
          </Link>
        )}
      </div>
    </div>
  );
}

function Accordion({ numero, nome, explainer, children }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasContent = Boolean(children);

  return (
    <div className="">
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
          {numero}
        </span>

        <div className="relative flex-1 flex flex-col">
          <h2 className="font-unbounded text-3xl md:text-4xl lg:text-5xl tracking-tight text-amber-900 leading-none">
            {nome}
          </h2>
          <p className="font-manrope text-sm text-amber-700 mt-2 leading-snug">
            {explainer}
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
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-x divide-(--amarelo)/40">
              {children}
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

export default function RealizacoesClient() {
  return (
    <main className="min-h-screen bg-(--amarelo) w-full md:max-w-4xl md:mx-auto">
      {/* Header */}
      <section className="border-b border-amber-200 px-8 py-16 space-y-6">
        <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50 text-white w-fit">
          realizações
        </p>
        <h1 className="font-unbounded text-4xl md:text-6xl text-amber-100 tracking-tight leading-tight">
          O que nasce dos
          <br />
          links amarelos
        </h1>
        <p className="font-manrope text-xl text-amber-100 max-w-lg leading-relaxed">
          Os links amarelos são a semente. As realizações são tudo que nasce a
          partir dessa semente.
        </p>
      </section>

      {/* Accordions */}
      <section className="bg-amber-200 border-x border-(--amarelo)">
        <Accordion
          numero="01"
          nome="Profundo e Otimista"
          explainer="Conteúdo escrito com calma e profundidade, otimista sobre a vida e sobre o seu span de atenção."
        >
          <RealizacaoCard
            status="ativa"
            name="Links Amarelos"
            cover="/brand/links-amarelos-3.png"
            cta="Assinar"
            href="https://amarelodandara.substack.com"
          >
            <p className="">
              A curadoria mensal dos creme de la creme da internet. Artigos,
              vídeos, músicas, imagens, ferramentas e buracos negros digitais —
              curados à mão.
            </p>
          </RealizacaoCard>
          <RealizacaoCard
            status="ativa"
            name="Ondas Amarelas"
            cover="/brand/ondas-amarelas-6.png"
            cta="Ouvir"
            href="https://open.spotify.com/show/043Gs7eyY2KOlotEWSTSxB?si=e7abf2b9730747d7"
          >
            <p className="font-manrope text-sm text-amber-800 leading-relaxed mt-1">
              A versão em áudio expandida dos links amarelos. O mesmo conteúdo,
              mas com um tempero a mais que pode morar no rádio do seu carro ou
              no seu fone de ouvido.
            </p>
          </RealizacaoCard>
          <RealizacaoCard
            status="construindo"
            name="Hyperlinks Amarelos"
            cover="/brand/coming-newsletter.png"
            cta="Ouvir"
            href={null}
          >
            <p className="font-manrope text-sm text-amber-800 leading-relaxed mt-1">
              Ensaios sobre assuntos específicos formados por muitos links
              amarelos demais para caber em uma issue ou outra.
            </p>
          </RealizacaoCard>
        </Accordion>

        <Accordion
          numero="02"
          nome="Presente e Multimídia"
          explainer="Formatos que vão além do texto e realizações que vão além da internet."
        >
          <RealizacaoCard status="planejada" name="Hyperlinks Amarelos">
            <p className="font-manrope text-sm text-amber-800 leading-relaxed mt-1">
              Quando um link extrapola os limites de uma newsletter, ele ganha
              um espaço dedicado em forma de ensaio por áudio.
            </p>
          </RealizacaoCard>
        </Accordion>

        <Accordion
          numero="03"
          nome="Auto-sustentável e Expansivo"
          explainer="Projetos que se financiam e crescem com a comunidade que os sustenta."
        >
          <RealizacaoCard status="planejada" name="Arquivo Amarelo">
            <p className="font-manrope text-sm text-amber-800 leading-relaxed mt-1">
              Todo link já compartilhado em Links Amarelos, organizado,
              pesquisável e anotado. Um acervo vivo de descobertas.
            </p>
          </RealizacaoCard>
        </Accordion>

        <Accordion
          numero="04"
          nome="Apoiado e Apoiador"
          explainer="Uma rede de apoio mútuo entre criadores e leitores."
        />
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
          <Button variant="primary" href="/apoio" className="text-sm">
            ver planos de apoio
          </Button>
        </div>
      </section>
    </main>
  );
}
