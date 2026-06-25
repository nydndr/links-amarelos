import Link from "next/link";

export const metadata = {
  title: "Apoio — Links Amarelos",
  description: "Apoie Links Amarelos e ajude a manter a curadoria viva.",
};

const planos = [
  {
    id: "canario",
    nome: "Canário",
    preco: "Grátis",
    periodo: "para sempre",
    descricao: "A newsletter toda semana na sua caixa de entrada.",
    beneficios: [
      "Edições gratuitas de Links Amarelos",
      "Acesso ao arquivo parcial",
      "Ondas Amarelas (episódios públicos)",
    ],
    cta: "Assinar grátis",
    href: "https://amarelodandara.substack.com",
    destaque: false,
    style: {
      card: "bg-[url('/bg-texture-white.svg')] bg-repeat",
      badge: "bg-amber-200/50 border-amber-400/50 text-amber-900",
      nome: "text-amber-900",
      preco: "text-amber-900",
      periodo: "text-amber-700",
      descricao: "text-amber-800",
      item: "text-amber-800",
      dot: "bg-amber-400",
      button:
        "border border-amber-400 text-amber-900 hover:bg-amber-100 transition-colors",
    },
  },
  {
    id: "ouro",
    nome: "Ouro",
    preco: "R$ 25",
    periodo: "por mês",
    descricao: "Acesso completo e apoio direto à curadoria.",
    beneficios: [
      "Tudo do plano Canário",
      "Edições exclusivas para assinantes",
      "Arquivo completo pesquisável",
      "Episódios exclusivos de Ondas Amarelas",
      "Participação nas decisões editoriais",
    ],
    cta: "Assinar por R$ 25/mês",
    href: "https://amarelodandara.substack.com",
    destaque: true,
    style: {
      card: "bg-blue-600",
      badge: "bg-white/20 border-white/30 text-white",
      nome: "text-white",
      preco: "text-white",
      periodo: "text-blue-200",
      descricao: "text-blue-100",
      item: "text-blue-100",
      dot: "bg-white",
      button: "bg-white text-blue-600 hover:bg-blue-50 transition-colors",
    },
  },
  {
    id: "fundador",
    nome: "Fundador",
    preco: "R$ 220",
    periodo: "por ano",
    descricao: "Para quem acredita no projeto desde o começo.",
    beneficios: [
      "Tudo do plano Ouro",
      "Crédito permanente de fundador",
      "Acesso antecipado a novas realizações",
      "Conversa direta com o amarelo dandara",
      "Dois meses grátis em relação ao mensal",
    ],
    cta: "Tornar-se fundador",
    href: "https://amarelodandara.substack.com",
    destaque: false,
    style: {
      card: "bg-[url('/bg-texture-cutting-pad.svg')] bg-cover",
      badge: "bg-white/10 border-white/30 text-amber-100",
      nome: "text-amber-50",
      preco: "text-amber-50",
      periodo: "text-amber-300",
      descricao: "text-amber-200",
      item: "text-amber-200",
      dot: "bg-amber-300",
      button:
        "bg-(--amarelo) text-amber-900 font-bold hover:brightness-110 transition-all",
    },
  },
];

export default function ApoioPage() {
  return (
    <main className="min-h-screen bg-(--amarelo) w-full md:max-w-4xl md:mx-auto">
      {/* Header */}
      <section className="border-b border-amber-200 px-8 py-16 space-y-6">
        <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50 text-white w-fit">
          apoio
        </p>
        <h1 className="font-unbounded text-4xl md:text-6xl text-amber-100 tracking-tight leading-tight">
          Junte-se aos<br />canarinhos
        </h1>
        <p className="font-manrope text-xl text-amber-100 max-w-lg leading-relaxed">
          Links Amarelos é gratuito por escolha. O apoio dos assinantes pagos é
          o que permite que continue assim.
        </p>
      </section>

      {/* Planos */}
      <section className="border-b border-amber-200 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-amber-200">
        {planos.map((plano) => (
          <div
            key={plano.id}
            className={`${plano.style.card} flex flex-col`}
          >
            <div className="p-8 flex flex-col gap-6 flex-1">
              {/* Badge + nome */}
              <div className="space-y-3">
                <span
                  className={`lowercase rounded-full text-xs font-space-mono px-2 py-0.5 border ${plano.style.badge} w-fit`}
                >
                  {plano.id}
                </span>
                <h2
                  className={`font-unbounded text-xl tracking-tight ${plano.style.nome}`}
                >
                  {plano.nome}
                </h2>
              </div>

              {/* Preço */}
              <div>
                <p className={`font-unbounded text-4xl ${plano.style.preco}`}>
                  {plano.preco}
                </p>
                <p className={`font-space-mono text-xs ${plano.style.periodo}`}>
                  {plano.periodo}
                </p>
              </div>

              {/* Descrição */}
              <p className={`font-manrope text-sm leading-relaxed ${plano.style.descricao}`}>
                {plano.descricao}
              </p>

              {/* Benefícios */}
              <ul className="space-y-2 flex-1">
                {plano.beneficios.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span
                      className={`mt-1.5 size-1.5 rounded-full shrink-0 ${plano.style.dot}`}
                    />
                    <span
                      className={`font-manrope text-sm ${plano.style.item}`}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plano.href}
                className={`font-space-mono lowercase text-sm text-center px-5 py-3 rounded-full ${plano.style.button}`}
              >
                {plano.cta}
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Doação espontânea */}
      <section className="border-b border-amber-200 px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <p className="font-manrope text-lg font-semibold text-amber-100 tracking-tight">
            Prefere uma doação espontânea?
          </p>
          <p className="font-manrope text-amber-200 text-sm">
            Sem recorrência, sem compromisso. Só gratidão.
          </p>
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
          {[
            {
              titulo: "Sem algoritmo",
              texto:
                "Links Amarelos não vive de cliques, não otimiza para engajamento e não tem anúncio. Vive de assinantes.",
            },
            {
              titulo: "Conteúdo principal grátis",
              texto:
                "O apoio pago é o que permite que as edições gratuitas continuem chegando para todo mundo, para sempre.",
            },
            {
              titulo: "Novas realizações",
              texto:
                "Cada assinante pago financia o que vem a seguir — arquivo, episódios exclusivos e projetos ainda sem nome.",
            },
          ].map((item) => (
            <div key={item.titulo} className="space-y-2">
              <p className="font-manrope font-semibold text-amber-100 tracking-tight">
                {item.titulo}
              </p>
              <p className="font-manrope text-sm text-amber-200 leading-relaxed">
                {item.texto}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
