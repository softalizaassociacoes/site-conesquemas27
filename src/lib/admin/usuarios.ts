import "server-only";

import { pbkdf2 as pbkdf2Cb, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { gravarJson, lerJson } from "@/lib/admin/blob";
import type { Papel } from "@/lib/admin/papeis";

/**
 * Contas do painel.
 *
 * TODA conta nasce e vive aqui, no arquivo privado do Blob. Não existe lista
 * de usuários em variável de ambiente, nem conta que só se edita na Vercel:
 * quem está dentro cria, edita, troca a senha e remove acesso, e vale na hora,
 * sem deploy.
 *
 * A única conta de origem diferente é a SEMENTE, e é uma só. O sistema a cria
 * sozinho na primeira execução, e só quando não existe conta nenhuma. Dali em
 * diante ela é uma conta como as outras: aparece na lista, pode ser editada e
 * pode ter a senha trocada.
 *
 * Nenhuma senha fica guardada, nem na Vercel: só o hash PBKDF2. Por isso não
 * existe "ver a senha de fulano" — existe trocar.
 */

const pbkdf2 = promisify(pbkdf2Cb);

const CAMINHO = "admin/usuarios.json";

/** Parâmetros do hash. Ficam gravados junto, para poderem subir no futuro. */
const ALGORITMO = "pbkdf2-sha256";
const ITERACOES = 210_000;
const TAMANHO_HASH = 32;
const TAMANHO_SAL = 16;

const LIMITE_CONTAS = 50;

/**
 * Semente. Este é o único e-mail de administração que pode ficar em arquivo
 * versionado — e fica porque é preciso que exista um primeiro acesso em um
 * repositório público, sem senha nenhuma no código.
 */
export const EMAIL_SEMENTE = "marcos@softaliza.com.br";
const NOME_SEMENTE = "Marcos Medeiros";

export type Usuario = {
  email: string;
  nome: string;
  papel: Papel;
  senhaHash: string | null;
  criadoEm: string;
  atualizadoEm: string | null;
};

/** O que vai para a tela: sem hash de senha, nunca. */
export type UsuarioVisivel = Omit<Usuario, "senhaHash"> & { temSenha: boolean };

export function visivel(u: Usuario): UsuarioVisivel {
  const { senhaHash, ...resto } = u;
  return { ...resto, temSenha: senhaHash !== null };
}

// ---------------------------------------------------------------- senha

async function hash(senha: string, sal: Buffer): Promise<string> {
  const derivada = await pbkdf2(
    senha.normalize("NFKC"),
    sal,
    ITERACOES,
    TAMANHO_HASH,
    "sha256",
  );
  return [
    ALGORITMO,
    ITERACOES,
    sal.toString("base64"),
    derivada.toString("base64"),
  ].join("$");
}

export async function novoHash(senha: string): Promise<string> {
  return hash(senha, randomBytes(TAMANHO_SAL));
}

/** Comparação em tempo constante: a resposta não entrega o acerto parcial. */
export async function conferirSenha(
  usuario: Usuario,
  senha: string,
): Promise<boolean> {
  if (!usuario.senhaHash) return false;
  const [algoritmo, iteracoes, salB64, esperadoB64] =
    usuario.senhaHash.split("$");
  if (algoritmo !== ALGORITMO || !salB64 || !esperadoB64) return false;
  const voltas = Number(iteracoes);
  if (!Number.isInteger(voltas) || voltas < 1000) return false;

  const esperado = Buffer.from(esperadoB64, "base64");
  const obtido = await pbkdf2(
    senha.normalize("NFKC"),
    Buffer.from(salB64, "base64"),
    voltas,
    esperado.length,
    "sha256",
  );
  return esperado.length === obtido.length && timingSafeEqual(esperado, obtido);
}

export function senhaAceitavel(senha: string): string | null {
  if (senha.length < 10) return "A senha precisa de pelo menos 10 caracteres.";
  if (senha.length > 200) return "A senha é longa demais.";
  if (!/[a-zA-Z]/.test(senha) || !/[0-9]/.test(senha)) {
    return "Use pelo menos uma letra e um número.";
  }
  return null;
}

export function emailAceitavel(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// ------------------------------------------------------------- arquivo

function saneado(lista: unknown): Usuario[] {
  if (!Array.isArray(lista)) return [];
  return lista
    .filter((u): u is Usuario => Boolean(u) && typeof u === "object")
    .map((u) => ({
      email: String(u.email ?? "").trim().toLowerCase(),
      nome: String(u.nome ?? "").trim(),
      papel: (u.papel === "administrador"
        ? "administrador"
        : "editor") as Papel,
      senhaHash: typeof u.senhaHash === "string" ? u.senhaHash : null,
      criadoEm: typeof u.criadoEm === "string" ? u.criadoEm : "",
      atualizadoEm: typeof u.atualizadoEm === "string" ? u.atualizadoEm : null,
    }))
    .filter((u) => u.email.length > 0);
}

/**
 * Grava a lista INTEIRA. Nunca um recorte dela.
 *
 * Já houve perda silenciosa num site da casa justamente por gravar só uma
 * parte das contas: criar ou remover alguém regravava o arquivo sem as outras,
 * e as senhas sumiam sem erro nenhum.
 */
async function gravar(usuarios: Usuario[]) {
  await gravarJson(CAMINHO, usuarios);
}

/**
 * Lista as contas, criando a semente quando não existe nenhuma.
 *
 * A senha inicial da semente vem de ADMIN_SENHA_INICIAL, se a variável existir.
 * Sem ela, a conta nasce sem senha e o primeiro acesso é o mesmo código por
 * e-mail do "esqueci a senha". Senha em arquivo versionado não entra: este
 * repositório é público.
 */
export async function listarUsuarios(): Promise<Usuario[]> {
  const guardados = saneado(await lerJson<unknown>(CAMINHO));
  if (guardados.length > 0) return guardados;

  const inicial = process.env.ADMIN_SENHA_INICIAL;
  const semente: Usuario = {
    email: EMAIL_SEMENTE,
    nome: NOME_SEMENTE,
    papel: "administrador",
    senhaHash:
      inicial && !senhaAceitavel(inicial) ? await novoHash(inicial) : null,
    criadoEm: new Date().toISOString(),
    atualizadoEm: null,
  };
  await gravar([semente]);
  console.log(
    "[ADMIN-CONESQUEMAS] Conta semente criada para",
    EMAIL_SEMENTE,
    semente.senhaHash ? "com senha inicial." : "sem senha: primeiro acesso por código no e-mail.",
  );
  return [semente];
}

export async function listarVisiveis(): Promise<UsuarioVisivel[]> {
  return (await listarUsuarios()).map(visivel);
}

export async function acharUsuario(email: string): Promise<Usuario | null> {
  const alvo = email.trim().toLowerCase();
  return (await listarUsuarios()).find((u) => u.email === alvo) ?? null;
}

// ------------------------------------------------------------ operações

export type ResultadoConta =
  | { ok: true; usuario: UsuarioVisivel }
  | { ok: false; erro: string };

const administradores = (lista: Usuario[]) =>
  lista.filter((u) => u.papel === "administrador");

export async function definirSenha(
  email: string,
  senha: string,
): Promise<boolean> {
  const usuarios = await listarUsuarios();
  const i = usuarios.findIndex((u) => u.email === email.trim().toLowerCase());
  if (i < 0) return false;
  usuarios[i] = {
    ...usuarios[i],
    senhaHash: await novoHash(senha),
    atualizadoEm: new Date().toISOString(),
  };
  await gravar(usuarios);
  return true;
}

export async function criarUsuario(dados: {
  nome: string;
  email: string;
  papel: Papel;
  /** Opcional. Em branco, a conta nasce sem senha e recebe código por e-mail. */
  senha?: string;
}): Promise<ResultadoConta> {
  const email = dados.email.trim().toLowerCase();
  const nome = dados.nome.trim().slice(0, 120);

  if (!emailAceitavel(email)) return { ok: false, erro: "E-mail inválido." };
  if (nome.length < 2) return { ok: false, erro: "Informe um nome." };
  if (dados.papel !== "administrador" && dados.papel !== "editor") {
    return { ok: false, erro: "Papel inválido." };
  }

  const usuarios = await listarUsuarios();
  if (usuarios.some((u) => u.email === email)) {
    return { ok: false, erro: "Já existe uma conta com este e-mail." };
  }
  if (usuarios.length >= LIMITE_CONTAS) {
    return { ok: false, erro: `Limite de ${LIMITE_CONTAS} contas atingido.` };
  }

  let senhaHash: string | null = null;
  if (dados.senha) {
    const problema = senhaAceitavel(dados.senha);
    if (problema) return { ok: false, erro: problema };
    senhaHash = await novoHash(dados.senha);
  }

  const nova: Usuario = {
    email,
    nome,
    papel: dados.papel,
    senhaHash,
    criadoEm: new Date().toISOString(),
    atualizadoEm: senhaHash ? new Date().toISOString() : null,
  };
  await gravar([...usuarios, nova]);
  return { ok: true, usuario: visivel(nova) };
}

export async function atualizarUsuario(
  email: string,
  mudancas: { nome?: string; papel?: Papel; novoEmail?: string; senha?: string },
): Promise<ResultadoConta> {
  const alvo = email.trim().toLowerCase();
  const usuarios = await listarUsuarios();
  const i = usuarios.findIndex((u) => u.email === alvo);
  if (i < 0) return { ok: false, erro: "Conta não encontrada." };

  const atual = usuarios[i];
  const atualizado: Usuario = { ...atual };

  if (mudancas.nome !== undefined) {
    const nome = mudancas.nome.trim().slice(0, 120);
    if (nome.length < 2) return { ok: false, erro: "Informe um nome." };
    atualizado.nome = nome;
  }

  if (mudancas.papel !== undefined) {
    if (mudancas.papel !== "administrador" && mudancas.papel !== "editor") {
      return { ok: false, erro: "Papel inválido." };
    }
    // É esta regra que impede alguém de se trancar do lado de fora: enquanto
    // ela existir, sempre sobra um administrador para recriar os acessos.
    const rebaixando =
      atual.papel === "administrador" && mudancas.papel !== "administrador";
    if (rebaixando && administradores(usuarios).length <= 1) {
      return {
        ok: false,
        erro: "Esta é a última conta de administrador. Promova outra pessoa antes de rebaixá-la.",
      };
    }
    atualizado.papel = mudancas.papel;
  }

  if (mudancas.novoEmail !== undefined) {
    const novo = mudancas.novoEmail.trim().toLowerCase();
    if (!emailAceitavel(novo)) return { ok: false, erro: "E-mail inválido." };
    if (novo !== alvo && usuarios.some((u) => u.email === novo)) {
      return { ok: false, erro: "Já existe uma conta com este e-mail." };
    }
    atualizado.email = novo;
  }

  if (mudancas.senha !== undefined) {
    const problema = senhaAceitavel(mudancas.senha);
    if (problema) return { ok: false, erro: problema };
    atualizado.senhaHash = await novoHash(mudancas.senha);
  }

  atualizado.atualizadoEm = new Date().toISOString();
  usuarios[i] = atualizado;
  await gravar(usuarios);
  return { ok: true, usuario: visivel(atualizado) };
}

export async function removerUsuario(
  email: string,
  solicitante: string,
): Promise<{ ok: true } | { ok: false; erro: string }> {
  const alvo = email.trim().toLowerCase();
  if (alvo === solicitante.trim().toLowerCase()) {
    return {
      ok: false,
      erro: "Você não pode remover a sua própria conta. Peça a outro administrador.",
    };
  }

  const usuarios = await listarUsuarios();
  const conta = usuarios.find((u) => u.email === alvo);
  if (!conta) return { ok: false, erro: "Conta não encontrada." };

  if (conta.papel === "administrador" && administradores(usuarios).length <= 1) {
    return {
      ok: false,
      erro: "Esta é a última conta de administrador e não pode ser removida.",
    };
  }

  await gravar(usuarios.filter((u) => u.email !== alvo));
  return { ok: true };
}
