import "server-only";

import type { BetaAnalyticsDataClient } from "@google-analytics/data";

/**
 * Leitura do Google Analytics 4 pela Data API.
 *
 * `server-only` no topo não é enfeite: a credencial tem chave privada, e esse
 * import faz o build QUEBRAR se algum componente de cliente tocar neste
 * arquivo, em vez de a chave vazar para o pacote do navegador.
 *
 * Variáveis (cadastradas na Vercel, nunca em arquivo versionado):
 *   GA4_PROPERTY_ID  — só o número da propriedade, sem "properties/"
 *   GA4_CREDENCIAIS  — o JSON inteiro da conta de serviço, como Secret
 *
 * São coisas diferentes do NEXT_PUBLIC_GA_MEASUREMENT_ID: aquele (G-...) serve
 * para MEDIR, no navegador; o número da propriedade serve para LER o relatório,
 * aqui no servidor.
 */

const ESCOPO = "https://www.googleapis.com/auth/analytics.readonly";
const LOG = "[ADMIN-CONESQUEMAS]";

export type TipoFalha =
  | "sem-credencial"
  | "credencial-invalida"
  | "sem-permissao"
  | "cota"
  | "rede"
  | "desconhecida";

export type Falha = { tipo: TipoFalha; detalhe?: string };
export type Resultado<T> = { ok: true; dados: T } | { ok: false; falha: Falha };

/** Mensagem do painel para cada falha, com o que fazer a respeito. */
export const TEXTO_FALHA: Record<TipoFalha, { titulo: string; texto: string }> =
  {
    "sem-credencial": {
      titulo: "Falta cadastrar a credencial de leitura",
      texto:
        "A medição do site pode já estar no ar e guardando dados, mas o painel ainda não tem com que lê-los. Faltam as variáveis GA4_PROPERTY_ID e GA4_CREDENCIAIS no projeto da Vercel, e um novo deploy depois de cadastrá-las. Nada se perde nesse meio tempo: quando entrarem, o histórico aparece aqui desde o primeiro dia.",
    },
    "credencial-invalida": {
      titulo: "A credencial não foi aceita",
      texto:
        "O conteúdo de GA4_CREDENCIAIS não é um JSON de conta de serviço válido, ou a chave foi revogada. Vale recadastrar a variável com o arquivo original, sem editar o conteúdo, e publicar de novo.",
    },
    "sem-permissao": {
      titulo: "A conta de serviço não enxerga esta propriedade",
      texto:
        "A credencial é válida, mas não há leitura na propriedade indicada em GA4_PROPERTY_ID. Desconfie primeiro do NÚMERO: uma propriedade que a conta de serviço não enxerga responde exatamente isto, e não “não existe”. Confira o número na propriedade do Google Analytics antes de mexer em permissão.",
    },
    cota: {
      titulo: "Cota do Google Analytics esgotada por enquanto",
      texto:
        "A propriedade atingiu o limite de consultas do período. Os números voltam sozinhos quando a cota renovar; evite recarregar em sequência até lá.",
    },
    rede: {
      titulo: "Não foi possível falar com o Google Analytics",
      texto:
        "A consulta não chegou ao destino. Costuma ser momentâneo: tente de novo em instantes.",
    },
    desconhecida: {
      titulo: "Não foi possível ler as métricas agora",
      texto:
        "A consulta falhou por um motivo não previsto. O detalhe ficou no log da função, em Vercel · Logs, com o prefixo [ADMIN-CONESQUEMAS].",
    },
  };

export function credencialConfigurada(): boolean {
  return Boolean(process.env.GA4_PROPERTY_ID && process.env.GA4_CREDENCIAIS);
}

let clienteCache: BetaAnalyticsDataClient | null = null;

async function cliente(): Promise<BetaAnalyticsDataClient> {
  if (clienteCache) return clienteCache;

  const credentials = JSON.parse(process.env.GA4_CREDENCIAIS!) as {
    client_email?: string;
    private_key?: string;
    project_id?: string;
  };
  if (!credentials.client_email || !credentials.private_key) {
    throw Object.assign(new Error("JSON sem client_email ou private_key"), {
      _tipo: "credencial-invalida" as const,
    });
  }

  // Import dinâmico: a biblioteca do Google é pesada e só faz falta quando a
  // credencial existe. Assim o painel abre e explica o que falta, em vez de
  // arrastar o pacote inteiro em toda renderização.
  const { BetaAnalyticsDataClient } = await import("@google-analytics/data");

  // A credencial vai direto nas opções do cliente, sem montar um GoogleAuth
  // aqui fora: o @google-analytics/data traz a sua própria cópia de
  // google-auth-library, e as duas não são o mesmo tipo — passar uma instância
  // nossa quebra a tipagem no build.
  clienteCache = new BetaAnalyticsDataClient({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    },
    projectId: credentials.project_id,
    scopes: [ESCOPO],
  });
  return clienteCache;
}

