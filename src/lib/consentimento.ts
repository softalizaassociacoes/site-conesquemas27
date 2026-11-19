/**
 * Consentimento de medição — a chave que liga ou desliga TODA a coleta.
 *
 * Nada mede antes do "sim": nem o Google Analytics, nem o Meta Pixel. Os dois
 * leem a mesma escolha, guardada no navegador de quem visita, e voltam a valer
 * sozinhos na visita seguinte.
 *
 * Este módulo é propositalmente sem React: ele é lido tanto pelo componente de
 * servidor que escreve o script inicial quanto pelos componentes de cliente.
 */

/** Onde a escolha fica, só no navegador da pessoa. Nunca no servidor. */
export const CHAVE_CONSENTIMENTO = "conesquemas-consentimento";

/** Evento interno: avisa os componentes assim que a escolha muda. */
const EVENTO_MUDANCA = "conesquemas:consentimento";

export type Consentimento = "aceito" | "recusado";

/** ID de medição do Google. Sem a variável, nada do Google é carregado. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export function lerConsentimento(): Consentimento | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(CHAVE_CONSENTIMENTO);
    return v === "aceito" || v === "recusado" ? v : null;
  } catch {
    // janela anônima ou armazenamento bloqueado: trata como "ainda não escolheu"
    return null;
  }
}

export function gravarConsentimento(v: Consentimento) {
  try {
    localStorage.setItem(CHAVE_CONSENTIMENTO, v);
  } catch {
    // sem persistência o aviso reaparece na próxima visita, o que é aceitável
  }
  avisar();
}

export function limparConsentimento() {
  try {
    localStorage.removeItem(CHAVE_CONSENTIMENTO);
  } catch {
    // não havia escolha guardada
  }
  avisar();
}

function avisar() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVENTO_MUDANCA));
  }
}

/** Assinatura usada pelo useSyncExternalStore dos componentes. */
export function assinarConsentimento(aoMudar: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENTO_MUDANCA, aoMudar);
  // outra aba pode ter mudado a escolha neste mesmo navegador
  window.addEventListener("storage", aoMudar);
  return () => {
    window.removeEventListener(EVENTO_MUDANCA, aoMudar);
    window.removeEventListener("storage", aoMudar);
  };
}

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

function gtag(): Gtag | null {
  if (typeof window === "undefined") return null;
  return typeof window.gtag === "function" ? window.gtag : null;
}

/**
 * Libera só a análise. Publicidade e personalização continuam negadas sempre:
 * este site não anuncia pelo Google, e o que não é usado não se concede.
 */
export function concederAnalytics() {
  gtag()?.("consent", "update", { analytics_storage: "granted" });
}

export function negarAnalytics() {
  gtag()?.("consent", "update", { analytics_storage: "denied" });
}

/** Evento de uso. Silencioso quando não há consentimento ou GA. */
export function evento(nome: string, parametros?: Record<string, unknown>) {
  gtag()?.("event", nome, parametros);
}

/**
 * Script que roda ANTES de qualquer medição, em toda página do site.
 *
 * Ele não carrega nada de fora: só declara o estado de consentimento como
 * negado e, para quem já aceitou antes, empurra a liberação na fila — assim a
 * primeira medição da visita já sai consentida, sem pedir o clique de novo.
 *
 * O `gtag` TEM de ser esta function: o Consent Mode só honra o objeto
 * `arguments` dela. Um `dataLayer.push([...])` com array comum é ignorado em
 * silêncio, e o consentimento nunca chega ao Google.
 */
export function scriptConsentimentoPadrao(): string {
  return `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',personalization_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
try{if(localStorage.getItem('${CHAVE_CONSENTIMENTO}')==='aceito'){gtag('consent','update',{analytics_storage:'granted'})}}catch(e){}
`.trim();
}
