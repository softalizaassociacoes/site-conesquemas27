export type SubItemNav = {
  rotulo: string;
  href: string;
  descricao?: string;
  /** Abre em nova aba — usado para os sites das edições anteriores. */
  externo?: boolean;
};

export type ItemNav = {
  rotulo: string;
  href: string;
  externo?: boolean;
  filhos?: SubItemNav[];
};

/** Site da edição de 2026, mantido em domínio próprio. */
export const siteEdicao2026 = "https://conesquemas26.softaliza.com.br";

export const navegacao: ItemNav[] = [
  { rotulo: "Home", href: "/" },
  {
    rotulo: "O Evento",
    href: "/sobre-o-evento",
    filhos: [
      {
        rotulo: "Sobre",
        href: "/sobre-o-evento",
        descricao: "O congresso, o público-alvo e os pré-requisitos",
      },
      {
        rotulo: "Comissões",
        href: "/comissoes",
        descricao: "Quem constrói o III ConEsquemas",
      },
      {
        rotulo: "Exposição Comercial",
        href: "/exposicao-comercial",
        descricao: "Patrocínio, apoio e espaço de expositores",
      },
      {
        rotulo: "Local",
        href: "/local-do-evento",
        descricao: "RioMar Eventos, Recife e dicas de turismo",
      },
    ],
  },
  { rotulo: "Palestrantes", href: "/palestrantes" },
  {
    rotulo: "Programações",
    href: "/programacao",
    filhos: [
      {
        rotulo: "Programação Completa",
        href: "/programacao",
        descricao: "Grade dos três dias de congresso",
      },
      {
        rotulo: "Minicursos",
        href: "/minicursos",
        descricao: "Gratuitos e exclusivos para inscritos",
      },
    ],
  },
  { rotulo: "Submissões", href: "/submissoes" },
  { rotulo: "Inscrições", href: "/inscricoes" },
  {
    rotulo: "Edições anteriores",
    href: siteEdicao2026,
    externo: true,
    filhos: [
      {
        rotulo: "II ConEsquemas · 2026",
        href: siteEdicao2026,
        descricao: "Palestrantes, programação e galeria da edição de 2026",
        externo: true,
      },
    ],
  },
  { rotulo: "Monitoria", href: "/monitoria" },
  { rotulo: "FAQ", href: "/faq" },
  { rotulo: "Contato", href: "/contato" },
];
