"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string };

const INTERVALO = 5000;

export default function Carrossel({ slides }: { slides: Slide[] }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = slides.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const ir = useCallback(
    (i: number) => setAtual(((i % total) + total) % total),
    [total],
  );

  useEffect(() => {
    if (pausado || total < 2) return;
    timer.current = setInterval(() => setAtual((v) => (v + 1) % total), INTERVALO);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [pausado, total]);

  if (!total) return null;

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-brand-900/10 ring-1 ring-brand-100"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      aria-roledescription="carrossel"
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${atual * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="w-full shrink-0"
            aria-hidden={i !== atual}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={1058}
              height={389}
              priority={i === 0}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => ir(atual - 1)}
            aria-label="Slide anterior"
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand-700 shadow transition hover:bg-white sm:left-3 sm:h-10 sm:w-10"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 6 9 12l6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => ir(atual + 1)}
            aria-label="Próximo slide"
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand-700 shadow transition hover:bg-white sm:right-3 sm:h-10 sm:w-10"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="m9 6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5 sm:bottom-3.5">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => ir(i)}
                aria-label={`Ir para o slide ${i + 1}`}
                aria-current={i === atual}
                className={`h-1.5 rounded-full transition-all ${
                  i === atual
                    ? "w-6 bg-plum-500"
                    : "w-1.5 bg-brand-300 hover:bg-brand-400"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
