"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Seções do painel. "Contas" só aparece para administrador — e a rota confere
 * o papel de novo no servidor, porque esconder o link não é controle de acesso.
 */
export default function MenuPainel({ ehAdmin }: { ehAdmin: boolean }) {
  const caminho = usePathname();

  const itens = [
    { href: "/admin/acessos", rotulo: "Acessos" },
    ...(ehAdmin ? [{ href: "/admin/contas", rotulo: "Contas" }] : []),
  ];

  return (
    <nav aria-label="Seções do painel" className="bg-brand-600">
      <ul className="container-page flex gap-1 overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {itens.map((i) => {
          const ativo = caminho === i.href || caminho?.startsWith(`${i.href}/`);
          return (
            <li key={i.href}>
              <Link
                href={i.href}
                aria-current={ativo ? "page" : undefined}
                className={`inline-block whitespace-nowrap border-b-4 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  ativo
                    ? "border-blush text-white"
                    : "border-transparent text-brand-100 hover:text-white"
                }`}
              >
                {i.rotulo}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
