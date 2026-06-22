import Image from "next/image";
import Link from "next/link";
import AutoTooltips from "./components/AutoTooltips";
import LogoCarousel from "./components/LogoCarousel";
import CurationAnimation from "./components/CurationAnimation";

export default function Home() {
  return (
    <main className="min-h-screen bg-(--amarelo) w-full md:max-w-4xl md:mx-auto">
      <section className="grid grid-cols-5 border-b border-amber-200 divide-x divide-amber-200 items-end">
        <div className="p-4 h-80 flex flex-col justify-between col-span-3 space-y-4">
          <div className="text-amber-200">
            <LogoCarousel />
          </div>

          <AutoTooltips />
        </div>

        <div className="col-span-2">
          <p className="uppercase text-sm text-amber-100 px-4 py-2 font-unbounded">
            Comece por aqui
          </p>

          <div className="text-amber-100">
            <div className="border-amber-200 border-t flex items-center gap-4 hover:bg-blue-600 group py-3">
              <Image
                src="/brand/links-amarelos-3.png"
                width={2000}
                height={2000}
                className="size-24 aspect-square rotate-6 -my-3 shrink-0 outline outline-2 outline-amber-200 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-translate-y-1"
                alt="links amarelos #3"
              />

              <div className="w-full mr-3">
                <div className="flex items-center justify-between">
                  <p className="font-manrope font-bold tracking-tight">
                    links amarelos #3
                  </p>
                  <p className="lowercase flex rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50  text-white">
                    Leia
                  </p>
                </div>
                <p className="font-manrope text-sm">
                  maestros, saltos e seriedade
                </p>
              </div>
            </div>

            <div className="border-amber-200 border-t flex items-center gap-4 hover:bg-blue-600 group py-3">
              <Image
                src="/brand/ondas-amarelas-6.png"
                width={2000}
                height={2000}
                className="size-24 aspect-square -rotate-3 -my-3 shrink-0 outline outline-2 outline-amber-200 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-translate-y-1"
                alt="ondas amarelas #6"
              />
              <div className="w-full mr-3">
                <div className="flex items-center justify-between">
                  <p className="font-manrope font-bold tracking-tight">
                    ondas amarelas #6
                  </p>
                  <p className="lowercase flex rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50  text-white">
                    Ouça
                  </p>
                </div>
                <p className="font-manrope text-sm">
                  autorrealização, autocriação
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CurationAnimation />

      <section className="font-manrope text-center py-20 space-y-10">
        <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50  text-white w-fit mx-auto">
          experimente
        </p>

        <div className="space-y-2">
          <p className="font-manrope text-2xl font-semibold text-amber-100 tracking-tight">
            Não tem certeza se essa curadoria é pra você?
          </p>
          <p className="font-manrope text-lg text-amber-100">
            Faz um test-drive com alguns links já compartilhados.
          </p>
        </div>

        <div className="space-y-2">
          <button className="bg-blue-500 text-white px-8 py-3 rounded-full text-xl lowercase font-space-mono">
            Pegar link
          </button>
          <p className="font-space-mono text-xs text-amber-100">
            X links restantes
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 border-y border-amber-200 divide-x divide-amber-200">
        <div className="flex flex-col items-center py-12 aspect-square space-y-12">
          <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50  text-white w-fit mx-auto">
            Apoie
          </p>

          <div className="font-manrope text-center mx-auto space-y-4 text-amber-100">
            <p className="w-2/3 mx-auto text-xl  font-semibold tracking-tigther leading-snug">
              Junte-se aos canarinhos, aos ouros e aos fundadores
            </p>
            <p className="">planos mensais ou anuais e doações expontâneas</p>
          </div>

          <Link
            href="/apoio"
            className="font-space-mono lowercase px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm"
          >
            ver planos
          </Link>
        </div>

        <div className="flex flex-col items-center py-12 aspect-square space-y-12 bg-[url('/bg-texture-cutting-pad.svg')] bg-cover">
          <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50  text-white w-fit mx-auto">
            Explore
          </p>

          <div className="font-manrope text-center mx-auto space-y-4">
            <p className="w-2/3 mx-auto text-xl  font-semibold tracking-tigther leading-snug">
              As realizações ajudam a gerar mais que novos episódios
            </p>
            <p className="w-2/3 mx-auto">
              o seu apoio ajuda a manter o conteúdo principal gratuito, a pintar
              o mundo de amarelo e muito mais...
            </p>
          </div>

          <Link
            href="/realizacoes"
            className="font-space-mono lowercase px-6 py-3 border border-white/40 text-white rounded-full hover:bg-white/10 transition-colors text-sm"
          >
            ver realizações
          </Link>
        </div>
      </section>
      <section className="grid grid-cols-2 border-y border-amber-200 py-20 font-manrope px-12">
        <div></div>

        <div className="space-y-4 text-amber-100">
          <p className="text-xl font-semibold tracking-tight leading-snug">
            Os links amarelos são pesquisados, escritos, narrados, produzidos e
            editados por amarelo dandara.
          </p>

          <Link
            href="/sobre#manifesto"
            className="font-space-mono lowercase text-sm underline underline-offset-4 decoration-amber-300 hover:text-white transition-colors"
          >
            Leia o manifesto amarelo
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 border-y border-amber-200 divide-x divide-amber-200">
        <div className="flex flex-col items-center py-12 aspect-square space-y-12">
          <p className="uppercase text-sm text-amber-100 px-4 font-unbounded">
            última edição
          </p>

          <div className="text-amber-100">
            <div className="border-amber-200 border-t flex items-center gap-4 hover:bg-blue-600 group py-3">
              <Image
                src="/brand/links-amarelos-3.png"
                width={2000}
                height={2000}
                className="size-24 aspect-square rotate-6 -my-3 shrink-0 outline outline-2 outline-amber-200 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-translate-y-1"
                alt="links amarelos #3"
              />

              <div className="w-full mr-3">
                <div className="flex items-center justify-between">
                  <p className="font-manrope font-bold tracking-tight">
                    links amarelos #3
                  </p>
                  <p className="lowercase flex rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50  text-white">
                    Leia
                  </p>
                </div>
                <p className="font-manrope text-sm">
                  maestros, saltos e seriedade
                </p>
              </div>
            </div>

            <div className="border-amber-200 border-t flex items-center gap-4 hover:bg-blue-600 group py-3">
              <Image
                src="/brand/ondas-amarelas-6.png"
                width={2000}
                height={2000}
                className="size-24 aspect-square -rotate-3 -my-3 shrink-0 outline outline-2 outline-amber-200 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-translate-y-1"
                alt="ondas amarelas #6"
              />
              <div className="w-full mr-3">
                <div className="flex items-center justify-between">
                  <p className="font-manrope font-bold tracking-tight">
                    ondas amarelas #6
                  </p>
                  <p className="lowercase flex rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50  text-white">
                    Ouça
                  </p>
                </div>
                <p className="font-manrope text-sm">
                  autorrealização, autocriação
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center py-12 aspect-square space-y-12">
          <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50  text-white w-fit mx-auto">
            próximos episódios
          </p>
        </div>
      </section>
    </main>
  );
}
