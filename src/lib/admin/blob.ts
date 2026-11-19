import "server-only";

/**
 * Leitura e gravação dos arquivos privados do painel no Vercel Blob.
 *
 * Nada aqui é público: `access: "private"` e leitura autenticada, sem cache —
 * um arquivo de contas servido do CDN devolveria a versão anterior logo depois
 * de uma alteração, e alguém veria a conta que acabou de remover.
 *
 * A Vercel passou a cadastrar BLOB_STORE_ID no lugar do BLOB_READ_WRITE_TOKEN
 * antigo. O SDK lê as duas; a checagem aqui aceita as duas também, senão o
 * painel diria "falta configurar" num projeto já configurado.
 */

export function blobConfigurado(): boolean {
  return Boolean(
    process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN,
  );
}

export class SemBlob extends Error {
  constructor() {
    super("Vercel Blob não configurado no projeto.");
    this.name = "SemBlob";
  }
}

/**
 * Lê um JSON privado. Devolve `null` quando o arquivo ainda não existe —
 * diferente de erro: na primeira execução ele nunca existe.
 */
export async function lerJson<T>(caminho: string): Promise<T | null> {
  if (!blobConfigurado()) throw new SemBlob();
  const { get, BlobNotFoundError } = await import("@vercel/blob");
  let r;
  try {
    r = await get(caminho, { access: "private", useCache: false });
  } catch (e) {
    // "não existe" é esperado na primeira execução. Qualquer outra falha é
    // propagada de propósito: tratar erro de armazenamento como "arquivo
    // vazio" faria o painel recriar a semente por cima das contas de verdade.
    if (e instanceof BlobNotFoundError) return null;
    throw e;
  }
  if (!r || r.statusCode !== 200 || !r.stream) return null;
  const texto = await new Response(r.stream).text();
  if (!texto.trim()) return null;
  return JSON.parse(texto) as T;
}

export async function gravarJson(caminho: string, dados: unknown) {
  if (!blobConfigurado()) throw new SemBlob();
  const { put } = await import("@vercel/blob");
  await put(caminho, JSON.stringify(dados, null, 2), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
  });
}
