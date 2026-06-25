import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Realizações — Links Amarelos",
  description: "Todos os projetos nascidos da curadoria amarela.",
};

const realizacoes = [
  {
    slug: "links-amarelos",
    label: "Newsletter",
    name: "Links Amarelos",
    description:
      "A original. Toda semana, uma seleção de links reunidos em torno de um tema. Artigos, vídeos, músicas, imagens, ferramentas — curados à mão.",
    cta: "Assinar",
    href: "https://amarelodandara.substack.com",
    texture: "bg-[url('/bg-texture-yellow.svg')]",
    textColor: "text-amber-900",
    borderColor: "border-amber-300",
    badgeStyle: "bg-amber-200/50 border-amber-400/50 text-amber-900",
    cover: "/brand/links-amarelos-3.png",
  },
  {
    slug: "ondas-amarelas",
    label: "Podcast",
    name: "Ondas Amarelas",
    description:
      "Um podcast de conversas e reflexões. Cada episódio explora um tema em profundidade — com convidados, referências e a voz do amarelo dandara.",
    cta: "Ouvir",
    href: "https://open.spotify.com/show/043Gs7eyY2KOlotEWSTSxB?si=e7abf2b9730747d7",
    texture: "bg-[url('/bg-texture-purple.svg')]",
    textColor: "text-purple-100",
    borderColor: "border-purple-300",
    badgeStyle: "bg-white/10 border-white/30 text-purple-100",
    cover: "/brand/ondas-amarelas-6.png",
  },
  {
    slug: "arquivo",
    label: "Em breve",
    name: "Arquivo Amarelo",
    description:
      "Todo link já compartilhado em Links Amarelos, organizado, pesquisável e anotado. Um acervo vivo de descobertas.",
    cta: null,
    href: null,
    texture: "bg-[url('/bg-texture-white.svg')]",
    textColor: "text-amber-900",
    borderColor: "border-amber-200",
    badgeStyle: "bg-amber-200/30 border-amber-300/50 text-amber-800",
    cover: null,
  },
];

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
          partir dela — projetos que só existem porque existe uma curadoria viva
          por trás.
        </p>
      </section>

      {/* Cards */}
      <section className="border-y border-amber-200 divide-y divide-amber-200">
        {realizacoes.map((r) => (
          <div
            key={r.slug}
            className={`${r.texture} bg-repeat group`}
          >
            <div className="px-8 py-12 flex flex-col md:flex-row gap-8 items-start">
              {/* Cover art */}
              {r.cover && (
                <div className="shrink-0">
                  <Image
                    src={r.cover}
                    width={400}
                    height={400}
                    alt={r.name}
                    className="size-28 aspect-square rounded-sm outline outline-2 outline-amber-200 rotate-1 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-translate-y-1"
                  />
                </div>
              )}

              {!r.cover && (
                <div className="size-28 shrink-0 rounded-sm border-2 border-dashed border-amber-300/40 flex items-center justify-center">
                  <span className="font-space-mono text-xs text-amber-400">
                    em breve
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <span
                    className={`lowercase rounded-full text-xs font-space-mono px-2 py-0.5 border ${r.badgeStyle}`}
                  >
                    {r.label}
                  </span>
                </div>

                <h2
                  className={`font-unbounded text-2xl tracking-tight ${r.textColor}`}
                >
                  {r.name}
                </h2>

                <p className={`font-manrope leading-relaxed ${r.textColor} opacity-80`}>
                  {r.description}
                </p>

                {r.cta && r.href && (
                  <Link
                    href={r.href}
                    className="inline-block font-space-mono lowercase px-5 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm"
                  >
                    {r.cta}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Support CTA */}
      <section className="border-t border-amber-200 px-8 py-16 space-y-4 text-center">
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
