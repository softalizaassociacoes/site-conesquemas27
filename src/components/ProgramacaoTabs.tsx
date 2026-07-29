"use client";

import { useState } from "react";
import type { DiaProgramacao } from "@/data/programacao-2026";

export default function ProgramacaoTabs({ dias }: { dias: DiaProgramacao[] }) {
  const [ativo, setAtivo] = useState(dias[0]?.id);
  const dia = dias.find((d) => d.id === ativo) ?? dias[0];

  return (
    <div>
      <div role="tablist" aria-label="Dias do congresso" className="flex flex-wrap gap-2">
        {dias.map((d) => (
          <button
            key={d.id}
            role="tab"
            type="button"
            aria-selected={d.id === ativo}
            onClick={() => setAtivo(d.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              d.id === ativo
                ? "bg-plum-500 text-white shadow-sm"
                : "bg-white text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50"
            }`}
          >
            <span className="block">{d.rotulo}</span>
            <span
              className={`block text-[0.65rem] font-medium ${
                d.id === ativo ? "text-blush" : "text-brand-400"
              }`}
            >
              {d.data}
            </span>
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-8 space-y-10">
        {dia.trilhas.map((trilha) => (
          <section key={trilha.nome}>
            <h3 className="mb-4 border-b border-brand-100 pb-2.5 text-xs font-bold uppercase tracking-[0.2em] text-plum-500">
              {trilha.nome}
            </h3>
            <ul className="space-y-1">
              {trilha.atividades.map((a, i) => {
                const secundaria =
                  a.tipo === "intervalo" || a.tipo === "credenciamento";
                return (
                  <li
                    key={`${a.horario}-${i}`}
                    className={`grid gap-1 rounded-xl px-4 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-5 ${
                      secundaria ? "bg-sand/60" : "bg-white ring-1 ring-brand-100"
                    }`}
                  >
                    <p
                      className={`text-sm font-semibold tabular-nums ${
                        secundaria ? "text-brand-500" : "text-plum-500"
                      }`}
                    >
                      {a.horario}
                    </p>
                    <div>
                      <p
                        className={`leading-snug ${
                          secundaria
                            ? "text-sm font-medium text-brand-600"
                            : "text-brand-800"
                        }`}
                      >
                        {a.titulo}
                      </p>
                      {a.pessoas && (
                        <p className="mt-1 text-sm font-medium text-brand-600">
                          {a.pessoas}
                        </p>
                      )}
                      {a.nota && (
                        <p className="mt-1 text-xs leading-relaxed text-brand-400">
                          {a.nota}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
