/**
 * Períodos do painel, sempre no fuso de Brasília.
 *
 * O servidor da Vercel roda em UTC: sem fixar o fuso, "hoje" viraria o dia
 * seguinte depois das 21h, e o relatório mostraria um dia que ainda não houve.
 */
const FUSO = "America/Sao_Paulo";

export const PRESETS = [
  { chave: "7d", rotulo: "7 dias", dias: 7 },
  { chave: "28d", rotulo: "28 dias", dias: 28 },
  { chave: "90d", rotulo: "90 dias", dias: 90 },
] as const;

export type ChavePreset = (typeof PRESETS)[number]["chave"];

const fmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: FUSO,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** AAAA-MM-DD de hoje no fuso do evento. */
export function hoje(): string {
  return fmt.format(new Date());
}

function somarDias(dia: string, n: number): string {
  const [a, m, d] = dia.split("-").map(Number);
  const base = new Date(Date.UTC(a, m - 1, d));
  base.setUTCDate(base.getUTCDate() + n);
  return base.toISOString().slice(0, 10);
}

export function diasEntre(inicio: string, fim: string): number {
  const ms = Date.parse(`${fim}T00:00:00Z`) - Date.parse(`${inicio}T00:00:00Z`);
  return Math.round(ms / 86_400_000) + 1;
}

const ehData = (v: unknown): v is string =>
  typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);

export type Periodo = {
  inicio: string;
  fim: string;
  rotulo: string;
  preset: ChavePreset | "personalizado";
  anterior: { inicio: string; fim: string };
};

/**
 * Lê o período dos parâmetros da URL. Datas soltas têm prioridade sobre o
 * atalho, e o período anterior tem exatamente o mesmo tamanho, para a
 * comparação significar alguma coisa.
 */
export function resolverPeriodo(params: {
  de?: string;
  ate?: string;
  periodo?: string;
}): Periodo {
  const fimMax = hoje();

  if (ehData(params.de) && ehData(params.ate) && params.de <= params.ate) {
    const inicio = params.de;
    const fim = params.ate > fimMax ? fimMax : params.ate;
    const tamanho = diasEntre(inicio, fim);
    return {
      inicio,
      fim,
      rotulo: "período escolhido",
      preset: "personalizado",
      anterior: {
        inicio: somarDias(inicio, -tamanho),
        fim: somarDias(inicio, -1),
      },
    };
  }

  const preset = PRESETS.find((p) => p.chave === params.periodo) ?? PRESETS[1];
  const fim = fimMax;
  const inicio = somarDias(fim, -(preset.dias - 1));
  return {
    inicio,
    fim,
    rotulo: `últimos ${preset.rotulo}`,
    preset: preset.chave,
    anterior: {
      inicio: somarDias(inicio, -preset.dias),
      fim: somarDias(inicio, -1),
    },
  };
}

const MESES = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

export function porExtenso(dia: string): string {
  const [a, m, d] = dia.split("-");
  return `${d}/${MESES[Number(m) - 1]}/${a}`;
}

export function curta(dia: string): string {
  const [, m, d] = dia.split("-");
  return `${d}/${m}`;
}

/** Duração legível, para a média de sessão. */
export function duracao(segundos: number): string {
  if (!segundos) return "0s";
  const min = Math.floor(segundos / 60);
  const seg = Math.round(segundos % 60);
  return min ? `${min}min ${String(seg).padStart(2, "0")}s` : `${seg}s`;
}
