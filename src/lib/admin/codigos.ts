import "server-only";

import { createHash, randomInt, timingSafeEqual } from "node:crypto";
import { gravarJson, lerJson } from "@/lib/admin/blob";

/**
 * Códigos de uso único para criar ou redefinir a senha do painel.
 *
 * O código vai por e-mail e aqui fica só o resumo (SHA-256): quem abrir o
 * arquivo no Blob não consegue entrar com ele. Vale 15 minutos, aceita no
 * máximo cinco tentativas e some assim que é usado.
 */
type Codigo = {
  email: string;
  codigoHash: string;
  expiraEm: number;
  tentativas: number;
};

const CAMINHO = "admin/codigos.json";
const VALIDADE_MS = 15 * 60 * 1000;
const MAX_TENTATIVAS = 5;
/** Espaço mínimo entre dois pedidos para o mesmo e-mail. */
const INTERVALO_MS = 60 * 1000;

const resumo = (codigo: string) =>
  createHash("sha256").update(codigo).digest("base64");

async function ler(): Promise<Codigo[]> {
  const lista = await lerJson<Codigo[]>(CAMINHO);
  return Array.isArray(lista) ? lista : [];
}

const gravar = (codigos: Codigo[]) => gravarJson(CAMINHO, codigos);

const vigentes = (lista: Codigo[]) =>
  lista.filter((c) => c.expiraEm > Date.now());

/**
 * Gera um código e devolve o texto a enviar. Devolve `null` quando um pedido
 * recente ainda está de pé, para o formulário não virar um disparador de
 * e-mail.
 *
 * Quem chama TEM de enviar o e-mail depois e, se o envio falhar, chamar
 * `descartarCodigo`: o código já está gravado aqui.
 */
export async function gerarCodigo(email: string): Promise<string | null> {
  const alvo = email.trim().toLowerCase();
  const lista = vigentes(await ler());
  const recente = lista.find(
    (c) =>
      c.email === alvo && c.expiraEm - VALIDADE_MS + INTERVALO_MS > Date.now(),
  );
  if (recente) return null;

  const codigo = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const resto = lista.filter((c) => c.email !== alvo);
  await gravar([
    ...resto,
    {
      email: alvo,
      codigoHash: resumo(codigo),
      expiraEm: Date.now() + VALIDADE_MS,
      tentativas: 0,
    },
  ]);
  return codigo;
}

/**
 * Descarta o código guardado para um e-mail.
 *
 * Se a gravação dá certo mas o ENVIO falha, fica guardado um código que
 * ninguém recebeu — e ele bloqueia os pedidos seguintes pela janela de
 * reenvio, que passa a responder "já enviamos" para sempre. Falhou o envio,
 * o código sai.
 */
export async function descartarCodigo(email: string) {
  const alvo = email.trim().toLowerCase();
  const lista = await ler();
  if (!lista.some((c) => c.email === alvo)) return;
  await gravar(vigentes(lista.filter((c) => c.email !== alvo)));
}

export type ConfereCodigo = "ok" | "invalido" | "expirado" | "excedido";

/** Confere e consome o código. Um acerto nunca pode ser reaproveitado. */
export async function conferirCodigo(
  email: string,
  codigo: string,
): Promise<ConfereCodigo> {
  const alvo = email.trim().toLowerCase();
  const lista = await ler();
  const i = lista.findIndex((c) => c.email === alvo);
  if (i < 0) return "invalido";

  const registro = lista[i];
  if (registro.expiraEm <= Date.now()) {
    await gravar(lista.filter((_, j) => j !== i));
    return "expirado";
  }
  if (registro.tentativas >= MAX_TENTATIVAS) {
    await gravar(lista.filter((_, j) => j !== i));
    return "excedido";
  }

  const esperado = Buffer.from(registro.codigoHash, "base64");
  const obtido = Buffer.from(resumo(codigo.trim()), "base64");
  const acertou =
    esperado.length === obtido.length && timingSafeEqual(esperado, obtido);

  if (!acertou) {
    lista[i] = { ...registro, tentativas: registro.tentativas + 1 };
    await gravar(lista);
    return "invalido";
  }

  await gravar(vigentes(lista.filter((_, j) => j !== i)));
  return "ok";
}
