export type ItemNav = {
  rotulo: string;
  href: string;
  filhos?: { rotulo: string; href: string; descricao?: string }[];
};

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
      {
        rotulo: "Edição Anterior",
        href: "/edicao-anterior",
        descricao: "Reviva o II ConEsquemas (2026)",
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
  { rotulo: "Certificados", href: "/certificados" },
  { rotulo: "Monitoria", href: "/monitoria" },
  { rotulo: "FAQ", href: "/faq" },
  { rotulo: "Contato", href: "/contato" },
];
