"use client";

import { useState } from "react";
import { limparConsentimento, negarAnalytics } from "@/lib/consentimento";
import { useConsentimento } from "@/components/useConsentimento";

/**
 * Permite voltar atrás, em /privacidade. Sem isto, quem clicou uma vez ficaria
 * preso à escolha para sempre — e a LGPD exige que a pessoa possa revogar o
 * consentimento com a mesma facilidade com que o deu.
 *
 * Ao rever, a escolha é apagada e a medição é negada na hora. A página recarrega
 * para que nenhum script já carregado continue de pé na mesma visita.
 */
export default function EscolhaCookies() {
  const atual = useConsentimento();
  const [limpando, setLimpando] = useState(false);

  const rever = () => {
    setLimpando(true);
    negarAnalytics();
    limparConsentimento();
    location.reload();
  };

  const texto =
    atual === "aceito"
      ? "Neste navegador, você aceitou os cookies de medição."
      : atual === "recusado"
        ? "Neste navegador, você recusou os cookies de medição. Nada está sendo medido."
        : "Neste navegador, você ainda não escolheu. Até escolher, nada é medido.";

  return (
    <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-brand-100 bg-sand/40 px-5 py-4">
      <p className="flex-1 text-sm leading-relaxed text-brand-700">{texto}</p>
      {atual !== null && (
        <button
          type="button"
          onClick={rever}
          disabled={limpando}
          className="whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-plum-600 ring-1 ring-plum-200 transition hover:bg-plum-50 disabled:opacity-60"
        >
          {limpando ? "Limpando..." : "Rever minha escolha"}
        </button>
      )}
    </div>
  );
}
