import { NextResponse } from "next/server";
import { descartarCodigo, gerarCodigo } from "@/lib/admin/codigos";
import { enviarCodigo, sendgridConfigurado } from "@/lib/admin/email";
import {
  LOG,
  falhaDeArmazenamento,
  naoAutenticado,
  naoAutorizado,
  sessaoAtual,
} from "@/lib/admin/guarda";
import { ehPapel, type Papel } from "@/lib/admin/papeis";
import {
  atualizarUsuario,
  criarUsuario,
  removerUsuario,
} from "@/lib/admin/usuarios";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Gestão das contas. O papel significa alguma coisa: só administrador mexe
 * aqui. Editor entra e trabalha, mas não cria nem remove ninguém — por isso a
 * checagem é no servidor, não só no botão escondido da tela.
 */
async function exigirAdministrador() {
  const sessao = await sessaoAtual();
  if (!sessao) return { erro: naoAutenticado() } as const;
  if (sessao.papel !== "administrador") {
    return { erro: naoAutorizado() } as const;
  }
  return { sessao } as const;
}

const lerPapel = (v: unknown): Papel | undefined => (ehPapel(v) ? v : undefined);

export async function POST(req: Request) {
  const guarda = await exigirAdministrador();
  if ("erro" in guarda) return guarda.erro;

  let nome = "";
  let email = "";
  let senha = "";
  let papel: Papel = "editor";
  try {
    const c = (await req.json()) as Record<string, unknown>;
    nome = typeof c.nome === "string" ? c.nome : "";
    email = typeof c.email === "string" ? c.email : "";
    senha = typeof c.senha === "string" ? c.senha : "";
    papel = lerPapel(c.papel) ?? "editor";
  } catch {
    return NextResponse.json(
      { ok: false, erro: "Pedido inválido." },
      { status: 400 },
    );
  }

  let r;
  try {
    r = await criarUsuario({ nome, email, papel, senha: senha || undefined });
  } catch (e) {
    return falhaDeArmazenamento(e, "Criação de conta");
  }
  if (!r.ok) return NextResponse.json(r, { status: 400 });

  // com senha escolhida aqui, não há código a enviar: quem criou já sabe
  if (senha) {
    return NextResponse.json({ ok: true, usuario: r.usuario, avisada: false });
  }

  // avisa a pessoa na hora; se o e-mail falhar, a conta continua de pé e ela
  // pode usar o "primeiro acesso" na tela de entrada
  let avisada = false;
  if (sendgridConfigurado()) {
    try {
      const codigo = await gerarCodigo(r.usuario.email);
      if (codigo) {
        await enviarCodigo(r.usuario.email, codigo);
        avisada = true;
      }
    } catch (e) {
      console.error(`${LOG} Conta criada, mas o convite não saiu:`, e);
      await descartarCodigo(r.usuario.email).catch(() => {});
    }
  }

  return NextResponse.json({ ok: true, usuario: r.usuario, avisada });
}

export async function PATCH(req: Request) {
  const guarda = await exigirAdministrador();
  if ("erro" in guarda) return guarda.erro;

  let email = "";
  const mudancas: {
    nome?: string;
    papel?: Papel;
    novoEmail?: string;
    senha?: string;
  } = {};
  try {
    const c = (await req.json()) as Record<string, unknown>;
    email = typeof c.email === "string" ? c.email : "";
    if (typeof c.nome === "string") mudancas.nome = c.nome;
    const papel = lerPapel(c.papel);
    if (papel) mudancas.papel = papel;
    if (typeof c.novoEmail === "string" && c.novoEmail.trim()) {
      mudancas.novoEmail = c.novoEmail;
    }
    if (typeof c.senha === "string" && c.senha) mudancas.senha = c.senha;
  } catch {
    return NextResponse.json(
      { ok: false, erro: "Pedido inválido." },
      { status: 400 },
    );
  }
  if (!email || Object.keys(mudancas).length === 0) {
    return NextResponse.json(
      { ok: false, erro: "Nada a alterar." },
      { status: 400 },
    );
  }

  try {
    const r = await atualizarUsuario(email, mudancas);
    return NextResponse.json(r, { status: r.ok ? 200 : 400 });
  } catch (e) {
    return falhaDeArmazenamento(e, "Alteração de conta");
  }
}

export async function DELETE(req: Request) {
  const guarda = await exigirAdministrador();
  if ("erro" in guarda) return guarda.erro;

  let email = "";
  try {
    const c = (await req.json()) as { email?: unknown };
    email = typeof c.email === "string" ? c.email : "";
  } catch {
    return NextResponse.json(
      { ok: false, erro: "Pedido inválido." },
      { status: 400 },
    );
  }

  try {
    const r = await removerUsuario(email, guarda.sessao.email);
    return NextResponse.json(r, { status: r.ok ? 200 : 400 });
  } catch (e) {
    return falhaDeArmazenamento(e, "Remoção de conta");
  }
}
