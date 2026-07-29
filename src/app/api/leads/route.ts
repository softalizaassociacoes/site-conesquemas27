import { NextResponse } from "next/server";
import { evento } from "@/data/evento";

/**
 * Captura de leads (Guia ConEsquemas, p. 35).
 *
 * Cada lead é enviado por e-mail para a organização via SendGrid.
 *
 * Variáveis de ambiente:
 *   SENDGRID_API_KEY  (obrigatória) — chave de API com permissão "Mail Send"
 *   LEADS_EMAIL_DE    (opcional)    — remetente; precisa ser um Verified
 *                                     Sender no SendGrid. Padrão: e-mail
 *                                     oficial do congresso
 *   LEADS_EMAIL_PARA  (opcional)    — destinatário. Padrão: e-mail oficial
 *
 * Sem SENDGRID_API_KEY o endpoint responde 503 e registra o lead no log, em
 * vez de aceitar o envio e perder o contato em silêncio.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITE_CAMPO = 200;
const SENDGRID_URL = "https://api.sendgrid.com/v3/mail/send";

type Lead = {
  nome: string;
  email: string;
  telefone: string;
  categoria: string;
};

function texto(valor: unknown) {
  return typeof valor === "string" ? valor.trim().slice(0, LIMITE_CAMPO) : "";
}

function validar(corpo: Record<string, unknown>) {
  const lead: Lead = {
    nome: texto(corpo.nome),
    email: texto(corpo.email).toLowerCase(),
    telefone: texto(corpo.telefone),
    categoria: texto(corpo.categoria),
  };

  if (lead.nome.length < 3) return { erro: "Informe seu nome completo." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email))
    return { erro: "Informe um e-mail válido." };
  if (lead.telefone.replace(/\D/g, "").length < 10)
    return { erro: "Informe um WhatsApp válido com DDD." };
  if (!lead.categoria) return { erro: "Selecione uma categoria." };

  return { lead };
}

/** Escapa o que vai para o corpo HTML do e-mail. */
function esc(valor: string) {
  return valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function montarEmail(lead: Lead, recebidoEm: string) {
  const de = process.env.LEADS_EMAIL_DE ?? evento.contato.email;
  const para = process.env.LEADS_EMAIL_PARA ?? evento.contato.email;

  const linhas: [string, string][] = [
    ["Nome", lead.nome],
    ["E-mail", lead.email],
    ["WhatsApp", lead.telefone],
    ["Categoria", lead.categoria],
    ["Recebido em", new Date(recebidoEm).toLocaleString("pt-BR")],
  ];

  return {
    personalizations: [{ to: [{ email: para }] }],
    from: { email: de, name: `${evento.nome} — Site` },
    // Responder vai direto para o interessado.
    reply_to: { email: lead.email, name: lead.nome },
    subject: `Novo lead do site: ${lead.nome} (${lead.categoria})`,
    content: [
      {
        type: "text/plain",
        value: linhas.map(([r, v]) => `${r}: ${v}`).join("\n"),
      },
      {
        type: "text/html",
        value:
          `<h2>Novo contato pelo site do ${esc(evento.nome)}</h2><table cellpadding="6">` +
          linhas
            .map(
              ([r, v]) =>
                `<tr><td><strong>${esc(r)}</strong></td><td>${esc(v)}</td></tr>`,
            )
            .join("") +
          `</table>`,
      },
    ],
  };
}

class SemDestinoError extends Error {
  constructor() {
    super("SENDGRID_API_KEY não configurada.");
    this.name = "SemDestinoError";
  }
}

async function enviar(lead: Lead, recebidoEm: string) {
  const chave = process.env.SENDGRID_API_KEY;
  if (!chave) {
    console.error(
      "[leads] SENDGRID_API_KEY ausente — o contato abaixo não foi entregue:",
      JSON.stringify({ ...lead, recebidoEm }),
    );
    throw new SemDestinoError();
  }

  const resposta = await fetch(SENDGRID_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${chave}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(montarEmail(lead, recebidoEm)),
    signal: AbortSignal.timeout(10_000),
  });

  if (!resposta.ok) {
    // O corpo do erro do SendGrid ajuda a diagnosticar remetente não verificado.
    const detalhe = await resposta.text().catch(() => "");
    throw new Error(`SendGrid respondeu ${resposta.status}: ${detalhe}`);
  }
}

export async function POST(request: Request) {
  let corpo: Record<string, unknown>;
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ erro: "Requisição inválida." }, { status: 400 });
  }

  // Campo-armadilha preenchido = robô. Responde 200 para não dar pistas.
  if (texto(corpo.empresa)) {
    return NextResponse.json({ ok: true });
  }

  const resultado = validar(corpo);
  if ("erro" in resultado) {
    return NextResponse.json({ erro: resultado.erro }, { status: 400 });
  }

  try {
    await enviar(resultado.lead, new Date().toISOString());
  } catch (erro) {
    console.error("Falha ao registrar lead:", erro);
    const semDestino = erro instanceof SemDestinoError;
    return NextResponse.json(
      {
        erro: semDestino
          ? "O cadastro está temporariamente indisponível. Fale com a gente pelo WhatsApp."
          : "Não foi possível enviar seu contato. Tente novamente.",
      },
      { status: semDestino ? 503 : 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
