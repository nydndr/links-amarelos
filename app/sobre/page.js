import Link from "next/link";
import LinksLogotype from "../components/icons/LinksLogotype";
import OndasLogotype from "../components/icons/OndasLogotype";
import HyperlinksLogo from "../components/icons/HyperlinksLogo";
import Timeline from "../components/Timeline";
import TypingCycler from "../components/TypingCycler";

export const metadata = {
  title: "Sobre — Links Amarelos",
  description: "O que é Links Amarelos e quem está por trás.",
};

const timeline = [
  {
    ano: "setembro de 2025",
    titulo: "links amarelos #1 é enviado",
    desc: "Após muitos pedidos, amarelo dandara finalmente dá ouvido aos seus amigos e envia a primeira coleção dos melhores links que encontrou no mês.",
    href: "https://amarelodandara.substack.com/links-amarelos-1",
    cta: "leia no Substack",
  },
  {
    ano: "janeiro de 2026",
    titulo: "a estreia das ondas amarelas",
    desc: "Os links amarelos ganham voz! O podcast nasce como uma extensão natural da newsletter - mesmos temas, outro formato.",
    href: "https://amarelodandara.substack.com",
    cta: "Ouça no Spotify",
  },
  {
    ano: "maio de 2026",
    titulo: "começa a comunidade",
    desc: "Os links amarelos se abre para doações e inscrições, com recompensas para quem contribui.",
  },
  {
    ano: "junho de 2026",
    titulo: "linksamarelos.com vai ao ar",
    desc: "Sejam bem vindos ao CEP dos linksamarelos na internet.",
  },
];

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-(--amarelo) w-full md:max-w-4xl md:mx-auto">
      {/* Header */}
      <section className="border-b border-amber-200 px-8 py-16 space-y-6">
        <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50 text-amber-100 w-fit">
          sobre
        </p>
        <h1>
          <LinksLogotype
            role="img"
            aria-label="Links Amarelos"
            className="h-10 md:h-14 w-auto text-amber-50"
          />
        </h1>
        <p className="font-manrope text-xl text-amber-100 max-w-lg leading-relaxed">
          Uma curadoria mensal pra te tirar dos sites virais e te levar às
          vizinhanças que você nunca visitou na internet.
        </p>
      </section>

      {/* O que é */}
      <section className="grid md:grid-cols-2">
        {/* Left: produtos */}
        <div className="divide-y divide-amber-200 grid grid-rows-3">
          <div className="p-8 space-y-3">
            <LinksLogotype
              role="img"
              aria-label="Links Amarelos"
              className="h-4 w-auto text-amber-100"
            />
            <p className="font-manrope text-amber-100 leading-relaxed">
              Uma newsletter mensal que reúne o melhor que uma designer
              altamente técnica, careca, negra e personality hire encontrou por
              aí.
            </p>
          </div>

          <div className="p-8 space-y-3">
            <OndasLogotype
              role="img"
              aria-label="Ondas Amarelas"
              className="h-4 w-auto text-amber-100"
            />
            <p className="font-manrope text-amber-100 leading-relaxed">
              O que acontece quando os links amarelos ganham voz! Uma versão
              expandida da conversa também lançada mensalmente no seu ouvidor de
              áudio favorito.
            </p>
          </div>

          <div className="p-8 space-y-3 bg-purple-500">
            <HyperlinksLogo
              role="img"
              aria-label="Hyperlinks Amarelos"
              className="h-4 w-auto text-white"
            />
            <p className="font-manrope text-white leading-relaxed">
              Quando um link extrapola os limites de uma newsletter e não
              consegue conviver com outras recomendações em um podcast de meia
              hora, ele ganha um espaço dedicado em forma de ensaio por áudio.
            </p>
          </div>
        </div>

        {/* Right: timeline */}
        <div className="p-8 space-y-6 bg-amber-200 border-r border-(--amarelo)">
          <p className="uppercase text-sm text-(--amarelo) px-4 py-2 font-unbounded">
            Como chegamos aqui
          </p>
          <Timeline items={timeline} />
        </div>
      </section>

      {/* Manifesto */}
      <section id="manifesto" className="border-b border-amber-200">
        <div className="px-8 py-16 space-y-10">
          <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50 text-amber-100 w-fit">
            manifesto
          </p>

          <div className="font-manrope text-lg w-3/4 space-y-10">
            {/* Intro */}
            <div className="space-y-5">
              <p>
                Links podem começar com qualquer coisa, mas acho que esquecemos
                disso. Hoje em dia todos os links começam com{" "}
                <span className="font-space-mono bg-amber-200 px-1">
                  https://
                  <TypingCycler />
                </span>
                .
              </p>
              <p>
                Mas aqui não. Aqui eles começam com profundidade, pertencem a
                qualquer mídia e se sustentam com o apoio de vocês.
              </p>
              <p>
                Os links amarelos, as ondas amarelas, e o que mais sair disso,
                são uma contribuição para que passemos mais tempo na internet
                como o nosso bairro e não como o shopping deles.
              </p>
              <p>
                Tudo o que fazemos para que isso aconteça, se apoia em quatro
                princípios:
              </p>
            </div>

            {/* Princípio 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight">
                Profundo e Otimista
              </h3>
              <p>
                Enquanto o resto da internet estiver preocupado com resumir,
                cortar e viralizar, aqui eu vou me preocupar com respirar fundo,
                com rolar até o fim da página e priorizar a mensagem. Isso
                envolve contar a mensagem na mídia que ela precisa e não na mais
                rápida, contar com calma e contar com fontes.
              </p>
              <p>
                Essa profundidade vai ser feita com otimismo. É fácil achar o
                lado ruim das coisas, é mais fácil ainda se beneficiar dele. É
                muito mais difícil discutir pontos que não explodiram em
                vermelho essa semana, mas que ninguém vai se lembrar semana que
                vem. Felizmente os links são amarelos, não vermelhos ou sequer
                laranjas.
              </p>
            </div>

            {/* Princípio 2 */}
            <div className="space-y-4">
              <h3 className="font-unbounded text-xl text-black tracking-tight">
                Presente e Multimídia
              </h3>
              <p>
                A internet é mais que texto e imagem, vídeo curto e propaganda.
                Eu procuro por elementos inusitados, por histórias sendo
                contadas sem som, com muito som ou só com o teclado. O amarelo
                mora nelas.
              </p>
              <p>
                E eu amo a internet, mas o mundo não acaba aqui. Eu encontro
                pessoas que são otimistas e as apoio com profundidade no mundo
                real, no mundo físico, no mundo impresso, nas letras e nas
                ondas.
              </p>
            </div>

            {/* Princípio 3 */}
            <div className="space-y-4">
              <h3 className="font-unbounded text-xl text-black tracking-tight">
                Auto-sustentável e Expansivo
              </h3>
              <p>
                A curadoria não começou com a primeira edição da newsletter e
                não vai parar se um dia ela acabar. Tudo isso é apenas a minha
                maneira de alcançar ainda mais pessoas que se interessam por
                ela. A melhor maneira de manter essa transmissão rodando é
                escolher o caminho mais eficiente, mais longevo e mais honesto.
                Mesmo que ele também seja o mais engenhoso.
              </p>
              <p>
                A melhor maneira de expandi-lo é com consistência, transparência
                e vivendo o resto da minha vida porque tem muitas outras cores
                por aí.
              </p>
            </div>

            {/* Princípio 4 */}
            <div className="space-y-4">
              <h3 className="font-unbounded text-xl text-black tracking-tight">
                Apoiado e Apoiador
              </h3>
              <p>
                Todo apoio dado a esse projeto me dá a simples chance de:
                continuar brincando. O meu único interesse é que toda iniciativa
                amarela sempre tenha chance de parar de pé quando for lançada
                pra cima e, se precisar, deixada sozinha.
              </p>
              <p>
                E enquanto me seguram de pé, impulsionarei outros pra cima.
                Sempre procurarei oportunidades de apoiar, retribuir, e dar o
                elogio que alguém precisa pra continuar fazendo o que ama e o
                que sabe. Se precisar de mim, é só me chamar.
              </p>
            </div>

            {/* Fechamento */}
            <div className="space-y-8 pt-4 border-t border-amber-200">
              <p>
                Esses princípios trazem todas as recomendações até vocês e guiam
                todas as realizações do papel para a realidade. É com eles que
                não eu, mas nós, vamos pintar o mundo de amarelo.
              </p>
              <div className="space-y-1">
                <p className="font-unbounded text-base text-black">
                  Amarelo Dandara
                </p>
                <p className="italic">
                  <a
                    href="https://en.wikipedia.org/wiki/Gesamtkunstwerk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-colors"
                  >
                    Gesamtkunstwerk
                  </a>{" "}
                  dos links amarelos e +
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quem faz */}
      <section className="border-b border-amber-200 px-8 py-12 space-y-4">
        <p className="uppercase text-xs text-amber-200 font-unbounded tracking-widest">
          Quem faz
        </p>
        <p className="font-manrope text-amber-100 leading-relaxed max-w-prose">
          Amarelo dandara. Escritor, curioso profissional e colecionador de
          links desde antes de isso ter nome.
        </p>
        <p className="font-manrope text-amber-100 leading-relaxed max-w-prose">
          Links Amarelos nasceu da vontade de compartilhar o que vale a pena na
          internet — sem algoritmo, sem anúncio, sem pressa.
        </p>
      </section>

      {/* CTA */}
      <section className="px-8 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <p className="font-manrope text-xl font-semibold text-amber-100 tracking-tight">
            Pronto para começar?
          </p>
          <p className="font-manrope text-amber-200 text-sm">
            Assine grátis ou apoie o projeto.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="https://amarelodandara.substack.com"
            className="font-space-mono lowercase px-6 py-3 border border-amber-200 rounded-full text-amber-100 hover:bg-white/10 transition-colors"
          >
            assinar grátis
          </Link>
          <Link
            href="/apoio"
            className="font-space-mono lowercase px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            apoiar o projeto
          </Link>
        </div>
      </section>
    </main>
  );
}
