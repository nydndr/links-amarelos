import OndasLogotype from "./icons/OndasLogotype";
import LinksLogotype from "./icons/LinksLogotype";

export default function LogoCarousel() {
  return (
    <div className="overflow-hidden w-full">
      <style>{`
        @keyframes logo-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex items-center"
        style={{
          width: "max-content",
          animation: "logo-marquee 8s linear infinite",
          willChange: "transform",
        }}
      >
        <OndasLogotype className="w-44 h-fit shrink-0 mr-10" />
        <LinksLogotype className="w-40 h-fit shrink-0 mr-10" />
        <OndasLogotype className="w-44 h-fit shrink-0 mr-10" />
        <LinksLogotype className="w-40 h-fit shrink-0 mr-10" />
      </div>
    </div>
  );
}
