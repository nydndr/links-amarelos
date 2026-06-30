import Link from "next/link";
import PlansToggle from "./PlansToggle";

export const metadata = {
  title: "Apoio — Links Amarelos",
  description: "Apoie Links Amarelos e ajude a manter a curadoria viva.",
};

export default function ApoioPage() {
  return (
    <main className="min-h-screen bg-(--amarelo) border-x-2 border-amber-200 w-full md:max-w-4xl md:mx-auto">
      {/* Header */}
      <section className=" space-y-6 px-8 py-16">
        <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-amber-100/20 border border-amber-50/60 text-amber-50 w-fit">
          Apoie
        </p>

        <div className="space-y-2">
          <h1 className="font-unbounded text-4xl md:text-6xl text-amber-100 tracking-tight leading-tight">
            Junte-se aos
            <br />
            canarinhos
          </h1>
          <p className="font-manrope text-xl text-amber-100 max-w-xl leading-relaxed">
            Além de ajudar a manter os links amarelos + ondas amarelas
            gratuitos, seu apoio possibilita incríveis realizações amarelas.
          </p>
        </div>
      </section>

      <PlansToggle />

      {/* Doação espontânea */}
      <section className="border-b border-amber-200 px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <p className="font-manrope text-lg font-semibold text-amber-100 tracking-tight">
            Prefere uma doação espontânea?
          </p>

          <div>
            <p className="font-unbounded text-4xl">Qualquer valor</p>
            <p className="font-space-mono text-sm">
              sem recorrência, sem compromisso
            </p>
          </div>
          <ul className="font-manrope text-amber-200 text-sm">
            <li>
              Ideal pra quem quer garantir que o projeto continue, mas sem ficar
              por perto
            </li>
            <li>
              Ou pra quem já é assinante e quer impulsionar ainda mais alguma
              inciativa amarela
            </li>
          </ul>
        </div>
        <Link
          href="https://amarelodandara.substack.com"
          className="font-space-mono lowercase px-6 py-3 border border-white/40 rounded-full text-white hover:bg-white/10 transition-colors shrink-0"
        >
          fazer uma doação
        </Link>
      </section>

      {/* Por que apoiar */}
      <section className="border-b border-amber-200 px-8 py-16 space-y-8">
        <p className="uppercase text-sm text-amber-100 px-4 font-unbounded">
          Por que apoiar
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <p className="font-manrope font-semibold text-amber-100 tracking-tight">
              Sem algoritmo
            </p>
            <p className="font-manrope text-sm text-amber-200 leading-relaxed">
              Links Amarelos não vive de cliques, não otimiza para engajamento e
              não tem anúncio. Vive de assinantes.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-manrope font-semibold text-amber-100 tracking-tight">
              Conteúdo principal grátis
            </p>
            <p className="font-manrope text-sm text-amber-200 leading-relaxed">
              O apoio pago é o que permite que as edições gratuitas continuem
              chegando para todo mundo, para sempre.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-manrope font-semibold text-amber-100 tracking-tight">
              Novas realizações
            </p>
            <p className="font-manrope text-sm text-amber-200 leading-relaxed">
              Cada assinante pago financia o que vem a seguir — arquivo,
              episódios exclusivos e projetos ainda sem nome.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
