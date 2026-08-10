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

  /**
   * Página do evento na plataforma. A âncora #newsletter leva direto ao
   * formulário, que até 07/08/2026 funciona como lista de espera.
   *
   * Estes dois valores alimentam todos os botões do site, no cabeçalho e nas
   * páginas — nenhum tem texto próprio. Quando as inscrições abrirem, basta
   * tirar a âncora da URL.
   */
  inscricaoUrl: "https://eventos.softaliza.com.br/iii-conesquemas#newsletter",
  inscricaoRotulo: "Inscreva-se",

  /** Meta Pixel — Guia, p. 4. */
  pixelId: "622935097150845",

  /**
   * Lote em vigor, usado nos banners da home e da página de inscrições.
   *
   * O Lote Zero (24h, 25% off) encerrou em 08/08/2026 e saiu do ar. Na virada
   * de lote, atualize os três campos aqui e mova `destaque`/`encerrado` em
   * src/data/lotes.ts — não há outro lugar com essas datas.
   */
  loteVigente: {
    rotulo: "Lote 01",
    fimISO: "2026-09-30T23:59:59-03:00",
    periodoRotulo: "até 30/09/2026",
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

/**
 * Endereço público do site. Alimenta o sitemap, o robots.txt e as tags
 * Open Graph. Enquanto está em validação, aponta para o domínio de homologação.
 * Ao migrar para o domínio definitivo, defina NEXT_PUBLIC_SITE_URL.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://conesquemas27.softaliza.com.br";

/**
 * Indexação por buscadores. Fica DESLIGADA por padrão: o site está em
 * homologação e não deve aparecer no Google, nem competir com o domínio
 * oficial por conteúdo duplicado.
 *
 * Para liberar, na virada para o domínio definitivo, defina no ambiente:
 *   NEXT_PUBLIC_SITE_INDEXAVEL=true
 */
export const siteIndexavel = process.env.NEXT_PUBLIC_SITE_INDEXAVEL === "true";
