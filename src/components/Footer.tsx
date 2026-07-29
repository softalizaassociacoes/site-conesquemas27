import Image from "next/image";
import Link from "next/link";
import { evento } from "@/data/evento";
import { navegacao } from "@/data/navegacao";
import { parceiros } from "@/data/institucional";

export default function Footer() {
  return (
    <footer className="mt-24">
      {/* Parceiros */}
      <div className="border-t border-brand-100 bg-sand/40 py-14">
        <div className="container-page space-y-10">
          {parceiros
            .filter((grupo) => grupo.marcas.length > 0)
            .map((grupo) => (
              <div key={grupo.titulo}>
                <h2 className="mb-6 text-center text-xs font-bold uppercase tracking-[0.22em] text-plum-500">
                  {grupo.titulo}
                </h2>
                <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
                  {grupo.marcas.map((marca) => (
                    <li key={marca.nome}>
                      {marca.logo ? (
                        <Image
                          src={marca.logo}
                          alt={marca.nome}
                          width={200}
                          height={80}
                          className="h-12 w-auto object-contain opacity-80 transition hover:opacity-100 sm:h-14"
                        />
                      ) : (
                        <span className="font-display text-xl font-semibold text-brand-700">
                          {marca.nome}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>

      {/* Rodapé principal */}
      <div className="bg-brand-800 text-brand-100">
        <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            {/* Ver nota em Header.tsx sobre a assinatura em texto. */}
            <p className="font-display text-2xl font-semibold tracking-[0.16em] text-white">
              CONESQUEMAS
            </p>
            <p className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-blush">
              {evento.ano}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              {evento.nomeCompleto}. {evento.datas.rotulo} — {evento.local.nome},{" "}
              {evento.local.cidade}/{evento.local.uf}.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href={evento.redes.instagram} label="Instagram">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4Zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm8.5-11.3a1.6 1.6 0 1 1-3.1 0 1.6 1.6 0 0 1 3.1 0Z" />
              </SocialLink>
              <SocialLink href={evento.redes.facebook} label="Facebook">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
              </SocialLink>
              <SocialLink href={evento.redes.youtube} label="YouTube">
                <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.1V8.9l5.2 3.1-5.2 3.1Z" />
              </SocialLink>
            </div>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blush">
              Navegação
            </h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-1">
              {navegacao.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    {...(item.externo
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="transition hover:text-blush"
                  >
                    {item.rotulo}
                    {item.externo && <span aria-hidden="true"> ↗</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blush">
              Contato
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${evento.contato.email}`}
                  className="transition hover:text-blush"
                >
                  {evento.contato.email}
                </a>
              </li>
              {evento.contato.whatsapp.map((w) => (
                <li key={w.numero}>
                  <a
                    href={`https://wa.me/${w.numero}`}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-blush"
                  >
                    {w.rotulo}
                  </a>
                </li>
              ))}
              <li className="pt-2 leading-relaxed text-brand-200">
                {evento.local.nome}
                <br />
                {evento.local.endereco}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-brand-200 sm:flex-row">
            <p>
              Copyright ©{evento.ano} — Realização {evento.realizacao}. Todos os
              direitos reservados.
            </p>
            <p>
              Desenvolvido por{" "}
              <a
                href="https://softaliza.com.br"
                target="_blank"
                rel="noreferrer"
                className="font-semibold transition hover:text-blush"
              >
                Softaliza
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-plum-500"
    >
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
