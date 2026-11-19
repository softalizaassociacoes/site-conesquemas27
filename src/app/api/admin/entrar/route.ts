import { NextResponse } from "next/server";
import { falhaDeArmazenamento } from "@/lib/admin/guarda";
import {
  COOKIE_SESSAO,
  OPCOES_COOKIE,
  assinarSessao,
  temSegredo,
} from "@/lib/admin/sessao";
import { acharUsuario, conferirSenha } from "@/lib/admin/usuarios";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Resposta única para e-mail inexistente, senha errada e conta sem senha. */
const RECUSADO = { ok: false, erro: "E-mail ou senha incorretos." };

/** Piso de tempo: o relógio não pode denunciar quem existe. */
const PISO_MS = 400;

export async function POST(req: Request) {
  if (!temSegredo()) {
    return NextResponse.json(
      {
        ok: false,
        erro: "O painel ainda não foi configurado. Falta a variável ADMIN_SESSION_SECRET no projeto.",
      },
      { status: 503 },
    );
  }

  const inicio = Date.now();
  const responder = async (resposta: NextResponse) => {
    const faltam = PISO_MS - (Date.now() - inicio);
    if (faltam > 0) await new Promise((r) => setTimeout(r, faltam));
    return resposta;
  };

  let email = "";
  let senha = "";
  try {
    const corpo = (await req.json()) as { email?: unknown; senha?: unknown };
    email =
      typeof corpo.email === "string" ? corpo.email.trim().toLowerCase() : "";
    senha = typeof corpo.senha === "string" ? corpo.senha : "";
  } catch {
    return responder(NextResponse.json(RECUSADO, { status: 400 }));
  }
  if (!email || !senha) {
    return responder(NextResponse.json(RECUSADO, { status: 400 }));
  }

  let usuario;
  try {
    usuario = await acharUsuario(email);
  } catch (e) {
    return responder(falhaDeArmazenamento(e, "Leitura das contas no login"));
  }

  if (!usuario || !(await conferirSenha(usuario, senha))) {
    return responder(NextResponse.json(RECUSADO, { status: 401 }));
  }

  const resposta = NextResponse.json({ ok: true });
  resposta.cookies.set(
    COOKIE_SESSAO,
    await assinarSessao({
      email: usuario.email,
      nome: usuario.nome,
      papel: usuario.papel,
    }),
    OPCOES_COOKIE,
  );
  return responder(resposta);
}
