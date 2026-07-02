import Image from "next/image";
import Link from "next/link";
import AutoTooltips from "./components/AutoTooltips";
import LogoCarousel from "./components/LogoCarousel";
import CurationAnimation from "./components/CurationAnimation";
import ExperimenteSection from "./components/ExperimenteSection";
import CountdownOdometer from "./components/CountdownOdometer";
import FloatingLink from "./components/FloatingLink";
import ExternalLinkPill from "./components/ExternalLinkPill";
import Button from "./components/Button";

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
                    <div className="flex flex-col items-center py-16 md:aspect-square justify-around bg-[url('/bg-texture-cutting-pad.svg')] bg-cover">
                        <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50  text-white w-fit mx-auto">
                            Explore
                        </p>

                        <div className="font-manrope text-center mx-auto space-y-4">
                            <p className="w-2/3 mx-auto text-xl  font-semibold tracking-tigther leading-snug">
                                Newsletters e podcasts <br></br> são só o começo
                            </p>
                            <p className="w-2/3 mx-auto">
                                Com o seu apoio o plano é explorar a internet, o
                                mundo físico, pintar cidades de amarelo e muito
                                mais...
                            </p>
                        </div>

                        <Button variant="secondary" href="/realizacoes" className="text-sm">
                            ver realizações
                        </Button>
                    </div>

                    <div className="flex flex-col items-center py-16 md:aspect-square justify-around bg-blue-500 text-white">
                        <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50  text-white w-fit mx-auto">
                            Apoie
                        </p>

                        <div className="font-manrope text-center mx-auto space-y-4 ">
                            <p className="w-2/3 mx-auto text-xl  font-semibold tracking-tigther leading-snug">
                                Junte-se aos canarinhos
                            </p>
                            <div className="flex justify-center">
                                <div className="size-24 aspect-square bg-red-200"></div>
                                <div className="size-24 aspect-square bg-red-200"></div>
                            </div>

                            <p className="w-4/5 mx-auto">
                                Apoie as iniciativas com planos mensais, anuais
                                e doações expontâneas
                            </p>
                        </div>

                        <Button variant="primary-inverted" href="/apoio" className="text-sm">
                            ver planos
                        </Button>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 border-y border-amber-200 divide-y md:divide-y-0 md:divide-x-2 divide-amber-200">
                    <div className="flex flex-col items-center py-16 md:aspect-square justify-around bg-amber-200">
                        <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50  text-white w-fit mx-auto">
                            última edição
                        </p>

                        <div className="flex flex-col items-center gap-2">
                            <div>
                                <p className="font-manrope text-2xl font-bold tracking-tighter">
                                    links amarelos #8
                                </p>
                                <p className="font-unbounded">
                                    ondas amarelas #8
                                </p>
                            </div>

                            <p className="w-3/4 font-manrope text-center text-sm">
                                uma semana de pensamento com o Espírito Santo,
                                amém
                            </p>
                        </div>
                        <div className="flex w-full justify-center border-y border-amber-200">
                            <Image
                                src="/brand/links-amarelos-8.png"
                                width={2000}
                                height={2000}
                                className="size-30 aspect-square rotate-6 -my-3 shrink-0 outline outline-2 outline-amber-200 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-translate-y-1"
                                alt="links amarelos #3"
                            />
                            <Image
                                src="/brand/ondas-amarelas-8.png"
                                width={2000}
                                height={2000}
                                className="size-30 aspect-square -rotate-6 -my-3 shrink-0 outline outline-2 outline-amber-200 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-translate-y-1"
                                alt="links amarelos #3"
                            />
                        </div>

                        <div className="flex gap-2">
                            <ExternalLinkPill
                                platform="substack"
                                href="https://amarelodandara.substack.com"
                                className="hidden md:flex bg-white/20"
                            />
                            <ExternalLinkPill
                                platform="spotify"
                                href="https://open.spotify.com/show/043Gs7eyY2KOlotEWSTSxB?si=e7abf2b9730747d7"
                                className="hidden md:flex bg-white/20"
                            />
                        </div>
                    </div>

                    <div className="items-center pt-16 md:aspect-square">
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
                                    src="/brand/coming-newsletter.png"
                                    width={2000}
                                    height={2000}
                                    className="size-36 aspect-square rotate-6 -my-3 shrink-0 outline outline-2 outline-amber-200 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-translate-y-1"
                                    alt="links amarelos #3"
                                />

                                <div className="text-center flex flex-col items-center">
                                    <div className="flex items-start gap-2">
                                        <p className="font-manrope font-bold text-lg tracking-tight">
                                            hyperlinks amarelos #1
                                        </p>

                                        <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 bg-white/10 border border-white/50  text-white w-fit mx-auto">
                                            grátis
                                        </p>
                                    </div>

                                    <p className="font-redacted text-sm text-amber-200 w-4/5">
                                        o primeiro episódio dos hyperlinks
                                        amarelos, grátis pra todos, com a coisa
                                        mais amarela que já entrou em campo
                                    </p>
                                </div>
                            </div>
                            <div className="border-amber-200 border-t flex justify-center items-center gap-6">
                                <div className="flex">
                                    <Image
                                        src="/brand/coming-newsletter.png"
                                        width={2000}
                                        height={2000}
                                        className="size-16 aspect-square -rotate-6  shrink-0 outline outline-2 outline-amber-200 "
                                        alt="links amarelos #3"
                                    />

                                    <Image
                                        src="/brand/coming-podcast.png"
                                        width={2000}
                                        height={2000}
                                        className="size-16 aspect-square rotate-6 shrink-0 outline outline-2 outline-amber-200 "
                                        alt="links amarelos #3"
                                    />
                                </div>

                                <div className="">
                                    <p className="font-manrope text-xl font-bold tracking-tight">
                                        links amarelos #9
                                    </p>
                                    <p className="font-unbounded text-sm">
                                        ondas amarelas #9
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative grid grid-cols-1 md:grid-cols-2 py-20 font-manrope  bg-amber-200 border-x border-(--amarelo) overflow-hidden">
                    <div className=" px-12 flex flex-col justify-end gap-6">
                        {" "}
                        <p className="text-xl font-semibold tracking-tight leading-snug">
                            Os links amarelos são curados e realizados{" "}
                            <span className="text-amber-300">
                                {" "}
                                em uma semana{" "}
                            </span>{" "}
                            por amarelo dandara.
                        </p>
                        <Link
                            href="/sobre"
                            className="font-space-mono lowercase text-sm underline underline-offset-4 decoration-amber-300 hover:text-white transition-colors"
                        >
                            Leia o manifesto amarelo
                        </Link>
                    </div>

                    <div className="font-manrope px-12">
                        <ul className="space-y-2 lowercase">
                            <li className="">
                                <span className="font-semibold tracking-tight">
                                    Curadoria{" "}
                                </span>
                                Amarelo Dandara
                            </li>
                            <li className="">
                                <span className="font-semibold tracking-tight">
                                    Escrita{" "}
                                </span>
                                Amarelo Dandara
                            </li>
                            <li className="">
                                <span className="font-semibold tracking-tight">
                                    Narração{" "}
                                </span>
                                Amarelo Dandara
                            </li>
                            <li className="">
                                <span className="font-semibold tracking-tight">
                                    Produção{" "}
                                </span>
                                Amarelo Dandara
                            </li>
                            <li className="">
                                <span className="font-semibold tracking-tight">
                                    Edição{" "}
                                </span>
                                Amarelo Dandara
                            </li>
                            <li className="">
                                <span className="font-semibold tracking-tight">
                                    Design{" "}
                                </span>
                                Amarelo Dandara
                            </li>
                            <li className="">
                                <span className="font-semibold tracking-tight">
                                    Desenvolvimento{" "}
                                </span>
                                Amarelo Dandara
                            </li>
                            <li className="">
                                <span className="font-semibold tracking-tight">
                                    Direção Criativa{" "}
                                </span>
                                Amarelo Dandara
                            </li>
                        </ul>

                        <div className="mt-6 pt-6 border-t border-(--amarelo)">
                            <p className="lowercase">
                                <span className="font-semibold tracking-tight">
                                    Apoio{" "}
                                </span>
                                amigos, amarelinhos
                            </p>
                        </div>
                    </div>
                    <FloatingLink
                        title="Link 01"
                        url="https://placeholder.com/01"
                    />
                </section>
            </div>
        </main>
    );
}
