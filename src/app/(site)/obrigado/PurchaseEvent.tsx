"use client";

import { useEffect, useRef } from "react";
import { evento } from "@/lib/consentimento";
import { useConsentimento } from "@/components/useConsentimento";

/**
 * Conversão da página de agradecimento.
 *
 * Também depende do aceite: antes dele o Meta Pixel nem é carregado, e mandar
 * um "Purchase" para a Meta sem consentimento era justamente o pior caso do
 * arranjo antigo — uma compra identificável, de quem nunca disse sim.
 *
 * URL a informar para a equipe de tráfego: https://www.conesquemas.com.br/obrigado
 */
export default function PurchaseEvent() {
  const consentimento = useConsentimento();
  const disparado = useRef(false);

  useEffect(() => {
    if (consentimento !== "aceito" || disparado.current) return;
    disparado.current = true;

    // o pixel sobe com strategy "afterInteractive"; esperamos ele aparecer
    let tentativas = 0;
    const id = setInterval(() => {
      if (window.fbq) {
        window.fbq("track", "Purchase", { currency: "BRL" });
        clearInterval(id);
      } else if (++tentativas > 40) {
        clearInterval(id);
      }
    }, 250);

    // o mesmo marco no Google, sem valor nem identificação
    evento("inscricao_concluida");

    return () => clearInterval(id);
  }, [consentimento]);

  return null;
}
