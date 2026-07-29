import Link from "next/link";
import type { ReactNode } from "react";
import Margaridas from "./Margaridas";
import Onda from "./Onda";
import TextoManuscrito from "./TextoManuscrito";

/** Cabeçalho padrão das páginas internas. */
export function PageHero({
  titulo,
  descricao,
  rotulo,
}: {
  titulo: string;
  descricao?: string;
  rotulo?: string;
}) {
  // O padding inferior é generoso porque a onda ocupa a base da faixa.
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-brand-500 to-brand-600 pt-14 pb-24 text-white sm:pt-16 sm:pb-28">
      <TextoManuscrito />
      <Margaridas className="-right-24 -top-20 h-80 w-80 lg:h-[26rem] lg:w-[26rem]" />
      <div className="container-page relative">
        {rotulo && (
          <p className="mb-3 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-blush">
            <span className="h-px w-8 bg-rosa" aria-hidden="true" />
            {rotulo}
          </p>
        )}
        <h1 className="max-w-3xl text-3xl leading-tight sm:text-4xl lg:text-5xl">
          {titulo}
        </h1>
        {descricao && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {descricao}
          </p>
        )}
      </div>
      <Onda />
    </section>
  );
}

export function Section({
  children,
  className = "",
  fundo = "branco",
  id,
}: {
  children: ReactNode;
  className?: string;
  fundo?: "branco" | "areia" | "lilas";
  id?: string;
}) {
  const fundos = {
    branco: "bg-white",
    areia: "bg-sand/50",
    lilas: "bg-brand-50/60",
  };
  return (
    <section id={id} className={`${fundos[fundo]} py-16 sm:py-20 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionTitle({
  rotulo,
  titulo,
  descricao,
  centralizado = false,
}: {
  rotulo?: string;
  titulo: string;
  descricao?: string;
  centralizado?: boolean;
}) {
  return (
    <div className={`mb-10 ${centralizado ? "text-center" : ""}`}>
      {rotulo && (
        <p className={`eyebrow mb-3 ${centralizado ? "justify-center" : ""}`}>
          {rotulo}
        </p>
      )}
      <h2 className="text-2xl text-brand-800 sm:text-3xl lg:text-4xl">{titulo}</h2>
      {descricao && (
        <p
          className={`mt-4 text-base leading-relaxed text-brand-600 ${
            centralizado ? "mx-auto max-w-2xl" : "max-w-3xl"
          }`}
        >
          {descricao}
        </p>
      )}
    </div>
  );
}

export function Botao({
  href,
  children,
  variante = "primario",
  externo = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variante?: "primario" | "secundario" | "contorno-claro";
  externo?: boolean;
  className?: string;
}) {
  const estilos = {
    primario:
      "bg-plum-500 text-white hover:bg-plum-600 shadow-sm shadow-plum-500/25",
    secundario:
      "bg-white text-plum-600 ring-1 ring-plum-200 hover:bg-plum-50",
    "contorno-claro":
      "bg-white/10 text-white ring-1 ring-white/40 hover:bg-white/20",
  };
  const classe = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition ${estilos[variante]} ${className}`;

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classe}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classe}>
      {children}
    </Link>
  );
}

/** Lista com marcador em flor — motivo gráfico da identidade 2027. */
export function ListaFlor({ itens }: { itens: string[] }) {
  return (
    <ul className="space-y-3">
      {itens.map((item) => (
        <li key={item} className="flex gap-3 text-brand-700">
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rosa"
            aria-hidden="true"
          />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}

export function AvisoDados({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-plum-200 bg-plum-50/60 px-5 py-4 text-sm leading-relaxed text-plum-700">
      {children}
    </p>
  );
}
