import LinksLogotype from "./components/icons/LinksLogotype";
import OndasLogotype from "./components/icons/OndasLogotype";

export default function Home() {
  return (
    <main className="min-h-screen bg-(--amarelo) max-w-2/3 mx-auto">
      <section className="grid grid-cols-5 border-b border-amber-200 divide-x divide-amber-200 items-end">
        <div className="p-4 pt-40 col-span-3 ">
          <div className="flex items-center gap-2">
            <LinksLogotype className="w-40"></LinksLogotype>
            <p>+</p>
            <OndasLogotype className="w-48"></OndasLogotype>
          </div>

          <p className="font-manrope text-lg w-11/12">
            Uma curadoria sem limites, o creme de la creme da vadiagem digital.
            Textos, livros, documentários e coisas ainda sem taxonomia digital
            vigente.
          </p>
        </div>
        <div className="col-span-2">
          <p className="uppercase text-sm text-amber-100 p-4 font-unbounded">
            Comece por aqui
          </p>

          <div className="">
            <div className="border-amber-200 border-t flex items-center gap-4 hover:bg-blue-600">
              <div className="size-20 aspect-square bg-blue-200 rotate-6"></div>

              <div className="w-full mr-3">
                <div className="flex items-center justify-between">
                  <p className="font-manrope font-bold tracking-tight">
                    links amarelos #3
                  </p>
                  <p className="lowercase flex rounded-full text-xs font-space-mono px-2 py-1 bg-stone-400/10 border border-green-400/50  text-green-800">
                    Leia
                  </p>
                </div>
                <p className="font-manrope text-sm">
                  maestros, saltos e seriedade
                </p>
              </div>
            </div>

            <div className="border-amber-200 border-t flex items-center gap-4 hover:bg-blue-600">
              <div className="size-20 bg-blue-200 rotate-6"></div>

              <div className="">
                <div className="flex items-center justify-between">
                  <p className="text-lg">ondas amarelas #8</p>
                  <p className="bg-amber-200/50 px-3 lowercase rounded-full">
                    Ouça
                  </p>
                </div>
                <p>Descrição</p>
              </div>
            </div>
          </div>
        </div>
      </section>
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
