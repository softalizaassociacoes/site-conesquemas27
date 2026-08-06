export type Palestrante = {
  slug: string;
  nome: string;
  foto: string;
};

/**
 * Palestrantes do III ConEsquemas (2027).
 *
 * A ordem abaixo é a definida pelo cliente e não deve ser alterada — não é
 * alfabética nem por titulação. Os nomes vão sem título acadêmico, também a
 * pedido dele.
 *
 * As fotos são as oficiais, em public/images/palestrantes, uma por slug. Os
 * originais (PNG de até 3 MB) foram convertidos para WebP de 720x900 — mesmo
 * enquadramento 4:5, ~50 KB cada — e servidos sem o otimizador da Vercel; veja
 * o porquê em PalestrantesGrid. Para repor uma foto, converta antes:
 * sharp(origem).resize({width:720,height:900,fit:"cover"}).webp({quality:82})
 *
 * Os mini-currículos foram retirados junto com o "ver mais" — se voltarem a
 * ser necessários, estão no histórico do Git (commit bdebb0b e anteriores).
 */
export const palestrantes2027: Palestrante[] = [
  {
    slug: "margareth-oliveira",
    nome: "Margareth Oliveira",
    foto: "/images/palestrantes/margareth-oliveira.webp",
  },
  {
    slug: "rodrigo-trapp",
    nome: "Rodrigo Trapp",
    foto: "/images/palestrantes/rodrigo-trapp.webp",
  },
  {
    slug: "ana-rizzon",
    nome: "Ana Rizzon",
    foto: "/images/palestrantes/ana-rizzon.webp",
  },
  {
    slug: "renata-brasil",
    nome: "Renata Brasil",
    foto: "/images/palestrantes/renata-brasil.webp",
  },
  {
    slug: "natanna-schutz",
    nome: "Natanna Schutz",
    foto: "/images/palestrantes/natanna-schutz.webp",
  },
  {
    slug: "kelly-paim",
    nome: "Kelly Paim",
    foto: "/images/palestrantes/kelly-paim.webp",
  },
  {
    slug: "rossana-andriola",
    nome: "Rossana Andriola",
    foto: "/images/palestrantes/rossana-andriola.webp",
  },
  {
    slug: "bruno-cardoso",
    nome: "Bruno Luiz Avelino Cardoso",
    foto: "/images/palestrantes/bruno-cardoso.webp",
  },
  {
    slug: "aline-reis",
    nome: "Aline Reis",
    foto: "/images/palestrantes/aline-reis.webp",
  },
  {
    slug: "aline-kristensen",
    nome: "Aline Kristensen",
    foto: "/images/palestrantes/aline-kristensen.webp",
  },
  {
    slug: "vanina-cartaxo",
    nome: "Vanina Cartaxo",
    foto: "/images/palestrantes/vanina-cartaxo.webp",
  },
  {
    slug: "karen-szupszynski",
    nome: "Karen Szupszynski",
    foto: "/images/palestrantes/karen-szupszynski.webp",
  },
  {
    slug: "ana-carla-gameleira",
    nome: "Ana Carla Gameleira",
    foto: "/images/palestrantes/ana-carla-gameleira.webp",
  },
  {
    slug: "bruno-reis",
    nome: "Bruno Reis",
    foto: "/images/palestrantes/bruno-reis.webp",
  },
  {
    slug: "paula-guths",
    nome: "Paula Guths",
    foto: "/images/palestrantes/paula-guths.webp",
  },
  {
    slug: "bruno-vianna",
    nome: "Bruno Vianna",
    foto: "/images/palestrantes/bruno-vianna.webp",
  },
  {
    slug: "ana-clara-gomes",
    nome: "Ana Clara Gomes",
    foto: "/images/palestrantes/ana-clara-gomes.webp",
  },
  {
    slug: "melissa-fioravante",
    nome: "Melissa Fioravante",
    foto: "/images/palestrantes/melissa-fioravante.webp",
  },
  {
    slug: "flavia-rios",
    nome: "Flávia Rios",
    foto: "/images/palestrantes/flavia-rios.webp",
  },
  {
    slug: "francesca-stephan",
    nome: "Francesca Stephan",
    foto: "/images/palestrantes/francesca-stephan.webp",
  },
  {
    slug: "johnatan-felipe",
    nome: "Johnatan Felipe",
    foto: "/images/palestrantes/johnatan-felipe.webp",
  },
  {
    slug: "katuryn-lara",
    nome: "Katuryn Lara",
    foto: "/images/palestrantes/katuryn-lara.webp",
  },
  {
    slug: "gabryelle-alves",
    nome: "Gabryelle Alves",
    foto: "/images/palestrantes/gabryelle-alves.webp",
  },
  {
    slug: "luiza-deslandes",
    nome: "Luiza Deslandes",
    foto: "/images/palestrantes/luiza-deslandes.webp",
  },
  {
    slug: "daniela-di-giorgio-schneider",
    nome: "Daniela Di Giorgio Schneider",
    foto: "/images/palestrantes/daniela-di-giorgio-schneider.webp",
  },
  {
    slug: "giulia-altera",
    nome: "Giulia Altera",
    foto: "/images/palestrantes/giulia-altera.webp",
  },
  {
    slug: "lais-costa-de-carvalho",
    nome: "Laís Costa de Carvalho",
    foto: "/images/palestrantes/lais-costa-de-carvalho.webp",
  },
  {
    slug: "leopoldo-barbosa",
    nome: "Leopoldo Barbosa",
    foto: "/images/palestrantes/leopoldo-barbosa.webp",
  },
  {
    slug: "silvana-correa",
    nome: "Silvana Corrêa",
    foto: "/images/palestrantes/silvana-correa.webp",
  },
  {
    slug: "walkyria-pinto-ribeiro",
    nome: "Walkyria Pinto Ribeiro",
    foto: "/images/palestrantes/walkyria-pinto-ribeiro.webp",
  },
];
