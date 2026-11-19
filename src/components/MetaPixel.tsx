"use client";

import Script from "next/script";
import { evento as dadosEvento } from "@/data/evento";
import { useConsentimento } from "@/components/useConsentimento";

/**
 * Meta Pixel (Guia ConEsquemas, p. 4), agora atrás do consentimento.
 *
 * Até out/2026 este script subia em toda visita, antes de qualquer aceite, e
 * mandava PageView para a Meta de todo mundo. Agora nada é carregado nem
 * enviado enquanto a pessoa não aceitar: sem o "sim", este componente não
 * renderiza coisa alguma e `window.fbq` nem existe.
 *
 * A <img> de `noscript` saiu de vez. Ela media justamente quem está sem
 * JavaScript — e sem JavaScript não há como pedir nem registrar consentimento,
 * então não há base para medir essa pessoa.
 */
export default function MetaPixel() {
  const consentimento = useConsentimento();

  if (consentimento !== "aceito") return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${dadosEvento.pixelId}');
fbq('track', 'PageView');`}
    </Script>
  );
}
