import "server-only";

import { evento } from "@/data/evento";

/**
 * Envio do código de acesso, pelo mesmo SendGrid dos formulários do site.
 *
 * Lança quando falha, de propósito: diferente do aviso de um formulário, aqui
 * o e-mail É o recurso pedido. Dizer "o código chega em instantes" quando ele
 * não saiu é mentir para quem está tentando entrar.
 */
export function sendgridConfigurado(): boolean {
  return Boolean(process.env.SENDGRID_API_KEY && process.env.SENDGRID_EMAIL);
}

export async function enviarCodigo(destino: string, codigo: string) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const remetente = process.env.SENDGRID_EMAIL;
  if (!apiKey || !remetente) {
    throw new Error("SENDGRID_API_KEY ou SENDGRID_EMAIL ausente.");
  }

  const texto = [
    `Seu código de acesso ao painel do ${evento.nome}:`,
    "",
    `    ${codigo}`,
    "",
    "Ele vale por 15 minutos e só pode ser usado uma vez.",
    "Se não foi você que pediu, ignore esta mensagem: nada muda sem o código.",
  ].join("\n");

  const r = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: destino }] }],
      from: { email: remetente, name: `Painel ${evento.nome}` },
      subject: `Código de acesso ao painel — ${evento.nome}`,
      content: [{ type: "text/plain", value: texto }],
    }),
  });
  if (!r.ok) {
    throw new Error(`SendGrid ${r.status}: ${await r.text()}`);
  }
}
