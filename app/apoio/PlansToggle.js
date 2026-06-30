"use client";

import { useState } from "react";
import Link from "next/link";

export default function PlansToggle() {
  const [anual, setAnual] = useState(false);

  return (
    <section className="border-y-2 border-amber-200 grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-amber-200">
      <div className="bg-[url('/bg-texture-yellow.svg')] bg-repeat flex flex-col">
        <div className="p-8 flex flex-col gap-6 flex-1">
          <div className="space-y-2">
            <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 border w-fit">
              Membro
            </p>
            <h2 className="lowercase font-unbounded text-2xl tracking-tight">
              Canário
            </h2>
          </div>
          <div>
            <p className="font-unbounded text-4xl">Grátis</p>
            <p className="font-space-mono text-sm">para sempre</p>
          </div>
          <p className="font-manrope text-sm leading-relaxed">
            Aproveite a curadoria clássica.
          </p>
          <ul className="space-y-2 flex-1">
            <li>
              <span>links amarelos</span> a curadoria mensal que você lê
            </li>
            <li>
              <span>ondas amarelas</span> a curadoria mensal que você ouve
            </li>
          </ul>
          <Link
            href="https://amarelodandara.substack.com"
            className="font-space-mono lowercase text-sm text-center px-5 py-3 rounded-full border transition-colors"
          >
            Assinar grátis
          </Link>
        </div>
      </div>

      <div className="bg-[url('/bg-texture-yellow.svg')] bg-repeat flex flex-col">
        <div className="p-8 flex flex-col gap-6 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-2">
              <p className="lowercase rounded-full text-xs font-space-mono px-2 py-0.5 border w-fit">
                Membro
              </p>
              <h2 className="lowercase font-unbounded text-2xl tracking-tight">
                Ouro
              </h2>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <button onClick={() => setAnual(false)}>mensal</button>
              <button onClick={() => setAnual(true)}>anual</button>
            </div>
          </div>
          <div>
            <p className="font-unbounded text-4xl leading-none">
              {anual ? (
                <>
                  R$ 90
                  <sup className="font-space-mono text-xs font-normal align-super ml-1 text-amber-700">
                    3 meses grátis
                  </sup>
                </>
              ) : (
                "R$ 10"
              )}
            </p>
            <p className="font-space-mono text-sm mt-1">
              {anual ? "por ano" : "por mês"}
            </p>
          </div>
          <p className="font-manrope text-sm leading-relaxed">
            Mergulhe em links amarelos.
          </p>
          <ul className="space-y-2 flex-1">
            <li>
              <span>links amarelos</span> a curadoria mensal que você lê
            </li>
            <li>
              <span>ondas amarelas</span> a curadoria mensal que você ouve
            </li>
            <li>
              <span>hyperlinks amarelos</span> ensaios profundos de assuntos
              amarelissímos
            </li>
          </ul>
          <Link
            href="https://amarelodandara.substack.com"
            className="font-space-mono lowercase text-sm text-center px-5 py-3 rounded-full border transition-colors"
          >
            {anual ? "Assinar por R$ 90/ano" : "Assinar por R$ 10/mês"}
          </Link>
        </div>
      </div>
    </section>
  );
}
