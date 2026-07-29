"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navegacao } from "@/data/navegacao";
import { evento } from "@/data/evento";

export default function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const [submenuAberto, setSubmenuAberto] = useState<string | null>(null);

  // Fecha o menu ao navegar. Ajustar estado durante a renderização é o padrão
  // recomendado pelo React para reagir a uma mudança de prop/rota.
  const [rotaAnterior, setRotaAnterior] = useState(pathname);
  if (rotaAnterior !== pathname) {
    setRotaAnterior(pathname);
    setAberto(false);
    setSubmenuAberto(null);
  }

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  const ativo = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* Barra de contato */}
      <div className="hidden bg-brand-800 text-white lg:block">
        <div className="container-page flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <a
              href={evento.redes.instagram}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-blush"
            >
              Instagram
            </a>
            <a
              href={`https://wa.me/${evento.contato.whatsapp[0].numero}`}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-blush"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${evento.contato.email}`}
              className="transition hover:text-blush"
            >
              {evento.contato.email}
            </a>
          </div>
          <a
            href={evento.areaParticipanteUrl}
            target="_blank"
            rel="noreferrer"
            className="font-semibold tracking-wide transition hover:text-blush"
          >
            Área do Participante →
          </a>
        </div>
      </div>

      {/* Navegação */}
      <div className="border-b border-brand-100 bg-white/95 backdrop-blur">
        <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/images/marca/simbolo-conesquemas.png"
              alt=""
              width={48}
              height={48}
              className="h-11 w-auto"
              priority
            />
            <span className="sr-only">{evento.nomeCompleto}</span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-lg font-semibold text-brand-800">
                ConEsquemas
              </span>
              <span className="block text-[0.68rem] font-semibold uppercase tracking-widest text-plum-500">
                {evento.ano}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Principal">
            {navegacao.map((item) => (
              <div key={item.rotulo} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition ${
                    ativo(item.href)
                      ? "bg-plum-50 text-plum-600"
                      : "text-brand-700 hover:bg-brand-50 hover:text-plum-600"
                  }`}
                >
                  {item.rotulo}
                  {item.filhos && (
                    <svg
                      className="h-3 w-3 transition group-hover:rotate-180"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 4.5 6 7.5 9 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Link>

                {item.filhos && (
                  <div className="invisible absolute left-0 top-full w-72 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-xl shadow-brand-900/10">
                      {item.filhos.map((filho) => (
                        <Link
                          key={filho.href}
                          href={filho.href}
                          className="block border-b border-brand-50 px-4 py-3 transition last:border-0 hover:bg-plum-50"
                        >
                          <span className="block text-sm font-semibold text-brand-800">
                            {filho.rotulo}
                          </span>
                          {filho.descricao && (
                            <span className="mt-0.5 block text-xs leading-snug text-brand-500">
                              {filho.descricao}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={evento.inscricaoUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-plum-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-plum-600 sm:inline-block"
            >
              Inscreva-se
            </a>
            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              className="rounded-full p-2.5 text-brand-700 transition hover:bg-brand-50 xl:hidden"
              aria-expanded={aberto}
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {aberto ? (
                  <path
                    d="m6 6 12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {aberto && (
        <div className="fixed inset-x-0 bottom-0 top-18 overflow-y-auto bg-white xl:hidden">
          <nav className="container-page py-6" aria-label="Principal (mobile)">
            <ul className="space-y-1">
              {navegacao.map((item) => (
                <li key={item.rotulo} className="border-b border-brand-50">
                  {item.filhos ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setSubmenuAberto((v) =>
                            v === item.rotulo ? null : item.rotulo,
                          )
                        }
                        className="flex w-full items-center justify-between py-3.5 text-left text-base font-medium text-brand-800"
                        aria-expanded={submenuAberto === item.rotulo}
                      >
                        {item.rotulo}
                        <svg
                          className={`h-4 w-4 transition ${
                            submenuAberto === item.rotulo ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 4.5 6 7.5 9 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {submenuAberto === item.rotulo && (
                        <ul className="pb-3 pl-4">
                          {item.filhos.map((filho) => (
                            <li key={filho.href}>
                              <Link
                                href={filho.href}
                                className="block py-2.5 text-sm text-brand-600"
                              >
                                {filho.rotulo}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-3.5 text-base font-medium text-brand-800"
                    >
                      {item.rotulo}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3">
              <a
                href={evento.inscricaoUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-full bg-plum-500 px-6 py-3.5 text-center font-semibold text-white"
              >
                Inscreva-se
              </a>
              <a
                href={evento.areaParticipanteUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-full border border-brand-200 px-6 py-3.5 text-center font-semibold text-brand-700"
              >
                Área do Participante
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
