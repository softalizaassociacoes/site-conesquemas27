import { NextResponse } from "next/server";
import { descartarCodigo, gerarCodigo } from "@/lib/admin/codigos";
import { enviarCodigo, sendgridConfigurado } from "@/lib/admin/email";
import { falhaDeArmazenamento, LOG } from "@/lib/admin/guarda";
import { acharUsuario } from "@/lib/admin/usuarios";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Pede um código para criar ou redefinir a senha — é o mesmo fluxo do primeiro
 * acesso, porque ninguém nasce com senha definida por outra pessoa.
 *
 * A resposta é sempre a mesma, exista ou não o e-mail: senão o formulário
 * viraria uma forma de descobrir quem tem acesso ao painel.
 */
const RESPOSTA = {
  ok: true,
  mensagem:
    "Se este e-mail tiver acesso ao painel, o código chega em instantes. Ele vale por 15 minutos.",
};

export async function POST(req: Request) {
  if (!sendgridConfigurado()) {
    return NextResponse.json(
      {
        ok: false,
        erro: "O envio de e-mail não está configurado neste projeto. Faltam SENDGRID_API_KEY e SENDGRID_EMAIL.",
      },
      { status: 503 },
    );
  }

  let email = "";
  try {
    const corpo = (await req.json()) as { email?: unknown };
    email =
      typeof corpo.email === "string" ? corpo.email.trim().toLowerCase() : "";
  } catch {
    return NextResponse.json(RESPOSTA);
  }
  if (!email) return NextResponse.json(RESPOSTA);

  let usuario;
  try {
    usuario = await acharUsuario(email);
  } catch (e) {
    return falhaDeArmazenamento(e, "Leitura das contas para enviar código");
  }
  if (!usuario) return NextResponse.json(RESPOSTA);

  let codigo: string | null;
  try {
    codigo = await gerarCodigo(email);
  } catch (e) {
    return falhaDeArmazenamento(e, "Gravação do código de acesso");
  }

  // null = um pedido recente ainda está de pé. Dizer "enviamos agora" seria
  // mentira, e é esse tipo de mentira que esconde uma falha de envio.
  if (codigo === null) {
    return NextResponse.json({
      ok: true,
      mensagem:
        "Um código já foi enviado há pouco e continua valendo. Confira o e-mail, inclusive o spam. Se não chegou, espere um minuto e peça outro.",
    });
  }

  try {
    // O código só está gravado porque o envio vem AGORA. Se falhar, ele sai:
    // um código que ninguém recebeu bloquearia os pedidos seguintes.
    await enviarCodigo(usuario.email, codigo);
  } catch (e) {
    console.error(`${LOG} Falha ao enviar o código:`, e);
    await descartarCodigo(email).catch(() => {});
    return NextResponse.json(
      {
        ok: false,
        erro: "O código não pôde ser enviado. O endereço remetente precisa estar verificado no SendGrid.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json(RESPOSTA);
}
