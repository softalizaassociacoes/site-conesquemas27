"use client";

import Script from "next/script";
import { GA_ID } from "@/lib/consentimento";
import { useConsentimento } from "@/components/useConsentimento";
import EventosAnalytics from "@/components/EventosAnalytics";

/**
 * Google Analytics 4, atrás do consentimento.
 *
 * O gtag.js só é baixado depois do "sim" — não basta declarar o Consent Mode
 * e deixar a biblioteca carregar, porque ela ainda assim conversa com o
 * Google. Antes do aceite, nenhuma requisição sai daqui.
 *
 * Quem já aceitou numa visita anterior cai direto neste caminho: o script de
 * ConsentimentoPadrao já leu a escolha e liberou `analytics_storage` na fila,
 * então o primeiro hit da visita sai com o consentimento certo (gcs=G101).
 *
 * `ad_storage`, `ad_user_data` e `ad_personalization` nunca são concedidos:
 * o site não anuncia pelo Google, e por isso os hits saem com npa=1.
 */
export default function MedicaoGoogle() {
  const consentimento = useConsentimento();

  if (!GA_ID || consentimento !== "aceito") return null;

  return (
    <>
      <Script
        id="ga-carregador"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {/* `gtag` aqui é a função declarada em ConsentimentoPadrao; chamar antes
          de a biblioteca chegar é seguro, a fila é reproduzida no carregamento. */}
      <Script id="ga-config" strategy="afterInteractive">
        {`gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
      <EventosAnalytics />
    </>
  );
}
