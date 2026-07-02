import Link from "next/link";
import SubstackIcon from "./icons/SubstackIcon";
import SpotifyIcon from "./icons/SpotifyIcon";

// Brand colors are fixed identity, not swappable — each platform bakes in
// its own icon, label, and color so one brand's color can never end up
// paired with another brand's icon.
const PLATFORMS = {
  substack: {
    Icon: SubstackIcon,
    iconSize: "size-3",
    label: "Leia",
    classes: "border-orange-400/50 text-orange-600 focus-visible:ring-orange-500",
  },
  spotify: {
    Icon: SpotifyIcon,
    iconSize: "size-4",
    label: "Ouça",
    classes: "border-green-400/50 text-green-800 focus-visible:ring-green-600",
  },
};

// `className` carries the background tint (it varies by surface — nav vs.
// page section — see the contrast playground) and any visibility overrides.
//
// Checked against every surface in the contrast playground (/playground):
// OK on: white, amber-200, the page's default pale-yellow body background.
// NOT OK on: black, blue-500, --amarelo (brand yellow) — the orange/green
// brand colors lose contrast there. Don't place this pill on those surfaces;
// pick a different surface for the section instead of forcing a color fix.
export default function ExternalLinkPill({ platform, href, className = "" }) {
  const { Icon, iconSize, label, classes } = PLATFORMS[platform];

  return (
    <Link
      href={href}
      className={`lowercase flex items-center gap-2 rounded-full px-3 py-1 border touch-manipulation [-webkit-tap-highlight-color:transparent] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${classes} ${className}`}
    >
      <div className={`${iconSize} flex shrink-0`}>
        <Icon className="size-full" />
      </div>
      <p className="font-space-mono">{label}</p>
    </Link>
  );
}
