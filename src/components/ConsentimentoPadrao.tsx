import { scriptConsentimentoPadrao } from "@/lib/consentimento";

/**
 * Primeira coisa que roda em toda página do site: o Consent Mode v2 declarado
 * como NEGADO, antes de existir qualquer medição.
 *
 * É um `<script>` cru, não `next/script`: precisa executar na ordem do
 * documento, antes de tudo que o Next carrega depois. Ele não busca nada na
 * rede — só prepara a fila do gtag e, para quem já aceitou antes, empurra a
 * liberação para que a primeira medição da visita já saia consentida.
 */
export default function ConsentimentoPadrao() {
  return (
    <script
      id="consentimento-padrao"
      dangerouslySetInnerHTML={{ __html: scriptConsentimentoPadrao() }}
    />
  );
}
