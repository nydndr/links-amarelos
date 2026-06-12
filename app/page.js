export default function Home() {
  return (
    <main className="border-x border-(--amarelo) min-h-screen bg-(--amarelo) max-w-2/3 mx-auto">
      <section className="grid grid-cols-3 border-b border-amber-200 divide-x divide-amber-200 items-end">
        <div className="p-4 space-y-2 pt-24 col-span-2">
          <h1 className="text-white font-bold text-lg">
            links amarelos + ondas amarelas
          </h1>
          <div></div>
          <p>
            Uma curadoria sem limites com o creme de la creme da vadiagem
            digital. Recomendações de textos, livros, documentários e coisas
            ainda sem taxonomia digital vigente.
          </p>
          <p>
            E as ondas amarelas, a versão expandida dessas conversas agora em
            áudio.
          </p>
        </div>
        <div className="pt-24">
          <p className="uppercase text-sm text-amber-100 px-4">
            Comece por aqui
          </p>

          <div className=" text-white">
            <div className="border-amber-200 border-t flex items-center gap-4 hover:bg-blue-600">
              <div className="size-20 bg-blue-200 rotate-6"></div>

              <div className="">
                <div className="flex items-center justify-between">
                  <p className="text-lg">links amarelos #?</p>
                  <p className="bg-amber-200/50 px-3 lowercase rounded-full">
                    Leia
                  </p>
                </div>
                <p>Descrição</p>
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
      <section className="flex gap-4 py-6 px-4">
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
      </section>
    </main>
  );
}
