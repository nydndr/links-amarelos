import Image from "next/image";
import Link from "next/link";
import AutoTooltips from "./components/AutoTooltips";
import LogoCarousel from "./components/LogoCarousel";
import CurationAnimation from "./components/CurationAnimation";
import ExperimenteSection from "./components/ExperimenteSection";
import CountdownOdometer from "./components/CountdownOdometer";
import FloatingLink from "./components/FloatingLink";

export default function Home() {
  return (
    <main className="min-h-screen bg-(--amarelo) w-full md:max-w-4xl md:mx-auto">
      <section className="grid grid-cols-1 md:grid-cols-5 border-b border-amber-200 divide-y md:divide-y-0 md:divide-x divide-amber-200 items-end">
        <div className="p-4 h-80 flex flex-col justify-end col-span-full md:col-span-3 space-y-4">
          <AutoTooltips />
        </div>

        <div className="col-span-full md:col-span-2">
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

      <div>
        {/* <div className="text-amber-200">
          <LogoCarousel />
        </div>*/}
        <div className="hidden">
          <CurationAnimation />
        </div>

        <ExperimenteSection />

        <section
          id="apoie"
          className="grid grid-cols-1 md:grid-cols-2 border-y border-amber-200 divide-y md:divide-y-0 md:divide-x divide-amber-200"
        >
          <div className="flex flex-col items-center py-16 md:aspect-square space-y-12">
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

          <div className="flex flex-col items-center py-16 md:aspect-square space-y-12 bg-[url('/bg-texture-cutting-pad.svg')] bg-cover">
            <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50  text-white w-fit mx-auto">
              Explore
            </p>

            <div className="font-manrope text-center mx-auto space-y-4">
              <p className="w-2/3 mx-auto text-xl  font-semibold tracking-tigther leading-snug">
                As realizações ajudam a gerar mais que novos episódios
              </p>
              <p className="w-2/3 mx-auto">
                o seu apoio ajuda a manter o conteúdo principal gratuito, a
                pintar o mundo de amarelo e muito mais...
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
        <section className="relative grid grid-cols-1 md:grid-cols-2 py-20 font-manrope px-12 bg-amber-200 border-x-2 border-(--amarelo) overflow-hidden">
          <div className="hidden md:block" id="link"></div>

          <div className="space-y-4 ">
            <p className="text-xl font-semibold tracking-tight leading-snug">
              Os links amarelos são pesquisados, escritos, narrados, produzidos
              e editados <span className="text-amber-300"> em uma semana </span>{" "}
              por amarelo dandara
            </p>

            <Link
              href="/sobre"
              className="font-space-mono lowercase text-sm underline underline-offset-4 decoration-amber-300 hover:text-white transition-colors"
            >
              Leia o manifesto amarelo
            </Link>
          </div>
          <FloatingLink title="Link 01" url="https://placeholder.com/01" />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 border-y border-amber-200 divide-y md:divide-y-0 md:divide-x-2 divide-amber-200">
          <div className="py-12 md:aspect-square space-y-12 flex flex-col items-center">
            <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50  text-white w-fit mx-auto">
              última edição
            </p>

            <div className="flex flex-col items-center gap-2">
              <div>
                <p className="font-manrope text-2xl font-bold tracking-tighter">
                  links amarelos #8
                </p>
                <p className="font-unbounded">ondas amarelas #8</p>
              </div>

              <p className="w-3/4 font-manrope text-center text-sm">
                uma semana de pensamento com o Espírito Santo, amém
              </p>
            </div>
            <div className="flex w-full justify-center border-y border-amber-200">
              <Image
                src="/brand/links-amarelos-8.png"
                width={2000}
                height={2000}
                className="size-40 aspect-square rotate-6 -my-3 shrink-0 outline outline-2 outline-amber-200 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-translate-y-1"
                alt="links amarelos #3"
              />
              <Image
                src="/brand/ondas-amarelas-8.png"
                width={2000}
                height={2000}
                className="size-40 aspect-square -rotate-6 -my-3 shrink-0 outline outline-2 outline-amber-200 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-translate-y-1"
                alt="links amarelos #3"
              />
            </div>

            <div className="flex gap-2">
              <Link
                href="https://amarelodandara.substack.com"
                className="hidden md:flex lowercase gap-2 items-center rounded-full px-3 py-1 bg-white/20 border border-orange-400/50  text-orange-600"
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
                className="hidden md:flex gap-2 items-center rounded-full px-3 py-1 bg-white/20 border border-green-400/50  text-green-800 lowercase"
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
            </div>
          </div>

          <div className="flex flex-col py-12 md:aspect-square space-y-12">
            <div className="flex justify-between">
              <p className="uppercase text-sm text-amber-100 px-4 py-2 font-unbounded">
                Próximas edições
              </p>

              <p className="uppercase text-sm text-amber-100 px-4 py-2 font-unbounded">
                <CountdownOdometer />
              </p>
            </div>

            <div>
              <div className="border-amber-200 border-t flex flex-col items-center gap-12 hover:bg-blue-600 group py-3">
                <Image
                  src="/brand/links-amarelos-3.png"
                  width={2000}
                  height={2000}
                  className="size-48 aspect-square rotate-6 -my-3 shrink-0 outline outline-2 outline-amber-200 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-translate-y-1"
                  alt="links amarelos #3"
                />

                <div className="w-full mr-3 text-center">
                  <p className="font-space-mono font-bold text-xl tracking-tighter">
                    hyperlinks amarelos #1
                  </p>

                  <p className="font-redacted text-sm text-amber-200">
                    é surpresa, uai, assina aí pra ver
                  </p>
                </div>
              </div>
              <div className="border-amber-200 border-t flex items-center gap-4 hover:bg-blue-600 group py-3">
                <div className="flex">
                  <Image
                    src="/brand/coming-newsletter.png"
                    width={2000}
                    height={2000}
                    className="size-16 aspect-square -rotate-6 -my-3 shrink-0 outline outline-2 outline-amber-200 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-translate-y-1"
                    alt="links amarelos #3"
                  />

                  <Image
                    src="/brand/coming-podcast.png"
                    width={2000}
                    height={2000}
                    className="size-16 aspect-square rotate-6 -my-3 shrink-0 outline outline-2 outline-amber-200 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-translate-y-1"
                    alt="links amarelos #3"
                  />
                </div>

                <div className="w-full mr-3">
                  <div className="flex items-center justify-between">
                    <p className="font-manrope font-bold tracking-tight">
                      links amarelos + ondas amarelas #9
                    </p>
                  </div>
                  <p className="font-redacted text-sm text-amber-200">
                    é surpresa, uai, assina aí pra saber
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
