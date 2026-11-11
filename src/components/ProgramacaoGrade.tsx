"use client";

import { useState } from "react";
import {
  SALA_TODAS,
  type Atividade,
  type DiaProgramacao,
  type Faixa,
} from "@/data/programacao";

/**
 * Grade da programação, no formato pedido pela organização em 11/11/2026:
 * o mesmo do ConNeuroPsi, que eles consideram mais fácil de consultar —
 * abas por dia, tabela com as salas em colunas e os horários em linhas.
 *
 * No celular a tabela vira lista: três colunas de texto corrido não cabem em
 * 375px sem rolagem lateral, então cada horário abre os cartões das salas
 * empilhados, cada um com o nome da sala em cima.
 *
 * Nada aqui edita o conteúdo — títulos, nomes, horários e salas saem de
 * src/data/programacao.ts exatamente como vieram da planilha.
 */

/**
 * Cor de cada tipo de atividade. Todas foram escolhidas com contraste mínimo
 * de 4.9:1 sobre o texto branco da etiqueta (AA para texto pequeno). Tipo sem
 * cor definida cai no cinza do padrão — não some nem fica ilegível.
 */
const CORES_TIPO: Record<string, string> = {
  Palestra: "#67699a",
  Conferência: "#9d4d78",
  Mesa: "#4e6b7a",
  Dupla: "#4a7268",
  Trabalhos: "#7d6e55",
  Patrocinador: "#6f6f80",
  Encerramento: "#43456a",
};
const COR_PADRAO = "#6f6f80";

function cor(tipo: string) {
  return CORES_TIPO[tipo] ?? COR_PADRAO;
}

/** "Sábado" -> "sabado": id de elemento sem acento, para aria-controls. */
function slug(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/** Salas usadas no dia, na ordem em que aparecem. "Todas" não é sala. */
function salasDoDia(dia: DiaProgramacao) {
  const vistas: string[] = [];
  for (const faixa of dia.faixas) {
    for (const atividade of faixa.atividades) {
      if (atividade.sala !== SALA_TODAS && !vistas.includes(atividade.sala)) {
        vistas.push(atividade.sala);
      }
    }
  }
  return vistas;
}

/** Faixa que vale para o congresso inteiro — os intervalos da planilha. */
function ehFaixaUnica(faixa: Faixa) {
  return faixa.atividades.every((a) => a.sala === SALA_TODAS);
}

function Etiqueta({ tipo }: { tipo: string }) {
  return (
    <span
      className="inline-block rounded px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-[0.06em] text-white"
      style={{ backgroundColor: cor(tipo) }}
    >
      {tipo}
    </span>
  );
}

function BlocoAtividade({ atividade }: { atividade: Atividade }) {
  return (
    <div>
      <Etiqueta tipo={atividade.tipo} />

      <p className="mt-1.5 text-sm font-semibold leading-snug text-brand-800">
        {atividade.titulo}
      </p>

      {atividade.detalhes && (
        <ul className="mt-2 space-y-1.5">
          {atividade.detalhes.map((detalhe) => (
            <li
              key={detalhe}
              className="relative pl-3.5 text-[0.85rem] leading-snug text-brand-600"
            >
              <span className="absolute left-0 top-0 text-rosa" aria-hidden="true">
                •
              </span>
              {detalhe}
            </li>
          ))}
        </ul>
      )}

      {atividade.palestrantes && (
        <p className="relative mt-2 pl-3.5 text-[0.85rem] font-semibold leading-snug text-plum-600">
          <span className="absolute left-0 top-0 text-rosa" aria-hidden="true">
            •
          </span>
          {atividade.palestrantes}
        </p>
      )}
    </div>
  );
}

/** Conteúdo da faixa que ocupa a largura toda (intervalos). */
function ConteudoFaixaUnica({ faixa }: { faixa: Faixa }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
      {faixa.atividades.map((a) => (
        <span
          key={a.titulo}
          className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1"
        >
          <Etiqueta tipo={a.tipo} />
          <span className="text-sm font-semibold text-brand-700">
            {a.titulo}
          </span>
        </span>
      ))}
    </div>
  );
}

const CELULA = "border border-brand-100 px-3 py-3 align-top";

