import Image from "next/image";
import AutoTooltips from "./components/AutoTooltips";
import LogoCarousel from "./components/LogoCarousel";

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

      {/* <section>
        <p className="text-center  font-manrope w-2/3 mx-auto">
          Em tempos ideais, eu Amarelo Dandara, me sento com um lanchinho
          gostoso em mãos e passo horas em vadiagem digital. no final, eu me
          levanto com o bolso cheio de artigos, livros, filmes, músicas e outras
          coisas fora da taxonomia digital vigente. os links amarelos são o
          *creme de la creme dessa vadiagem*, aprecie
        </p>
      </section>*/}
      {/* <section className="flex gap-4 py-6 px-4">
        <p className="uppercase text-white whitespace-nowrap">
          ▲ Site em construção ▲
        </p>
        <div>
          <p>
            Seção para apoiar e descobrir as realizações amarelas já estão
            prontas. Muito mais por vir.
          </p>
        </div>
      </section>
      <section className="grid grid-cols-2 border-y border-amber-200 divide-x divide-amber-200">
        <div className="flex flex-col items-center py-12">
          <p className="bg-amber-200/50 px-3 lowercase rounded-full w-fit text-white">
            Apoie
          </p>

          <p>Planos mensais, anuais e doações expontâneas</p>
          <p>Junte-se aos canarinhos, aos ouros e aos fundadores</p>
          <p></p>
        </div>

        <div className="flex flex-col items-center py-12">
          <p className="bg-amber-200/50 px-3 lowercase rounded-full w-fit text-white">
            Explore
          </p>

          <p>
            O seu apoio ajuda a manter o conteúdo principal gratuito, a pintar o
            mundo de amarelo e muito mais...
          </p>
        </div>
      </section>
      <section>
        <p>Do que é feito os links amarelos?</p>
        <p>Manifesto</p>
      </section>

      <section className="grid grid-cols-2 border-y border-amber-200 divide-x divide-amber-200">
        <div className="flex flex-col items-center py-12">
          <p className="bg-amber-200/50 px-3 lowercase rounded-full w-fit text-white">
            último episódio
          </p>

          <p>Planos mensais, anuais e doações expontâneas</p>
          <p>Junte-se aos canarinhos, aos ouros e aos fundadores</p>
          <p></p>
        </div>

        <div className="flex flex-col items-center py-12">
          <p className="bg-amber-200/50 px-3 lowercase rounded-full w-fit text-white">
            próximo episódio
          </p>

          <p>
            O seu apoio ajuda a manter o conteúdo principal gratuito, a pintar o
            mundo de amarelo e muito mais...
          </p>
        </div>
      </section>*/}
    </main>
  );
}
