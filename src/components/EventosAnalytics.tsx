"use client";

import { useEffect } from "react";
import { evento } from "@/lib/consentimento";

/**
 * Eventos próprios do site, num ouvinte único de clique em vez de instrumentar
 * link por link: nenhum componente precisa saber que a medição existe.
 *
 * Os eventos registram QUE algo aconteceu e PARA ONDE, nunca o que alguém
 * digitou. Nenhum dado de formulário passa por aqui.
 *
 * Só é montado depois do aceite, junto com o gtag — sem consentimento este
 * componente nem chega a existir.
 */
export default function EventosAnalytics() {
  useEffect(() => {
    const aoClicar = (e: MouseEvent) => {
      const alvo = (e.target as HTMLElement | null)?.closest?.("a");
      if (!alvo) return;
      const href = alvo.getAttribute("href");
      if (!href) return;

      const pagina = window.location.pathname;

      if (
        href.startsWith("/inscricoes") ||
        /eventos\.softaliza\.com\.br\/[^/]*conesquemas/i.test(href)
      ) {
        evento("clique_inscricao", { destino: href, pagina });
        return;
      }
      if (/eventos\.softaliza\.com\.br\/login/i.test(href)) {
        evento("clique_area_restrita", { pagina });
        return;
      }
      if (href.startsWith("https://wa.me/")) {
        evento("clique_whatsapp", { pagina });
        return;
      }
      if (href.startsWith("mailto:")) {
        evento("clique_email", { pagina });
      }
    };

    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
  }, []);

  return null;
}