function Tabela({
  dia,
  salas,
  titulo,
}: {
  dia: DiaProgramacao;
  salas: string[];
  titulo: string;
}) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-brand-100 lg:block">
      <table className="w-full table-fixed border-collapse text-left">
        <caption className="sr-only">{titulo}</caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="w-[9.5rem] border border-brand-100 bg-brand-50 px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-brand-700"
            >
              Horário
            </th>
            {salas.map((sala) => (
              <th
                key={sala}
                scope="col"
                className="border border-brand-100 bg-brand-50 px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-brand-700"
              >
                {sala}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dia.faixas.map((faixa) => (
            <tr key={faixa.horario}>
              <th
                scope="row"
                className="border border-brand-100 bg-sand/40 px-3 py-3 text-left align-top text-xs font-bold tabular-nums text-brand-700"
              >
                {faixa.horario}
              </th>

              {ehFaixaUnica(faixa) ? (
                <td
                  colSpan={salas.length}
                  className={`${CELULA} bg-sand/25 text-center`}
                >
                  <ConteudoFaixaUnica faixa={faixa} />
                </td>
              ) : (
                salas.map((sala) => {
                  const naSala = faixa.atividades.filter(
                    (a) => a.sala === sala,
                  );
                  return (
                    <td key={sala} className={CELULA}>
                      {naSala.length === 0 ? (
                        <span className="text-sm text-brand-300" aria-hidden="true">
                          —
                        </span>
                      ) : (
                        <div className="space-y-4">
                          {naSala.map((atividade) => (
                            <BlocoAtividade
                              key={atividade.titulo}
                              atividade={atividade}
                            />
                          ))}
                        </div>
                      )}
                    </td>
                  );
                })
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Lista({ dia, salas }: { dia: DiaProgramacao; salas: string[] }) {
  return (
    <ol className="space-y-5 lg:hidden">
      {dia.faixas.map((faixa) => (
        <li key={faixa.horario}>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide tabular-nums text-brand-500">
            {faixa.horario}
          </p>

          {ehFaixaUnica(faixa) ? (
            <div className="rounded-xl border border-brand-100 bg-sand/40 px-4 py-3">
              <ConteudoFaixaUnica faixa={faixa} />
            </div>
          ) : (
            <div className="space-y-3">
              {salas.map((sala) => {
                const naSala = faixa.atividades.filter((a) => a.sala === sala);
                if (naSala.length === 0) return null;
                return (
                  <div
                    key={sala}
                    className="rounded-xl border border-brand-100 bg-white px-4 py-3 shadow-sm"
                  >
                    <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-brand-400">
                      {sala}
                    </p>
                    <div className="space-y-4">
                      {naSala.map((atividade) => (
                        <BlocoAtividade
                          key={atividade.titulo}
                          atividade={atividade}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function ProgramacaoGrade({
  dias,
  ano,
}: {
  dias: DiaProgramacao[];
  ano: number;
}) {
  const [diaAtivo, setDiaAtivo] = useState(dias[0]?.dia ?? "");

  // Legenda só com os tipos que realmente aparecem, na ordem em que surgem.
  const tipos: string[] = [];
  for (const dia of dias) {
    for (const faixa of dia.faixas) {
      for (const a of faixa.atividades) {
        if (!tipos.includes(a.tipo)) tipos.push(a.tipo);
      }
    }
  }

  return (
    <div>
      <ul className="mb-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-brand-600">
        {tipos.map((tipo) => (
          <li key={tipo} className="inline-flex items-center gap-2">
            <span
              className="h-[11px] w-[11px] rounded-[3px]"
              style={{ backgroundColor: cor(tipo) }}
              aria-hidden="true"
            />
            {tipo}
          </li>
        ))}
      </ul>

      <div role="tablist" aria-label="Dias do congresso" className="mb-6 flex flex-wrap gap-2">
        {dias.map((dia) => {
          const ativo = dia.dia === diaAtivo;
          return (
            <button
              key={dia.dia}
              type="button"
              role="tab"
              id={`aba-${slug(dia.dia)}`}
              aria-selected={ativo}
              aria-controls={`painel-${slug(dia.dia)}`}
              onClick={() => setDiaAtivo(dia.dia)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors sm:text-sm ${
                ativo
                  ? "bg-plum-500 text-white"
                  : "bg-brand-50 text-brand-600 hover:bg-plum-50 hover:text-plum-600"
              }`}
            >
              {dia.dia} · {dia.data}
            </button>
          );
        })}
      </div>

      {dias.map((dia) => {
        const salas = salasDoDia(dia);
        const titulo = `${dia.dia} · ${dia.data} de ${ano} · ${
          salas.length > 1 ? `${salas.length} salas simultâneas` : salas[0]
        }`;
        return (
          <section
            key={dia.dia}
            id={`painel-${slug(dia.dia)}`}
            role="tabpanel"
            aria-labelledby={`aba-${slug(dia.dia)}`}
            hidden={dia.dia !== diaAtivo}
          >
            <h2 className="mb-4 text-center text-sm font-bold uppercase tracking-wide text-plum-600 sm:text-base">
              {titulo}
            </h2>
            <Tabela dia={dia} salas={salas} titulo={titulo} />
            <Lista dia={dia} salas={salas} />
          </section>
        );
      })}
    </div>
  );
}
