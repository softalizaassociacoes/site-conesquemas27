"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Galeria({
  fotos,
  legenda,
}: {
  fotos: string[];
  legenda: string;
}) {
  const [aberta, setAberta] = useState<number | null>(null);

  const navegar = useCallback(
    (passo: number) =>
      setAberta((i) =>
        i === null ? i : (i + passo + fotos.length) % fotos.length,
      ),
    [fotos.length],
  );

  useEffect(() => {
    if (aberta === null) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberta(null);
      if (e.key === "ArrowRight") navegar(1);
      if (e.key === "ArrowLeft") navegar(-1);
    };
    window.addEventListener("keydown", tecla);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", tecla);
      document.body.style.overflow = "";
    };
  }, [aberta, navegar]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {fotos.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setAberta(i)}
              className="group block w-full overflow-hidden rounded-xl bg-brand-100"
              aria-label={`Abrir foto ${i + 1} de ${fotos.length}`}
            >
              <Image
                src={src}
                alt={`${legenda} — foto ${i + 1}`}
                width={600}
                height={400}
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="aspect-4/3 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {aberta !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${legenda} — foto ${aberta + 1} de ${fotos.length}`}
          className="fixed inset-0 z-60 flex items-center justify-center bg-brand-900/95 p-4"
          onClick={() => setAberta(null)}
        >
          <button
            type="button"
            onClick={() => setAberta(null)}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navegar(-1);
            }}
            aria-label="Foto anterior"
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 6 9 12l6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <Image
            src={fotos[aberta]}
            alt={`${legenda} — foto ${aberta + 1}`}
            width={1600}
            height={1067}
            className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
            priority
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navegar(1);
            }}
            aria-label="Próxima foto"
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="m9 6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <p className="absolute bottom-5 text-sm text-white/70">
            {aberta + 1} / {fotos.length}
          </p>
        </div>
      )}
    </>
  );
}
