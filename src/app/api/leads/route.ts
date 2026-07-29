import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

/**
 * Captura de leads (Guia ConEsquemas, p. 35).
 *
 * Destino do lead, nesta ordem:
 *
 * 1. `LEADS_WEBHOOK_URL`, se definida — encaminha o lead em JSON para um
 *    CRM, Zapier/Make, planilha ou e-mail marketing. É a única opção que
 *    funciona em hospedagem serverless (Vercel), onde o disco é somente
 *    leitura fora de /tmp.
 * 2. `data/leads.ndjson` no disco — usado em servidor próprio (PM2/VPS).
 *
 * Sem nenhuma das duas, o endpoint responde 503 e registra o lead no log,
 * em vez de aceitar o envio silenciosamente e perder o contato.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ARQUIVO = path.join(process.cwd(), "data", "leads.ndjson");
const LIMITE_CAMPO = 200;

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

type LeadRegistrado = Lead & { recebidoEm: string; origem: string };

async function enviarParaWebhook(url: string, lead: LeadRegistrado) {
  const resposta = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(8000),
  });
  if (!resposta.ok) {
    throw new Error(`Webhook respondeu ${resposta.status}`);
  }
}

async function gravarEmDisco(lead: LeadRegistrado) {
  await mkdir(path.dirname(ARQUIVO), { recursive: true });
  await appendFile(ARQUIVO, JSON.stringify(lead) + "\n", "utf8");
}

/**
 * Em serverless o bundle roda a partir de um diretório sem escrita.
 * Na Vercel o mkdir falha com ENOENT (e não EROFS), por isso a checagem
 * de ambiente vem antes: é determinística, não depende do errno.
 */
const SEM_DISCO_GRAVAVEL = Boolean(process.env.VERCEL);

/** Códigos que, num append+mkdir, significam "não dá para escrever aqui". */
function naoConsegueEscrever(erro: unknown) {
  const codigo = (erro as NodeJS.ErrnoException)?.code;
  return (
    codigo === "EROFS" ||
    codigo === "EACCES" ||
    codigo === "EPERM" ||
    codigo === "ENOENT"
  );
}

async function registrar(lead: LeadRegistrado) {
  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    await enviarParaWebhook(webhook, lead);
    return;
  }

  if (SEM_DISCO_GRAVAVEL) {
    console.error(
      "[leads] Ambiente serverless sem LEADS_WEBHOOK_URL configurada. " +
        "Configure a variável de ambiente para não perder contatos. Lead:",
      JSON.stringify(lead),
    );
    throw new SemDestinoError();
  }

  try {
    await gravarEmDisco(lead);
  } catch (erro) {
    if (naoConsegueEscrever(erro)) {
      // Não dá para gravar e não há webhook: o lead se perderia em silêncio.
      console.error(
        "[leads] Disco somente leitura e LEADS_WEBHOOK_URL não configurada. " +
          "Configure a variável de ambiente para não perder contatos. Lead:",
        JSON.stringify(lead),
      );
      throw new SemDestinoError();
    }
    throw erro;
  }
}

class SemDestinoError extends Error {
  constructor() {
    super("Nenhum destino configurado para os leads.");
    this.name = "SemDestinoError";
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
    await registrar({
      ...resultado.lead,
      recebidoEm: new Date().toISOString(),
      origem: "site-conesquemas-2027",
    });
  } catch (erro) {
    console.error("Falha ao registrar lead:", erro);
    const semDestino = erro instanceof SemDestinoError;
    return NextResponse.json(
      {
        erro: semDestino
          ? "O cadastro está temporariamente indisponível. Fale com a gente pelo WhatsApp."
          : "Não foi possível salvar seu contato. Tente novamente.",
      },
      { status: semDestino ? 503 : 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
