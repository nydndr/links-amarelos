import Link from "next/link";
import PixelTrail from "./PixelTrail";

// Hierarchy decided from the /playground inventory review:
// - primary / primary-inverted: main CTAs, can opt into the brand pixel-trail
// - secondary: the amber-outline style — the white-outline variant was
//   dropped, every real usage sits on an amarelo-family surface where amber
//   reads far better
// - nav: the standalone brand-solid pill, only ever used in the nav today
// - ghost: low-emphasis inline link — underlined text, not a pill (a pill
//   here reads too much like the badges used atop sections)
//
// Checked against every surface in the contrast playground (/playground).
// NOT OK — don't place these combinations, pick a different surface instead
// of forcing a color fix:
//   primary            on blue-500        (blue button vanishes on blue)
//   primary-inverted    on white           (white button vanishes on white)
//   secondary           on amber-200       (amber text on amber-ish bg)
//   secondary           on the page's default pale-yellow background (same reason)
//   secondary           on white           (amber-100 text too pale on white)
//   nav                 on --amarelo       (brand-yellow button vanishes on brand yellow)
const VARIANTS = {
  primary: {
    className:
      "px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 active:bg-blue-700",
    trailColor: "255,255,255",
  },
  "primary-inverted": {
    // Its real usage (page.js) sits on blue-500 — a default/blue/white ring
    // vanishes there, so this variant gets its own amarelo focus ring.
    className:
      "px-6 py-3 bg-white text-blue-500 rounded-full hover:bg-blue-600 hover:text-white active:bg-blue-700 focus-visible:ring-(--amarelo)",
    trailColor: "59,130,246", // blue-500 — default white trail would vanish on this bg
  },
  secondary: {
    // Border and text share one color so they read as one cohesive outline
    // instead of two mismatched yellows.
    className:
      "px-6 py-3 border-2 border-amber-50 text-amber-50 rounded-full hover:bg-white/10 active:bg-white/20",
  },
  nav: {
    className:
      "px-4 py-2 bg-(--amarelo) text-amber-50 font-bold rounded-full tracking-wide hover:brightness-95 active:brightness-90",
  },
  ghost: {
    className:
      "text-black/70 underline underline-offset-2 decoration-black/30 hover:decoration-black active:text-black",
  },
};

// Playground-only: forces a state's look without needing real interaction,
// so every state can be reviewed on a static page. `!`-prefixed to win over
// the variant's own hover:/active: utilities regardless of class order.
const STATE_PREVIEW = {
  primary: {
    hover: "!bg-blue-600",
    active: "!bg-blue-700",
    focus: "!ring-2 !ring-blue-500 !ring-offset-1",
  },
  "primary-inverted": {
    hover: "!bg-blue-600 !text-white",
    active: "!bg-blue-700 !text-white",
    focus: "!ring-2 !ring-(--amarelo) !ring-offset-1",
  },
  secondary: {
    hover: "!bg-white/10",
    active: "!bg-white/20",
    focus: "!ring-2 !ring-amber-50 !ring-offset-1",
  },
  nav: {
    hover: "!brightness-95",
    active: "!brightness-90",
    focus: "!ring-2 !ring-amber-50 !ring-offset-1",
  },
  ghost: {
    hover: "!decoration-black",
    active: "!text-black",
    focus: "!ring-2 !ring-black/30 !ring-offset-1",
  },
};

export default function Button({
  variant = "primary",
  href,
  trail = false,
  disabled = false,
  previewState, // "hover" | "active" | "focus" — playground only
  className = "",
  children,
}) {
  const { className: variantClassName, trailColor } = VARIANTS[variant];
  const isPill = variant !== "ghost";
  const previewClassName = previewState
    ? STATE_PREVIEW[variant]?.[previewState]
    : "";

  const sharedClassName = `relative whitespace-nowrap font-space-mono lowercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${isPill ? "inline-flex items-center overflow-hidden" : "inline"} ${variantClassName} ${disabled ? "opacity-40 pointer-events-none cursor-not-allowed" : ""} ${previewClassName} ${className}`;

  if (disabled) {
    return (
      <span className={sharedClassName} aria-disabled="true" tabIndex={-1}>
        {trail && <PixelTrail color={trailColor} paused />}
        <span className="relative">{children}</span>
      </span>
    );
  }

  return (
    <Link href={href} className={sharedClassName}>
      {trail && <PixelTrail color={trailColor} />}
      <span className="relative">{children}</span>
    </Link>
  );
}
