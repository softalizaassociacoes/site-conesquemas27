import { NextResponse } from "next/server";
import { conferirCodigo } from "@/lib/admin/codigos";
import { falhaDeArmazenamento } from "@/lib/admin/guarda";
import {
  COOKIE_SESSAO,
  OPCOES_COOKIE,
  assinarSessao,
  temSegredo,
} from "@/lib/admin/sessao";
import {
  acharUsuario,
  definirSenha,
  senhaAceitavel,
} from "@/lib/admin/usuarios";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MOTIVO: Record<string, string> = {
  invalido: "Código incorreto. Confira o que chegou no e-mail.",
  expirado: "Esse código venceu. Peça um novo.",
  excedido: "Tentativas demais. Peça um código novo.",
};

/** Define a senha a partir do código recebido por e-mail e já entra. */
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

  let email = "";
  let codigo = "";
  let senha = "";
  try {
    const corpo = (await req.json()) as Record<string, unknown>;
    email =
      typeof corpo.email === "string" ? corpo.email.trim().toLowerCase() : "";
    codigo =
      typeof corpo.codigo === "string" ? corpo.codigo.replace(/\D/g, "") : "";
    senha = typeof corpo.senha === "string" ? corpo.senha : "";
  } catch {
    return NextResponse.json(
      { ok: false, erro: "Pedido inválido." },
      { status: 400 },
    );
  }

  if (!email || codigo.length !== 6) {
    return NextResponse.json(
      { ok: false, erro: "Informe o e-mail e os seis dígitos do código." },
      { status: 400 },
    );
  }
  const problema = senhaAceitavel(senha);
  if (problema) {
    return NextResponse.json({ ok: false, erro: problema }, { status: 400 });
  }

  try {
    const usuario = await acharUsuario(email);
    if (!usuario) {
      // mesmo texto do código errado: não revela quem tem acesso
      return NextResponse.json(
        { ok: false, erro: MOTIVO.invalido },
        { status: 400 },
      );
    }

    const veredito = await conferirCodigo(email, codigo);
    if (veredito !== "ok") {
      return NextResponse.json(
        { ok: false, erro: MOTIVO[veredito] },
        { status: 400 },
      );
    }

    if (!(await definirSenha(email, senha))) {
      return NextResponse.json(
        { ok: false, erro: "Não foi possível salvar a senha. Tente de novo." },
        { status: 500 },
      );
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
    return resposta;
  } catch (e) {
    return falhaDeArmazenamento(e, "Definição de senha pelo código");
  }
}
