/**
 * Valores e lotes do III ConEsquemas 2027.
 * Fonte: Guia ConEsquemas, páginas 27 a 30.
 */

export type Lote = {
  rotulo: string;
  valor: number;
  periodo: string;
  destaque?: boolean;
};

export type CategoriaInscricao = {
  id: string;
  titulo: string;
  descricao: string;
  lotes: Lote[];
};

const periodos = {
  lote00: "07/08 (13h) a 08/08/2026 (13h)",
  lote01: "08/08/2026 (13:01) a 30/09/2026",
  lote02: "01/10 a 30/11/2026",
  lote03: "01/12/2026 a 28/02/2027",
  lote04: "01/03/2027 até esgotarem as vagas",
};

export const categorias: CategoriaInscricao[] = [
  {
    id: "graduacao",
    titulo: "Estudante de Graduação",
    descricao:
      "Exige comprovante atualizado de matrícula no ato da inscrição.",
    lotes: [
      { rotulo: "Lote 00", valor: 634.75, periodo: periodos.lote00, destaque: true },
      { rotulo: "Lote 01", valor: 846.33, periodo: periodos.lote01 },
      { rotulo: "Lote 02", valor: 926.33, periodo: periodos.lote02 },
      { rotulo: "Lote 03", valor: 1006.33, periodo: periodos.lote03 },
      { rotulo: "Lote 04", valor: 1086.33, periodo: periodos.lote04 },
    ],
  },
  {
    id: "pos-graduacao",
    titulo: "Estudante de Pós-Graduação",
    descricao:
      "Lato sensu, mestrado, doutorado e pós-doutorado, mediante comprovante.",
    lotes: [
      { rotulo: "Lote 00", valor: 709.75, periodo: periodos.lote00, destaque: true },
      { rotulo: "Lote 01", valor: 946.33, periodo: periodos.lote01 },
      { rotulo: "Lote 02", valor: 1046.33, periodo: periodos.lote02 },
      { rotulo: "Lote 03", valor: 1146.33, periodo: periodos.lote03 },
      { rotulo: "Lote 04", valor: 1246.33, periodo: periodos.lote04 },
    ],
  },
  {
    id: "profissionais",
    titulo: "Profissionais",
    descricao:
      "Psicólogos, terapeutas e demais profissionais da saúde e educação.",
    lotes: [
      { rotulo: "Lote 00", valor: 784.75, periodo: periodos.lote00, destaque: true },
      { rotulo: "Lote 01", valor: 1046.33, periodo: periodos.lote01 },
      { rotulo: "Lote 02", valor: 1166.33, periodo: periodos.lote02 },
      { rotulo: "Lote 03", valor: 1286.33, periodo: periodos.lote03 },
      { rotulo: "Lote 04", valor: 1406.33, periodo: periodos.lote04 },
    ],
  },
];

export const formasPagamento = [
  "Cartão de crédito — parcelamento em até 6x sem juros",
  "PIX à vista",
];

export const observacoesInscricao = [
  "O Lote Zero terá duração de apenas 24 horas, com desconto exclusivo de 25% sobre o 1º lote.",
  "As inscrições só serão confirmadas após o pagamento.",
  "Para categorias estudantis, será obrigatório apresentar comprovante atualizado de matrícula no ato da inscrição.",
  "Inscrições com documentação pendente serão automaticamente reclassificadas para a categoria Profissional.",
];

export const atencaoInscricoes = [
  "As vagas para o III ConEsquemas são limitadas e podem se esgotar antes do prazo final de inscrições.",
  "A garantia da vaga está condicionada à confirmação do pagamento da taxa de inscrição.",
  "Em caso de esgotamento das vagas, terão prioridade as inscrições já pagas e finalizadas.",
  "Inscrições com pendência de pagamento serão automaticamente canceladas caso o limite seja atingido.",
  "Cada categoria possui um número específico de vagas, podendo, portanto, se encerrar antes das demais.",
];

export const comprovacaoCategoria = {
  intro:
    "Para as categorias Estudantes de Graduação e Estudantes de Pós-Graduação (pós lato sensu, mestrado, doutorado e pós-doutorado), será obrigatória a apresentação de documento comprobatório válido. Serão aceitos:",
  itens: [
    "Carteirinha de estudante (frente e verso) com validade no ano vigente;",
    "Declaração de matrícula ou frequência emitida, assinada e carimbada pela instituição referente ao semestre atual;",
    "Boleto de mensalidade quitado, referente ao semestre vigente.",
  ],
  aviso: "Toda documentação deve ser emitida no ano/semestre atual.",
};

export const reembolso = {
  intro:
    "Em caso de comunicação e justificativa formal de desistência de participação, a devolução de valores pagos será efetuada até 45 dias após a realização do evento.",
  regras: [
    {
      justificativa: "Desistência de compra (arrependimento)",
      prazo: "Até 7 dias corridos após o pagamento",
      valor: "100% do valor pago",
    },
    {
      justificativa: "Sem justificativa",
      prazo: "Até 30 dias antes do início do congresso",
      valor: "50% do valor pago",
    },
    {
      justificativa: "Problemas de saúde (com atestado médico nominal)",
      prazo: "Até 48 horas antes do início do congresso",
      valor: "80% do valor pago ou transferência da inscrição",
    },
    {
      justificativa: "Duplicidade de pagamento",
      prazo: "Até 48 horas antes do início do congresso",
      valor: "100% do valor pago",
    },
  ],
  documentacao: [
    "Sem justificativa — solicitação formal para o e-mail oficial + cópia do comprovante de pagamento.",
    "Problemas de saúde — solicitação formal para o e-mail oficial + atestado médico informando a impossibilidade do(a) congressista comparecer ao evento + cópia do comprovante de pagamento.",
    "Duplicidade de pagamento — solicitação formal para o e-mail oficial + cópias dos comprovantes de pagamento.",
    "Desistência de compra em até 7 dias após o pagamento — solicitação formal para o e-mail oficial + cópia do comprovante de pagamento.",
  ],
  observacoes: [
    "Cada participante pode realizar apenas uma inscrição por CPF.",
    "A inscrição é nominal e só poderá ser transferida a outra pessoa até 48 horas antes do início do congresso, mediante solicitação formal por meio do formulário oficial disponibilizado pela organização.",
    "Em caso de ressarcimento, o cadastro não será excluído do sistema, impossibilitando a realização de uma nova inscrição com o mesmo CPF.",
    "Congressistas que efetuarem o pagamento da inscrição e, posteriormente, receberem patrocínio de laboratório ou cortesia, terão direito apenas ao reembolso conforme regra de desistência sem justificativa, ou seja, 50% do valor pago.",
    "Não haverá reembolso para inscrições realizadas com erro de categoria ou com falta de documentação comprobatória.",
  ],
};

export function formatarBRL(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