const propriedade = () => `properties/${process.env.GA4_PROPERTY_ID}`;

/** Traduz o erro da biblioteca para algo que a tela saiba explicar. */
function classificar(e: unknown): Falha {
  const erro = e as { _tipo?: TipoFalha; code?: number; message?: string };
  if (erro?._tipo) return { tipo: erro._tipo, detalhe: erro.message };
  if (e instanceof SyntaxError) {
    return { tipo: "credencial-invalida", detalhe: e.message };
  }
  switch (erro?.code) {
    case 7: // PERMISSION_DENIED
      return { tipo: "sem-permissao", detalhe: erro.message };
    case 16: // UNAUTHENTICATED
      return { tipo: "credencial-invalida", detalhe: erro.message };
    case 8: // RESOURCE_EXHAUSTED
      return { tipo: "cota", detalhe: erro.message };
    case 4: // DEADLINE_EXCEEDED
    case 14: // UNAVAILABLE
      return { tipo: "rede", detalhe: erro.message };
    default:
      return { tipo: "desconhecida", detalhe: erro?.message };
  }
}

export type Fatia = { rotulo: string; detalhe?: string; valor: number };
export type PontoDoDia = { dia: string; usuarios: number };

export type Totais = {
  usuarios: number;
  sessoes: number;
  visualizacoes: number;
  duracaoMediaSegundos: number;
};

export type Acessos = {
  inicio: string;
  fim: string;
  /** Primeiro dia em que existe medição. Antes disso não há dado nenhum. */
  primeiroDiaMedido: string | null;
  totais: Totais;
  anterior: Totais;
  porDia: PontoDoDia[];
  paginas: Fatia[];
  origens: Fatia[];
  canais: Fatia[];
  dispositivos: Fatia[];
  cidades: Fatia[];
  agora: number | null;
};

type Linha = {
  dimensionValues?: ({ value?: string | null } | null)[] | null;
  metricValues?: ({ value?: string | null } | null)[] | null;
};

const num = (l: Linha | undefined, i: number) =>
  Number(l?.metricValues?.[i]?.value ?? 0) || 0;
const dim = (l: Linha, i: number) => l.dimensionValues?.[i]?.value ?? "";

/** Tira o sufixo do template do título, que se repete em toda página. */
function limparTitulo(titulo: string, caminho: string): string {
  const limpo = titulo
    .replace(/\s*\|\s*III ConEsquemas.*$/i, "")
    .replace(/\s*—\s*III Congresso Internacional.*$/i, "")
    .trim();
  if (caminho === "/") return limpo || "Início";
  return limpo || caminho;
}

const SEM_VALOR = new Set(["(not set)", "(none)", "(other)", "(direct)"]);
const humano = (v: string) => (SEM_VALOR.has(v) ? "não informado" : v);

const aaaammdd = (d: string) =>
  d.length === 8 ? `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}` : d;

// ------------------------------------------------------------------ cache

/**
 * Cache de 5 minutos por combinação de datas, SÓ DO ACERTO.
 *
 * Guardar a falha faz um erro passageiro grudar na tela depois de já ter
 * passado — e, na primeira vez que a credencial for cadastrada, a tela
 * continuaria dizendo que falta. Por isso o erro nunca entra aqui.
 */
const VALIDADE_CACHE_MS = 5 * 60 * 1000;
const cache = new Map<string, { em: number; dados: Acessos }>();

function doCache(chave: string): Acessos | null {
  const guardado = cache.get(chave);
  if (!guardado) return null;
  if (Date.now() - guardado.em > VALIDADE_CACHE_MS) {
    cache.delete(chave);
    return null;
  }
  return guardado.dados;
}

function guardar(chave: string, dados: Acessos) {
  // o painel tem poucos recortes possíveis; o teto evita crescer sem limite
  if (cache.size > 40) cache.clear();
  cache.set(chave, { em: Date.now(), dados });
}

// ---------------------------------------------------------------- consulta

