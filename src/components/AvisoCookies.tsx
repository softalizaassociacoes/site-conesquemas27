"use client";

import Link from "next/link";
import { useState } from "react";
import {
  concederAnalytics,
  evento,
  gravarConsentimento,
  negarAnalytics,
} from "@/lib/consentimento";
import { useConsentimento } from "@/components/useConsentimento";

/**
 * Aviso de cookies no desenho do próprio site — sem biblioteca de terceiros,
 * que acabaria sendo mais um script de fora medindo antes do aceite.
 *
 * Só aparece para quem ainda não escolheu. A escolha fica no navegador da
 * pessoa e vale nas visitas seguintes; dá para rever em /privacidade.
 *
 * Fica em posição fixa: não empurra conteúdo nem entra na conta de layout
 * shift. No servidor não é renderizado, para a hidratação não divergir.
 */
export default function AvisoCookies() {
  const escolha = useConsentimento();
  const [fechado, setFechado] = useState(false);

  if (escolha !== null || fechado) return null;

  const aceitar = () => {
    gravarConsentimento("aceito");
    concederAnalytics();
    // um envio logo depois da liberação, para a sessão já contar consentida
    evento("consentimento_aceito");
    setFechado(true);
  };

  const recusar = () => {
    gravarConsentimento("recusado");
    negarAnalytics();
    setFechado(true);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-60 px-3 pb-3 sm:px-4 sm:pb-4"
    >
      <div className="container-page">
        <div className="flex flex-col gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-lg shadow-brand-900/10 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
          <p className="flex-1 text-sm leading-relaxed text-brand-700">
            Usamos cookies de medição para entender como o site é usado e
            melhorar a experiência de quem acompanha o {" "}
            <span className="whitespace-nowrap">III ConEsquemas</span>. Você
            escolhe: sem o seu aceite, nada é medido. Detalhes na{" "}
            <Link
              href="/privacidade"
              className="font-semibold text-plum-600 underline underline-offset-4"
            >
              política de privacidade
            </Link>
            .
          </p>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={aceitar}
              className="whitespace-nowrap rounded-full bg-plum-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-plum-500/25 transition hover:bg-plum-600"
            >
              Aceitar
            </button>
            <button
              type="button"
              onClick={recusar}
              className="whitespace-nowrap rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-plum-600 ring-1 ring-plum-200 transition hover:bg-plum-50"
            >
              Recusar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
