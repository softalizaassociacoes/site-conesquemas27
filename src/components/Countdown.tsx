"use client";

import { useSyncExternalStore } from "react";

type Props = {
  /** Data-alvo em ISO com fuso, ex.: "2027-04-29T12:00:00-03:00". */
  alvo: string;
  /**
   * claro  — caixas brancas sobre fundo claro
   * escuro — caixas translúcidas sobre fundo roxo
   * banner — números grandes soltos, sem caixa (hero da home)
   */
  variante?: "claro" | "escuro" | "banner";
};

const UNIDADES = [
  { chave: "dias", rotulo: "Dias" },
  { chave: "horas", rotulo: "Horas" },
  { chave: "minutos", rotulo: "Minutos" },
  { chave: "segundos", rotulo: "Segundos" },
] as const;

/** Notifica o React a cada segundo. */
function assinar(aoMudar: () => void) {
  const id = setInterval(aoMudar, 1000);
  return () => clearInterval(id);
}

/** Segundo corrente — muda no máximo 1x por segundo, então é estável na render. */
function segundoAtual() {
  return Math.floor(Date.now() / 1000);
}

/** No servidor não há relógio a exibir: o contador renderiza "--". */
function semRelogio() {
  return null;
}

function restante(alvoMs: number, agoraSegundos: number) {
  const diff = Math.max(0, alvoMs - agoraSegundos * 1000);
  return {
    dias: Math.floor(diff / 86_400_000),
    horas: Math.floor(diff / 3_600_000) % 24,
    minutos: Math.floor(diff / 60_000) % 60,
    segundos: Math.floor(diff / 1000) % 60,
  };
}

export default function Countdown({ alvo, variante = "claro" }: Props) {
  const alvoMs = new Date(alvo).getTime();

  // `assinar` é definida fora do componente, logo já tem referência estável.
  const agora = useSyncExternalStore(assinar, segundoAtual, semRelogio);

  const tempo = agora === null ? null : restante(alvoMs, agora);
  const escuro = variante === "escuro";

  if (variante === "banner") {
    return (
      <ul
        className="flex justify-center gap-5 sm:gap-9 lg:justify-start"
        aria-label="Contagem regressiva"
      >
        {UNIDADES.map(({ chave, rotulo }) => (
          <li key={chave} className="text-center">
            <span className="block font-display text-4xl leading-none font-semibold tabular-nums text-white/85 sm:text-5xl lg:text-6xl">
              {tempo ? String(tempo[chave]).padStart(2, "0") : "--"}
            </span>
            <span className="mt-2 block text-xs font-medium text-white/70 sm:text-sm">
              {rotulo}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className="flex flex-wrap justify-center gap-2 sm:gap-3"
      aria-label="Contagem regressiva"
    >
      {UNIDADES.map(({ chave, rotulo }) => (
        <li
          key={chave}
          className={`min-w-16 rounded-xl px-3 py-2.5 text-center sm:min-w-20 sm:px-4 sm:py-3 ${
            escuro
              ? "bg-white/12 text-white ring-1 ring-white/20"
              : "bg-white text-brand-800 shadow-sm ring-1 ring-brand-100"
          }`}
        >
          <span className="block font-display text-2xl leading-none font-semibold tabular-nums sm:text-3xl">
            {tempo ? String(tempo[chave]).padStart(2, "0") : "--"}
          </span>
          <span
            className={`mt-1 block text-[0.6rem] font-semibold uppercase tracking-widest sm:text-[0.65rem] ${
              escuro ? "text-blush" : "text-plum-500"
            }`}
          >
            {rotulo}
          </span>
        </li>
      ))}
    </ul>
  );
}