export async function lerAcessos(
  inicio: string,
  fim: string,
  anterior: { inicio: string; fim: string },
): Promise<Resultado<Acessos>> {
  if (!credencialConfigurada()) {
    return { ok: false, falha: { tipo: "sem-credencial" } };
  }

  const chave = `${inicio}|${fim}|${anterior.inicio}|${anterior.fim}`;
  const guardado = doCache(chave);
  if (guardado) return { ok: true, dados: guardado };

  try {
    const c = await cliente();
    const prop = propriedade();
    const faixa = [{ startDate: inicio, endDate: fim }];
    const porSessoes = [{ metric: { metricName: "sessions" }, desc: true }];
    const metricasTotais = [
      { name: "activeUsers" },
      { name: "sessions" },
      { name: "screenPageViews" },
      { name: "averageSessionDuration" },
    ];

    const [lote] = await c.batchRunReports({
      property: prop,
      requests: [
        { dateRanges: faixa, metrics: metricasTotais },
        {
          dateRanges: [{ startDate: anterior.inicio, endDate: anterior.fim }],
          metrics: metricasTotais,
        },
        {
          dateRanges: faixa,
          dimensions: [{ name: "date" }],
          metrics: [{ name: "activeUsers" }],
          orderBys: [{ dimension: { dimensionName: "date" } }],
          limit: 400,
        },
        {
          dateRanges: faixa,
          dimensions: [{ name: "pageTitle" }, { name: "pagePath" }],
          metrics: [{ name: "screenPageViews" }],
          orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
          limit: 12,
        },
        {
          dateRanges: faixa,
          dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
          metrics: [{ name: "sessions" }],
          orderBys: porSessoes,
          limit: 10,
        },
      ],
    });

    const [lote2] = await c.batchRunReports({
      property: prop,
      requests: [
        {
          dateRanges: faixa,
          dimensions: [{ name: "sessionDefaultChannelGroup" }],
          metrics: [{ name: "sessions" }],
          orderBys: porSessoes,
          limit: 10,
        },
        {
          dateRanges: faixa,
          dimensions: [{ name: "deviceCategory" }],
          metrics: [{ name: "sessions" }],
          orderBys: porSessoes,
          limit: 5,
        },
        {
          dateRanges: faixa,
          dimensions: [{ name: "city" }],
          metrics: [{ name: "sessions" }],
          orderBys: porSessoes,
          limit: 10,
        },
        {
          // desde sempre, só para achar o primeiro dia com medição: a data de
          // início não pode ser cravada no código, senão pedir 90 dias desenha
          // uma linha despencando a zero antes de a medição existir
          dateRanges: [{ startDate: "2020-01-01", endDate: "today" }],
          dimensions: [{ name: "date" }],
          metrics: [{ name: "activeUsers" }],
          orderBys: [{ dimension: { dimensionName: "date" } }],
          limit: 1,
        },
      ],
    });

    const r = (i: number): Linha[] => (lote.reports?.[i]?.rows ?? []) as Linha[];
    const r2 = (i: number): Linha[] =>
      (lote2.reports?.[i]?.rows ?? []) as Linha[];

    const totais = r(0)[0];
    const antes = r(1)[0];
    const primeiro = r2(3)[0];

    // tempo real é um extra: se falhar, a tela segue sem ele
    let agora: number | null = null;
    try {
      const [rt] = await c.runRealtimeReport({
        property: prop,
        metrics: [{ name: "activeUsers" }],
      });
      agora = Number(rt.rows?.[0]?.metricValues?.[0]?.value ?? 0) || 0;
    } catch {
      agora = null;
    }

    const dados: Acessos = {
      inicio,
      fim,
      primeiroDiaMedido: primeiro ? aaaammdd(dim(primeiro, 0)) || null : null,
      totais: {
        usuarios: num(totais, 0),
        sessoes: num(totais, 1),
        visualizacoes: num(totais, 2),
        duracaoMediaSegundos: Math.round(num(totais, 3)),
      },
      anterior: {
        usuarios: num(antes, 0),
        sessoes: num(antes, 1),
        visualizacoes: num(antes, 2),
        duracaoMediaSegundos: Math.round(num(antes, 3)),
      },
      porDia: r(2).map((l) => ({
        dia: aaaammdd(dim(l, 0)),
        usuarios: num(l, 0),
      })),
      paginas: r(3).map((l) => ({
        rotulo: limparTitulo(dim(l, 0), dim(l, 1)),
        detalhe: dim(l, 1),
        valor: num(l, 0),
      })),
      origens: r(4).map((l) => ({
        rotulo: humano(dim(l, 0)),
        detalhe: humano(dim(l, 1)),
        valor: num(l, 0),
      })),
      canais: r2(0).map((l) => ({ rotulo: humano(dim(l, 0)), valor: num(l, 0) })),
      dispositivos: r2(1).map((l) => ({
        rotulo: humano(dim(l, 0)),
        valor: num(l, 0),
      })),
      cidades: r2(2).map((l) => ({
        rotulo: humano(dim(l, 0)),
        valor: num(l, 0),
      })),
      agora,
    };

    guardar(chave, dados);
    return { ok: true, dados };
  } catch (e) {
    const falha = classificar(e);
    console.error(`${LOG} GA4 (${falha.tipo}):`, falha.detalhe ?? e);
    return { ok: false, falha };
  }
}
