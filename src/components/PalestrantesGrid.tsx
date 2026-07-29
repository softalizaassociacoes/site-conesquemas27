"use client";

import Image from "next/image";
import { useState } from "react";
import type { Palestrante } from "@/data/palestrantes";

export default function PalestrantesGrid({
  palestrantes,
}: {
  palestrantes: Palestrante[];
}) {
  const [aberto, setAberto] = useState<string | null>(null);

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {palestrantes.map((p) => {
        const expandido = aberto === p.slug;
        return (
          <li key={p.slug} className="flex flex-col">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-brand-100">
              {p.foto ? (
                <Image
                  src={p.foto}
                  alt={p.nome}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-4xl text-brand-300">
                  <span aria-hidden="true">✿</span>
                </div>
              )}
            </div>

            <h3 className="mt-4 text-base leading-snug text-brand-800">{p.nome}</h3>

            {p.bio ? (
              <>
                <button
                  type="button"
                  onClick={() => setAberto(expandido ? null : p.slug)}
                  aria-expanded={expandido}
                  className="mt-1.5 self-start text-xs font-semibold uppercase tracking-widest text-plum-500 transition hover:text-plum-700"
                >
                  {expandido ? "Ver menos" : "Ver mais"}
                </button>
                {expandido && (
                  <p className="mt-3 text-sm leading-relaxed text-brand-600">
                    {p.bio}
                  </p>
                )}
              </>
            ) : (
              <p className="mt-1.5 text-xs text-brand-400">Currículo em breve</p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
