/**
 * Configuração central do III ConEsquemas (2027).
 * Fonte: "Guia ConEsquemas" enviado pelo cliente + site da edição 2026.
 * Alterar aqui reflete em todo o site.
 */

export const evento = {
  edicao: "III",
  nomeCurto: "ConEsquemas",
  nome: "III ConEsquemas",
  nomeCompleto: "III Congresso Internacional de Práticas em Terapia do Esquema",
  ano: 2027,
  realizacao: "CEPPA Cursos",

  datas: {
    rotulo: "29 e 30 de abril e 01 de maio de 2027",
    rotuloCurto: "29, 30 ABR e 01 MAI / 2027",
    /** Abertura do credenciamento — usada na contagem regressiva. */
    inicioISO: "2027-04-29T12:00:00-03:00",
    fimISO: "2027-05-01T20:00:00-03:00",
  },

  local: {
    nome: "Espaço RioMar Eventos",
    complemento: "RioMar Recife — Pisos L3 e L4",
    endereco: "Av. República do Líbano, 251 — Pina, Recife/PE",
    cidade: "Recife",
    uf: "PE",
    mapsQuery: "RioMar Recife, Av. República do Líbano, 251, Pina, Recife - PE",
  },

  contato: {
    email: "conesquemas@ceppape.com.br",
    whatsapp: [
      { rotulo: "(81) 98382-0244", numero: "5581983820244" },
      { rotulo: "(81) 98945-8273", numero: "5581989458273" },
    ],
  },

  redes: {
    instagram: "https://www.instagram.com/conesquemas/",
    facebook: "https://www.facebook.com/profile.php?id=61566217973009",
    youtube: "https://www.youtube.com/@ceppa.cursos",
  },

  /** Plataforma de inscrições / área do congressista. */
  inscricaoUrl: "https://app.ciente.studio/conesquemas",
  areaParticipanteUrl: "https://app.ciente.studio/conesquemas",

  /** Meta Pixel — Guia, p. 4. */
  pixelId: "622935097150845",

  /** Lote Zero: 24 horas, 25% de desconto sobre o 1º lote. */
  loteZero: {
    inicioISO: "2026-08-07T13:00:00-03:00",
    fimISO: "2026-08-08T13:00:00-03:00",
    rotulo: "07/08/2026 (13h) a 08/08/2026 (13h)",
    descontoRotulo: "25% de desconto sobre o 1º lote",
    duracaoRotulo: "24 horas",
  },

  cargaHoraria: {
    congresso: "36 horas",
    minicurso: "3 horas",
  },

  turismo: {
    agencia: "Hericahctour",
    endereco:
      "Avenida Santos Dumont, 2626, Aldeota — Fortaleza/CE — 60150-160, Brasil",
    telefoneRotulo: "(84) 99115-2429",
    telefone: "5584991152429",
  },
} as const;

export const edicaoAnterior = {
  edicao: "II",
  nome: "II ConEsquemas",
  nomeCompleto: "II Congresso Internacional de Práticas em Terapia do Esquema",
  ano: 2026,
  datasRotulo: "23, 24 e 25 de abril de 2026",
  local: {
    nome: "Centro de Eventos do Recife — FPS",
    endereco: "Av. Mal. Mascarenhas de Morais, 4861 — Imbiribeira, Recife/PE",
  },
} as const;

export const siteUrl = "https://conesquemas.com.br";
