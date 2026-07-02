import ExternalLinkPill from "../components/ExternalLinkPill";
import Button from "../components/Button";

// Every distinct background surface the site actually uses, plus black/white
// as contrast extremes — so pill contrast gets checked directly, not guessed.
const BACKGROUNDS = [
    { label: "--amarelo (fundo principal)", className: "bg-(--amarelo)" },
    { label: "amber-200 (superfície)", className: "bg-amber-200" },
    { label: "blue-500 (painel apoie)", className: "bg-blue-500" },
    { label: "fundo padrão da página", className: "bg-[oklch(92.4%_0.12_95.746)]" },
    { label: "white", className: "bg-white" },
    { label: "black", className: "bg-black" },
];

// Consolidated after the /playground review round: white-outline secondary
// dropped in favor of amber-outline (every real usage sits on an
// amarelo-family surface, where amber reads far better), the unstyled plan
// card CTA folded into secondary, ghost restyled from pill to underline.
//
// `badOn` was flagged via agentation comments — those cells are pruned from
// the contrast grid below instead of shown broken. See components/Button.jsx
// for the same list, kept as the source of truth.
// `states` is the background used for the default/hover/focus/active/disabled
// strip — always one of the surfaces this variant is actually cleared for.
const BUTTONS = [
    {
        key: "primary",
        variant: "primary",
        label: "Primary",
        note: "sobre/page.js (\"apoiar o projeto\"), realizacoes/RealizacoesClient.js (\"ver planos de apoio\"). Supports an optional `trail` prop (brand pixel-trail sweep).",
        text: "assinar",
        badOn: ["blue-500 (painel apoie)"],
        states: "--amarelo (fundo principal)",
    },
    {
        key: "primary-inverted",
        variant: "primary-inverted",
        label: "Primary — inverted",
        note: "page.js (\"ver planos\", inside the already-blue apoie panel). `trail` defaults to a blue sweep here so it stays visible on white.",
        text: "ver planos",
        badOn: ["white"],
        states: "blue-500 (painel apoie)",
    },
    {
        key: "secondary",
        variant: "secondary",
        label: "Secondary",
        note: "sobre/page.js, page.js (\"ver realizações\"), apoio/page.js (\"fazer uma doação\"), apoio/PlansToggle.js plan CTAs — all consolidated onto this one style.",
        text: "assinar grátis",
        badOn: ["amber-200 (superfície)", "fundo padrão da página", "white"],
        states: "--amarelo (fundo principal)",
    },
    {
        key: "nav",
        variant: "nav",
        label: "Nav / brand CTA",
        note: "layout.js (\"Apoie\") — the only prominent non-primary CTA, currently nav-only.",
        text: "apoie",
        badOn: ["--amarelo (fundo principal)"],
        states: "amber-200 (superfície)",
    },
    {
        key: "ghost",
        variant: "ghost",
        label: "Ghost",
        note: "components/Timeline.js — underlined text, not a pill (a pill reads too much like the section badges).",
        text: "ler mais",
        badOn: [],
        states: "white",
    },
];

const STATES = ["default", "hover", "focus", "active", "disabled"];

export default function PlaygroundPage() {
    return (
        <main className="font-space-mono min-h-screen bg-amber-50 px-6 py-12">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="space-y-1">
                    <h1 className="text-2xl font-manrope font-semibold text-stone-900">
                        Playground
                    </h1>
                    <p className="text-sm text-stone-600">
                        Espaço pra conferir peças visuais antes de ir pro ar.
                    </p>
                </div>

                <section className="space-y-3">
                    <h2 className="text-sm font-semibold text-stone-700">
                        Contraste — pills de redirecionamento
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {BACKGROUNDS.map(({ label, className }) => (
                            <div
                                key={label}
                                className={`flex flex-col gap-4 p-8 rounded border border-stone-200 ${className}`}
                            >
                                <span className="text-[10px] text-stone-500 bg-white/70 self-start px-1.5 py-0.5 rounded">
                                    {label}
                                </span>
                                <div className="flex gap-3 flex-wrap">
                                    <ExternalLinkPill
                                        platform="substack"
                                        href="https://amarelodandara.substack.com"
                                    />
                                    <ExternalLinkPill
                                        platform="spotify"
                                        href="https://open.spotify.com/show/043Gs7eyY2KOlotEWSTSxB?si=e7abf2b9730747d7"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-3">
                    <h2 className="text-sm font-semibold text-stone-700">
                        Botões — components/Button.jsx
                    </h2>
                    <p className="text-xs text-stone-500 max-w-2xl">
                        Hierarquia final decidida a partir da rodada de
                        comentários — cada card abaixo é o componente real,
                        não uma cópia do className.
                    </p>
                    <div className="space-y-10">
                        {BUTTONS.map(({ key, variant, label, note, text, badOn, states }) => {
                            const validBackgrounds = BACKGROUNDS.filter(
                                (bg) => !badOn.includes(bg.label),
                            );
                            const statesBg = BACKGROUNDS.find(
                                (bg) => bg.label === states,
                            );
                            return (
                                <div key={key} className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-stone-800">
                                            {label}
                                        </h3>
                                        <p className="text-[11px] text-stone-500">
                                            {note}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {validBackgrounds.map((bg) => (
                                            <div
                                                key={bg.label}
                                                className={`flex flex-col items-center justify-center gap-3 p-8 rounded border border-stone-200 ${bg.className}`}
                                            >
                                                <span className="text-[10px] text-stone-500 bg-white/70 px-1.5 py-0.5 rounded self-start">
                                                    {bg.label}
                                                </span>
                                                <Button variant={variant} href="#">
                                                    {text}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-1.5">
                                        <span className="text-[10px] text-stone-500 uppercase tracking-widest">
                                            Estados — sobre {statesBg.label}
                                        </span>
                                        <div
                                            className={`grid grid-cols-2 sm:grid-cols-5 gap-3 p-6 rounded border border-stone-200 ${statesBg.className}`}
                                        >
                                            {STATES.map((state) => (
                                                <div
                                                    key={state}
                                                    className="flex flex-col items-center gap-2"
                                                >
                                                    <span className="text-[9px] text-stone-500 bg-white/70 px-1 py-0.5 rounded">
                                                        {state}
                                                    </span>
                                                    <Button
                                                        variant={variant}
                                                        href="#"
                                                        disabled={state === "disabled"}
                                                        previewState={
                                                            state === "default" ||
                                                            state === "disabled"
                                                                ? undefined
                                                                : state
                                                        }
                                                    >
                                                        {text}
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-[11px] text-stone-500 max-w-2xl pt-2">
                        Não incluídos (estruturalmente diferentes de um botão
                        simples de texto): o botão físico de hold-to-interact
                        (ExperimenteSection.jsx), os ícones utilitários sem
                        fundo (copiar/abrir em AutoTooltips.js e
                        FloatingLink.jsx), e o toggle segmentado mensal/anual
                        (PlansToggle.js, hoje sem estilo nenhum).
                    </p>
                </section>
            </div>
        </main>
    );
}
