import "server-only";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SemBlob } from "@/lib/admin/blob";
import { COOKIE_SESSAO, lerSessao, type Sessao } from "@/lib/admin/sessao";

export const LOG = "[ADMIN-CONESQUEMAS]";

/** Sessão da requisição atual, conferida no servidor da própria rota. */
export async function sessaoAtual(): Promise<Sessao | null> {
  try {
    return await lerSessao((await cookies()).get(COOKIE_SESSAO)?.value);
  } catch {
    // ADMIN_SESSION_SECRET ausente: ninguém está autenticado
    return null;
  }
}

export const naoAutenticado = () =>
  NextResponse.json({ ok: false, erro: "Não autenticado." }, { status: 401 });

export const naoAutorizado = () =>
  NextResponse.json(
    {
      ok: false,
      erro: "Só quem tem papel de administrador pode mexer nas contas.",
    },
    { status: 403 },
  );

/**
 * Transforma uma falha de armazenamento em instrução, nunca em tela branca.
 * O detalhe técnico vai para o log da Vercel; a tela recebe o que fazer.
 */
export function falhaDeArmazenamento(e: unknown, acao: string): NextResponse {
  if (e instanceof SemBlob) {
    console.error(`${LOG} ${acao}: Vercel Blob não configurado.`);
    return NextResponse.json(
      {
        ok: false,
        erro: "O armazenamento das contas ainda não foi ligado. Falta conectar um store do Vercel Blob a este projeto e publicar de novo.",
      },
      { status: 503 },
    );
  }
  console.error(`${LOG} ${acao}:`, e);
  return NextResponse.json(
    {
      ok: false,
      erro: "Não foi possível falar com o armazenamento agora. Tente de novo em instantes.",
    },
    { status: 503 },
  );
}
