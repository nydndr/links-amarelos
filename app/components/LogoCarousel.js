import OndasLogotype from "./icons/OndasLogotype";
import LinksLogotype from "./icons/LinksLogotype";

// 3 pairs per half → each half ~1248px, wider than any container
const HALF = [
  { Logo: OndasLogotype, w: "w-44" },
  { Logo: LinksLogotype, w: "w-40" },
  { Logo: OndasLogotype, w: "w-44" },
  { Logo: LinksLogotype, w: "w-40" },
  { Logo: OndasLogotype, w: "w-44" },
  { Logo: LinksLogotype, w: "w-40" },
];
const TRACK = [...HALF, ...HALF];

export default function LogoCarousel() {
  return (
    <div
      className="overflow-hidden w-full"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
      }}
    >
      <div className="flex items-center logo-marquee" style={{ width: "max-content" }}>
        {TRACK.map(({ Logo, w }, i) => (
          <Logo key={i} className={`${w} h-fit shrink-0 mr-10`} />
        ))}
      </div>
    </div>
  );
}
