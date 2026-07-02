import Button from "./Button";

export default function Timeline({ items }) {
  return (
    <div className="relative">
      <div className="absolute left-[7px] top-2 bottom-0 w-px bg-black/15" />
      <div className="space-y-8">
        {items.map((item) => (
          <div key={item.ano} className="flex gap-4">
            <div className="mt-1.5 size-3.5 rounded-full border-2 border-black/30 bg-[#fee685] shrink-0 z-10" />
            <div className="space-y-1.5 pb-1">
              <p className="font-space-mono text-xs text-black/50">{item.ano}</p>
              <p className="font-manrope font-semibold text-black leading-snug">
                {item.titulo}
              </p>
              <p className="font-manrope text-sm text-black/70 leading-relaxed">
                {item.desc}
              </p>
              {item.href && (
                <Button variant="ghost" href={item.href} className="text-xs mt-1">
                  {item.cta}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
