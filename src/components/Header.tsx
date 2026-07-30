"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navegacao } from "@/data/navegacao";
import { evento } from "@/data/evento";

export default function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const [submenuAberto, setSubmenuAberto] = useState<string | null>(null);
  const [rolou, setRolou] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const timerFechar = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Abre/fecha os submenus com uma folga ao sair: sem ela, qualquer desvio do
   * mouse no caminho até o painel fecha o menu antes de dar tempo de clicar.
   */
  const abrirDropdown = (rotulo: string) => {
    if (timerFechar.current) clearTimeout(timerFechar.current);
    setDropdown(rotulo);
  };

  const fecharDropdownComFolga = () => {
    if (timerFechar.current) clearTimeout(timerFechar.current);
    timerFechar.current = setTimeout(() => setDropdown(null), 280);
  };

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdown(null);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => {
      window.removeEventListener("keydown", aoTeclar);
      if (timerFechar.current) clearTimeout(timerFechar.current);
    };
  }, []);

  // Fecha o menu ao navegar. Ajustar estado durante a renderização é o padrão
  // recomendado pelo React para reagir a uma mudança de prop/rota.
  const [rotaAnterior, setRotaAnterior] = useState(pathname);
  if (rotaAnterior !== pathname) {
    setRotaAnterior(pathname);
    setAberto(false);
    setSubmenuAberto(null);
    setDropdown(null);
  }

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  /**
   * Publica a altura real do cabeçalho em --altura-cabecalho. Ela muda com a
   * largura da tela (a barra de contato só aparece a partir de lg), então
   * qualquer medida derivada precisa acompanhar em vez de assumir um valor.
   */
  const elementoHeader = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = elementoHeader.current;
    if (!el) return;
    const observador = new ResizeObserver(([entrada]) => {
      document.documentElement.style.setProperty(
        "--altura-cabecalho",
        `${Math.round(entrada.contentRect.height)}px`,
      );
    });
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  const ativo = (href: string) =>
    href.startsWith("http")
      ? false
      : href === "/"
        ? pathname === "/"
        : pathname.startsWith(href);

  /** Link interno usa <Link>; externo abre em nova aba. */
  const propsLink = (href: string, externo?: boolean) =>
    externo
      ? { href, target: "_blank" as const, rel: "noreferrer" }
      : { href };

  /**
   * Na home o cabeçalho fica integrado ao banner: transparente, por cima da
   * faixa roxa. Ao rolar (ou com o menu mobile aberto) vira sólido, para
   * manter o contraste sobre o conteúdo branco.
   */
  const sobreposto = pathname === "/" && !rolou && !aberto;

  return (
    <header
      ref={elementoHeader}
      className={`${
        pathname === "/" ? "fixed" : "sticky"
      } inset-x-0 top-0 z-50 transition-colors duration-300 ${
        sobreposto
          ? "bg-transparent"
          : "border-b border-brand-100 bg-white/95 shadow-sm backdrop-blur"
      }`}
    >
      {/* Barra de contato */}
      <div
        className={`hidden transition-colors lg:block ${
          sobreposto ? "text-white/80" : "bg-brand-800 text-white"
        }`}
      >
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
        </div>
      </div>

      {/* Navegação */}
      <div className="container-page flex items-center justify-between gap-4 py-3 lg:items-start lg:py-4">
        {/* Logo oficial. A versão branca é a mesma arte recolorida, para o
            cabeçalho sobreposto à faixa roxa do banner. */}
        <Link href="/" className="flex shrink-0 flex-col">
          <span className="sr-only">{evento.nomeCompleto}</span>
          <Image
            src={
              sobreposto
                ? "/images/marca/logo-conesquemas-branco.png"
                : "/images/marca/logo-conesquemas.png"
            }
            alt=""
            width={900}
            height={76}
            priority
            className="h-4 w-auto sm:h-5"
          />
          <span
            className={`mt-1.5 text-[0.7rem] font-bold uppercase tracking-[0.3em] transition-colors ${
              sobreposto ? "text-blush" : "text-plum-500"
            }`}
            aria-hidden="true"
          >
            {evento.ano}
          </span>
        </Link>

        {/* Menu em duas linhas, centralizado, como no layout aprovado */}
        <nav
          className="hidden flex-1 justify-center xl:flex"
          aria-label="Principal"
        >
          <ul className="flex max-w-2xl flex-wrap justify-center gap-x-1 gap-y-1">
            {navegacao.map((item) => (
              <li
                key={item.rotulo}
                className="relative"
                onMouseEnter={() =>
                  item.filhos && abrirDropdown(item.rotulo)
                }
                onMouseLeave={() => item.filhos && fecharDropdownComFolga()}
              >
                <span
                  className={`flex items-center rounded-full transition ${
                    sobreposto
                      ? ""
                      : ativo(item.href)
                        ? "bg-plum-50"
                        : "hover:bg-brand-50"
                  }`}
                >
                  <Link
                    {...propsLink(item.href, item.externo)}
                    onFocus={() => item.filhos && abrirDropdown(item.rotulo)}
                    className={`py-1.5 pl-3 text-sm font-semibold uppercase tracking-wide transition ${
                      item.filhos ? "pr-1" : "pr-3"
                    } ${
                      sobreposto
                        ? ativo(item.href)
                          ? "text-white"
                          : "text-white/75 hover:text-white"
                        : ativo(item.href)
                          ? "text-plum-600"
                          : "text-brand-700 hover:text-plum-600"
                    }`}
                  >
                    {item.rotulo}
                  </Link>

                  {/* Botão à parte: sem ele o submenu ficaria inacessível em
                      telas de toque, onde não existe hover. */}
                  {item.filhos && (
                    <button
                      type="button"
                      onClick={() =>
                        dropdown === item.rotulo
                          ? setDropdown(null)
                          : abrirDropdown(item.rotulo)
                      }
                      aria-expanded={dropdown === item.rotulo}
                      aria-label={`Abrir submenu de ${item.rotulo}`}
                      className={`py-1.5 pr-3 pl-1 transition ${
                        sobreposto
                          ? "text-white/75 hover:text-white"
                          : "text-brand-500 hover:text-plum-600"
                      }`}
                    >
                      <svg
                        className={`h-3 w-3 transition ${
                          dropdown === item.rotulo ? "rotate-180" : ""
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
                  )}
                </span>

                {item.filhos && dropdown === item.rotulo && (
                  // pt-3 cria a ponte entre o gatilho e o painel, para o
                  // ponteiro nunca sair da área que mantém o menu aberto.
                  <div className="absolute left-1/2 top-full z-10 w-72 -translate-x-1/2 pt-3">
                    <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-xl shadow-brand-900/25">
                      {item.filhos.map((filho) => (
                        <Link
                          key={filho.href}
                          {...propsLink(filho.href, filho.externo)}
                          className="block border-b border-brand-50 px-4 py-3 transition last:border-0 hover:bg-plum-50"
                        >
                          <span className="block text-sm font-semibold text-brand-800">
                            {filho.rotulo}
                            {filho.externo && (
                              <span className="ml-1.5 text-plum-400" aria-hidden="true">
                                ↗
                              </span>
                            )}
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
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            className={`rounded-full p-2.5 transition xl:hidden ${
              sobreposto
                ? "text-white hover:bg-white/15"
                : "text-brand-700 hover:bg-brand-50"
            }`}
            aria-expanded={aberto}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
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

      {/* Menu mobile.
          Ancorado em top-full para começar exatamente onde o cabeçalho
          termina: a altura dele varia com a largura da tela, porque a barra de
          contato só aparece a partir de lg. Com um valor fixo, o painel subia
          sobre o próprio cabeçalho entre lg e xl. */}
      {aberto && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--altura-cabecalho,4.5rem))] overflow-y-auto border-t border-brand-100 bg-white shadow-lg xl:hidden">
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
                                {...propsLink(filho.href, filho.externo)}
                                className="block py-2.5 text-sm text-brand-600"
                              >
                                {filho.rotulo}
                                {filho.externo && (
                                  <span aria-hidden="true"> ↗</span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      {...propsLink(item.href, item.externo)}
                      className="block py-3.5 text-base font-medium text-brand-800"
                    >
                      {item.rotulo}
                      {item.externo && <span aria-hidden="true"> ↗</span>}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

          </nav>
        </div>
      )}
    </header>
  );
}
