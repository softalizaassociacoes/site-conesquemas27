"use client";

import { useState } from "react";

export type ItemAcordeao = { titulo: string; conteudo: string[] };

export default function Acordeao({ itens }: { itens: ItemAcordeao[] }) {
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-brand-100 overflow-hidden rounded-2xl border border-brand-100 bg-white">
      {itens.map((item, i) => {
        const expandido = aberto === i;
        return (
          <li key={item.titulo}>
            <h3>
              <button
                type="button"
                onClick={() => setAberto(expandido ? null : i)}
                aria-expanded={expandido}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-plum-50/50 sm:px-6 sm:py-5"
              >
                <span className="font-sans text-base font-medium text-brand-800">
                  {item.titulo}
                </span>
                <span
                  className={`mt-0.5 shrink-0 text-plum-500 transition ${
                    expandido ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            {expandido && (
              <div className="space-y-3 px-5 pb-5 sm:px-6 sm:pb-6">
                {item.conteudo.map((p, j) => (
                  <p key={j} className="text-sm leading-relaxed text-brand-600">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
