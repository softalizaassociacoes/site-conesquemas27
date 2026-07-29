"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Evento de conversão "Purchase" do Meta Pixel.
 * Guia ConEsquemas, p. 4, item 2: disparado somente quando a página de
 * obrigado carrega, após uma compra confirmada.
 *
 * URL a informar para a equipe de tráfego: https://conesquemas.com.br/obrigado
 */
export default function PurchaseEvent() {
  const disparado = useRef(false);

  useEffect(() => {
    if (disparado.current) return;
    disparado.current = true;

    // O script-base do pixel carrega com strategy "afterInteractive";
    // tentamos até ele estar disponível.
    let tentativas = 0;
    const id = setInterval(() => {
      if (window.fbq) {
        window.fbq("track", "Purchase", { currency: "BRL" });
        clearInterval(id);
      } else if (++tentativas > 40) {
        clearInterval(id);
      }
    }, 250);

    return () => clearInterval(id);
  }, []);

  return null;
}
