/**
 * Minicursos do III ConEsquemas 2027.
 * Fonte: Guia ConEsquemas, páginas 24 a 26 e FAQ (p. 21).
 * Nesta edição os minicursos são gratuitos e exclusivos para inscritos no congresso.
 */

export type Minicurso = {
  slug: string;
  titulo: string;
  subtitulo?: string;
  facilitadores: string[];
  descricao: string[];
  conteudo?: string[];
  imagem?: string;
};

/**
 * Banners rotativos da home — arquivos em public/images/carrossel, todos em
 * 1058x389. Para acrescentar um slide, coloque a arte na pasta e some uma
 * entrada aqui, na ordem em que deve aparecer.
 */
export const carrossel = [
  ...[1, 2, 3, 4, 5, 6].map((n) => ({
    src: `/images/carrossel/${n}.png`,
    alt: `III ConEsquemas 2027 — destaque ${n}`,
  })),
  {
    src: "/images/carrossel/7.jpg",
    alt: "Primeiro e único Congresso de Práticas em Terapia do Esquema no mundo",
  },
];

/**
 * O guia não informa data e horário dos minicursos de 2027 — só a carga
 * horária (FAQ, p. 22) e as regras (p. 7 e 21). Não invente os horários aqui:
 * preencha quando a organização divulgar.
 */
export const minicursosInfo = {
  formato: "Presencial — RioMar Eventos, Recife/PE",
  cargaHoraria: "3 horas",
  regras: [
    "Os minicursos são gratuitos e exclusivos para participantes regularmente inscritos no congresso.",
    "As vagas são limitadas pela capacidade da sala e preenchidas por ordem de inscrição e pagamento.",
    "A escolha deve ser realizada no momento da inscrição e não poderá ser alterada posteriormente.",
    "Cada congressista poderá participar de apenas um minicurso.",
    "Conferem certificado próprio, com carga horária de 3 horas.",
  ],
};

export const minicursos: Minicurso[] = [
  {
    slug: "terapia-do-esquema-culturalmente-sensivel",
    titulo: "Terapia do Esquema Culturalmente Sensível e Brasileira",
    facilitadores: ["Bruno Reis"],
    imagem: "/images/minicursos/Bruno Reis.png",
    descricao: [
      "Neste minicurso, Bruno Reis apresenta contribuições para uma Terapia do Esquema mais sensível à realidade brasileira. Para isso, inicialmente articula pesquisas atuais sobre o povo brasileiro com as experiências vividas durante a turnê de lançamento do livro Terapia Cognitivo-Comportamental para a População Negra, quando percorreu diferentes regiões do país, conhecendo distintas práticas psicológicas e as demandas específicas de cada contexto.",
      "A partir dessas reflexões, serão discutidas características e especificidades da população brasileira, bem como possibilidades de adaptar a prática da Terapia do Esquema, tornando suas intervenções mais sensíveis e eficazes no contexto brasileiro.",
    ],
  },
  {
    slug: "qual-terapeuta-voce-quer-ser",
    titulo: "Qual terapeuta você quer ser?",
    subtitulo: "Encontrando-se no encontro com o outro",
    facilitadores: ["Aline Kristensen", "Rossana Andriola"],
    imagem: "/images/minicursos/Aline Kristesen e Rossana Andriola.png",
    descricao: [
      "Um convite a olhar para o próprio terapeuta como instrumento de mudança: como a história pessoal e os esquemas de quem atende atravessam a prática clínica e moldam o encontro terapêutico.",
    ],
    conteudo: [
      "Todo terapeuta leva a si mesmo na sessão — a influência da história pessoal e dos esquemas do terapeuta na prática clínica",
      "O terapeuta como instrumento de mudança na Terapia do Esquema",
      "O encontro terapêutico como espaço de transformação mútua",
      "Como os pacientes nos ajudam a conhecer a nós mesmos",
      "Presença, autenticidade e uso de si na relação terapêutica",
      "Empatia, confrontação e reparação de rupturas como habilidades relacionais fundamentais",
      "O desenvolvimento da identidade profissional do terapeuta",
      "Reflexões experienciais sobre os valores e a marca relacional que desejamos deixar em nossos pacientes",
    ],
  },
  {
    slug: "da-historia-a-prosperidade",
    titulo: "Da história à prosperidade",
    subtitulo: "Quando os esquemas interferem no seu futuro",
    facilitadores: ["Ana Rizzon", "Ana Carla Gameleira", "Vanina Cartaxo"],
    imagem:
      "/images/minicursos/Ana Rizzon, Ana Carla Gameleira e Vanina Cartaxo.png",
    descricao: [
      "Nossos esquemas se formam cedo, na tentativa de nos proteger, mas com o tempo podem se tornar os maiores obstáculos entre nós e a vida que desejamos. Neste minicurso, Ana Rizzon, Ana Carla Gameleira e Vanina Cartaxo mostram como padrões construídos na história pessoal seguem interferindo, silenciosamente, nas escolhas, nas relações e na forma como cada um constrói (ou trava) o próprio futuro.",
      "A partir de um olhar prático e vivencial, as facilitadoras discutem caminhos para identificar esses esquemas e transformá-los em recursos para a prosperidade emocional, relacional e profissional.",
    ],
  },
];
