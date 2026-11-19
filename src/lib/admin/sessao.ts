/**
 * Sessão do /admin: um cookie assinado, sem banco e sem dependência nova.
 *
 * A assinatura usa Web Crypto (HMAC-SHA256), que existe tanto no runtime das
 * rotas quanto no do proxy — assim o MESMO código confere o cookie nos dois
 * lugares, e não há risco de uma barreira aceitar o que a outra recusaria.
 * (No Next 16 o proxy roda em Node por padrão, mas Web Crypto segue sendo o
 * denominador comum: se um dia ele voltar para o Edge, nada aqui muda.)
 */

import { ehPapel, type Papel } from "@/lib/admin/papeis";

export type { Papel };
export { PAPEIS, rotuloPapel } from "@/lib/admin/papeis";

export type Sessao = {
  email: string;
  nome: string;
  papel: Papel;
  expiraEm: number;
};

export const COOKIE_SESSAO = "conesquemas_admin";
const DURACAO_MS = 12 * 60 * 60 * 1000; // 12 horas

function segredo(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET ausente ou curta demais (mínimo 32 caracteres).",
    );
  }
  return s;
}

export function temSegredo(): boolean {
  const s = process.env.ADMIN_SESSION_SECRET;
  return typeof s === "string" && s.length >= 32;
}

const b64url = {
  enc(bytes: Uint8Array): string {
    let s = "";
    for (const b of bytes) s += String.fromCharCode(b);
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  },
  dec(txt: string): Uint8Array {
    const s = atob(txt.replace(/-/g, "+").replace(/_/g, "/"));
    const out = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
    return out;
  },
};

async function chave(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(segredo()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function assinarSessao(
  dados: Omit<Sessao, "expiraEm">,
): Promise<string> {
  const sessao: Sessao = { ...dados, expiraEm: Date.now() + DURACAO_MS };
  const corpo = b64url.enc(new TextEncoder().encode(JSON.stringify(sessao)));
  const assinatura = await crypto.subtle.sign(
    "HMAC",
    await chave(),
    new TextEncoder().encode(corpo),
  );
  return `${corpo}.${b64url.enc(new Uint8Array(assinatura))}`;
}

/** Devolve a sessão só se a assinatura confere e o prazo não venceu. */
export async function lerSessao(
  token: string | undefined,
): Promise<Sessao | null> {
  if (!token) return null;
  const [corpo, assinatura] = token.split(".");
  if (!corpo || !assinatura) return null;
  try {
    const ok = await crypto.subtle.verify(
      "HMAC",
      await chave(),
      b64url.dec(assinatura) as BufferSource,
      new TextEncoder().encode(corpo),
    );
    if (!ok) return null;
    const sessao = JSON.parse(
      new TextDecoder().decode(b64url.dec(corpo)),
    ) as Sessao;
    if (
      typeof sessao.expiraEm !== "number" ||
      sessao.expiraEm < Date.now() ||
      !ehPapel(sessao.papel)
    ) {
      return null;
    }
    return sessao;
  } catch {
    return null;
  }
}

export const OPCOES_COOKIE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: DURACAO_MS / 1000,
};
