import type { ReactNode } from "react";

/**
 * Peças do painel, nas mesmas cores, cantos e espaçamentos do site.
 *
 * O painel não é o site — não tem cabeçalho, rodapé nem medição —, mas tem de
 * PARECER parte dele, não um componente de biblioteca colado por cima.
 */

export function CartaoPainel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-brand-100 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Recado de tela: toda falha vira uma frase que diz O QUE FAZER, nunca uma
 * tela branca nem um "erro inesperado".
 */
export function Recado({
  titulo,
  children,
  tom = "alerta",
}: {
  titulo: string;
  children: ReactNode;
  tom?: "alerta" | "neutro" | "bom";
}) {
  const cores = {
    alerta: "border-plum-200 bg-plum-50/70",
    neutro: "border-brand-100 bg-sand/50",
    bom: "border-brand-100 bg-brand-50/70",
  };
  return (
    <div className={`rounded-2xl border p-5 sm:p-6 ${cores[tom]}`}>
      <h2 className="text-base font-semibold text-brand-800">{titulo}</h2>
      <div className="mt-2 text-sm leading-relaxed text-brand-700">
        {children}
      </div>
    </div>
  );
}

export function Rotulo({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum-500">
      {children}
    </p>
  );
}

/** Tabela que rola sozinha em tela estreita, em vez de estourar a largura. */
export function RolagemHorizontal({ children }: { children: ReactNode }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">{children}</div>
  );
}

export const CLASSE_CAMPO =
  "w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-800 outline-none transition placeholder:text-brand-300 focus:border-plum-400 focus:ring-2 focus:ring-plum-200";

export const CLASSE_BOTAO =
  "inline-flex items-center justify-center gap-2 rounded-full bg-plum-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-plum-500/25 transition hover:bg-plum-600 disabled:opacity-60";

export const CLASSE_BOTAO_SECUNDARIO =
  "inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-plum-600 ring-1 ring-plum-200 transition hover:bg-plum-50 disabled:opacity-60";
