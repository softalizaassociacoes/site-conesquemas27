import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

/**
 * Captura de leads (Guia ConEsquemas, p. 35).
 *
 * Persistência: por padrão grava em NDJSON no disco do servidor
 * (data/leads.ndjson). Para integrar com CRM/e-mail marketing, basta
 * substituir `registrar()` pela chamada da API desejada.
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

async function registrar(lead: Lead & { recebidoEm: string; origem: string }) {
  await mkdir(path.dirname(ARQUIVO), { recursive: true });
  await appendFile(ARQUIVO, JSON.stringify(lead) + "\n", "utf8");
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
    return NextResponse.json(
      { erro: "Não foi possível salvar seu contato. Tente novamente." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
