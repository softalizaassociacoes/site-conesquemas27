/**
 * Programação do III ConEsquemas (2027).
 *
 * Fonte: planilha "Programação do Congresso.xlsx", enviada pela organização em
 * 10/11/2026. É PRELIMINAR e será atualizada — por isso a página carrega o
 * aviso; ao substituí-la, manter o aviso enquanto a versão final não vier.
 *
 * Os textos saem da planilha sem qualquer edição: títulos, nomes e horários
 * são exatamente os recebidos, inclusive "Título a definir" e as variações de
 * grafia de alguns nomes. Divergência aqui é divergência na planilha, e quem
 * corrige é a organização.
 */

export type Atividade = {
  sala: string;
  tipo: string;
  palestrantes: string;
  titulo: string;
  /** Subitens, quando a planilha traz a atividade dividida em partes. */
  detalhes?: string[];
};

export type Faixa = { horario: string; atividades: Atividade[] };

export type DiaProgramacao = {
  /** Dia da semana, como na planilha. */
  dia: string;
  /** Data correspondente no calendário do evento. */
  data: string;
  faixas: Faixa[];
};

/** Sala usada pela planilha para marcar o que vale para todo o congresso. */
export const SALA_TODAS = "Todas";

/** Tipos que não são atividade científica e são exibidos como faixa simples. */
export const TIPOS_SEM_PALESTRANTE = ["Intervalo", "Encerramento"];

export const programacaoPreliminar: DiaProgramacao[] = [
  {
    dia: "Quinta",
    data: "29 de abril",
    faixas: [
      {
        horario: "18h00",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Palestra",
            palestrantes: "Giulia Altera",
            titulo: "Do Trauma ao Apego e à Conexão: Como a Terapia Focada nas Emoções da Dra. Sue Johnson Restaura e Integra o Self e os Vínculos",
          },
        ],
      },
      {
        horario: "19h00",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Palestra",
            palestrantes: "Rodrigo Trapp",
            titulo: "Título a definir",
          },
        ],
      },
      {
        horario: "20h00",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Palestra",
            palestrantes: "Bruno Reis",
            titulo: "Entre Canções e Esquemas",
          },
        ],
      },
    ],
  },
  {
    dia: "Sexta",
    data: "30 de abril",
    faixas: [
      {
        horario: "09h00 às 10h30",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Palestra",
            palestrantes: "Giulia Altera",
            titulo: "\"Demais\" para ser amada: Janis Joplin e a vergonha de precisar - A criança que grita por amor, o medo de ser \"demais\" e a integração do self na Terapia Focada nas Emoções (EFT)",
          },
          {
            sala: "Sala 02",
            tipo: "Dupla",
            palestrantes: "Kelly Paim e Rossana Andreola",
            titulo: "Quando a relação não é terapêutica: a química esquemática atuando no setting",
          },
          {
            sala: "Sala 03",
            tipo: "Trabalhos",
            palestrantes: "Trabalhos inscritos",
            titulo: "Apresentação de mesa",
          },
        ],
      },
      {
        horario: "10h30 às 11h00",
        atividades: [
          {
            sala: "Todas",
            tipo: "Intervalo",
            palestrantes: "",
            titulo: "Coffee",
          },
        ],
      },
      {
        horario: "11h00 às 12h00",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Palestra",
            palestrantes: "Vanina Cartaxo",
            titulo: "Ainda é Possível Dançar: O que A Bailarina de Auschwitz nos ensina sobre resiliência, liberdade emocional e reconstrução de si",
          },
          {
            sala: "Sala 02",
            tipo: "Palestra",
            palestrantes: "Johnatan Felipe",
            titulo: "Vias de corregulação entre parceiros na terapia de casal: o tipo de toque, o tom da voz e a proximidade física",
          },
          {
            sala: "Sala 03",
            tipo: "Trabalhos",
            palestrantes: "Trabalhos inscritos",
            titulo: "Apresentações orais",
          },
        ],
      },
      {
        horario: "12h00 às 13h30",
        atividades: [
          {
            sala: "Todas",
            tipo: "Intervalo",
            palestrantes: "",
            titulo: "Almoço",
          },
        ],
      },
      {
        horario: "13h30 às 15h00",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Mesa",
            palestrantes: "Adriana Lenzi, Jacqueline Leão e Daniela Schneider",
            titulo: "Terapia do esquema em ação: construindo intervenções a partir da conceitualização de um caso clínico",
          },
          {
            sala: "Sala 02",
            tipo: "Dupla",
            palestrantes: "Rossana Andriola e Aline Kristensen",
            titulo: "Necessidades emocionais ou expectativas impossíveis? Como validar necessidades sem prometer satisfação completa, trabalhando frustração e reciprocidade",
          },
          {
            sala: "Sala 03",
            tipo: "Trabalhos",
            palestrantes: "Trabalhos inscritos",
            titulo: "Apresentação de mesa",
          },
        ],
      },
      {
        horario: "15h10 às 16h00",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Palestra",
            palestrantes: "Ana Carla Gameleira",
            titulo: "Congelando as Emoções: Trabalhando a Privação Emocional sob a ótica de Frozen com Crianças e Adolescentes",
          },
          {
            sala: "Sala 02",
            tipo: "Palestra",
            palestrantes: "Katuryn Lara",
            titulo: "Quando a dor não vem sozinha: o impacto das vozes internalizadas no processo de luto",
          },
          {
            sala: "Sala 03",
            tipo: "Palestra",
            palestrantes: "Laís Carvalho",
            titulo: "O dinheiro vai à sessão: modos de enfrentamento e necessidades emocionais na relação com o dinheiro",
          },
        ],
      },
      {
        horario: "16h00 às 16h30",
        atividades: [
          {
            sala: "Todas",
            tipo: "Intervalo",
            palestrantes: "",
            titulo: "Coffee (apresentação de pôsteres no saguão)",
          },
        ],
      },
      {
        horario: "16h30 às 17h30",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Dupla",
            palestrantes: "Rodrigo Trapp e Gabryelle Alves",
            titulo: "Título a definir",
          },
          {
            sala: "Sala 02",
            tipo: "Patrocinador",
            palestrantes: "Patrocinador",
            titulo: "Título a definir",
          },
          {
            sala: "Sala 03",
            tipo: "Dupla",
            palestrantes: "Bruno Vianna e Flávia Rios",
            titulo: "Entre a desconexão e a subjugação - Intervindo nos modos de enfrentamento em relacionamentos disfuncionais",
          },
        ],
      },
      {
        horario: "17h40 às 18h30",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Conferência",
            palestrantes: "Karen Szupszynski",
            titulo: "Título a definir",
          },
          {
            sala: "Sala 02",
            tipo: "Mesa",
            palestrantes: "Francesca, Walkyria e Mel",
            titulo: "Nem tudo o que reluz é ouro - Aquilo que vemos é suficiente para identificarmos um modo?",
          },
          {
            sala: "Sala 03",
            tipo: "Palestra",
            palestrantes: "Walkyria Ribeiro",
            titulo: "Entre o vazio e o prato, para onde o terapeuta deve olhar? Terapia do Esquema de Duplo Foco nos Transtornos Alimentares",
          },
        ],
      },
      {
        horario: "18h40 às 19h30",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Conferência",
            palestrantes: "Margareth Oliveira",
            titulo: "Título a definir",
          },
          {
            sala: "Sala 02",
            tipo: "Palestra",
            palestrantes: "Ana Clara",
            titulo: "Términos em relações modernas",
          },
          {
            sala: "Sala 03",
            tipo: "Palestra",
            palestrantes: "Melissa Fioravante",
            titulo: "Técnica \"Mergulhe na Raiva\": uma proposta experiencial inédita para romper padrões de inibição e esquiva",
          },
        ],
      },
    ],
  },
  {
    dia: "Sábado",
    data: "01 de maio",
    faixas: [
      {
        horario: "09h00 às 10h30",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Dupla",
            palestrantes: "Natanna Schultz e Ângelis Dantas",
            titulo: "Informar Não É Tratar: O erro na orientação parental que faz os pais atacarem o terapeuta",
          },
          {
            sala: "Sala 02",
            tipo: "Dupla",
            palestrantes: "Gabryelle Alves e Jullyanna Cardoso",
            titulo: "Neurodivergência na Terapia do Esquema: necessidades, esquemas e modos",
            detalhes: [
              "1) A neurodivergência pela lente da Terapia do Esquema: implicações clínicas (Gabryelle Alves)",
              "2) Quando o diagnóstico vira acusação: vergonha, medo de falhar e Crítico Punitivo no TDAH adulto (Jullyanna Cardoso)",
            ],
          },
          {
            sala: "Sala 03",
            tipo: "Trabalhos",
            palestrantes: "Trabalhos inscritos",
            titulo: "Apresentação de mesa",
          },
        ],
      },
      {
        horario: "10h30 às 11h00",
        atividades: [
          {
            sala: "Todas",
            tipo: "Intervalo",
            palestrantes: "",
            titulo: "Coffee",
          },
        ],
      },
      {
        horario: "11h00 às 12h00",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Conferência",
            palestrantes: "Renata Brasil",
            titulo: "Título a definir",
          },
          {
            sala: "Sala 02",
            tipo: "Palestra",
            palestrantes: "Bruno Vianna",
            titulo: "Construindo um Adulto Saudável que Resgate a Criança Vulnerável do Abuso",
          },
          {
            sala: "Sala 03",
            tipo: "Trabalhos",
            palestrantes: "Trabalhos inscritos",
            titulo: "Apresentações orais",
          },
        ],
      },
      {
        horario: "12h00 às 13h30",
        atividades: [
          {
            sala: "Todas",
            tipo: "Intervalo",
            palestrantes: "",
            titulo: "Almoço",
          },
        ],
      },
      {
        horario: "13h30 às 15h00",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Mesa",
            palestrantes: "Kelly Paim, Paula Guths e Bruno Cardoso",
            titulo: "Técnicas Vivenciais: Integrando Emoção, Experiência e Mudança",
          },
          {
            sala: "Sala 02",
            tipo: "Dupla",
            palestrantes: "Aline Kristensen e Margareth Oliveira",
            titulo: "Título a definir",
          },
          {
            sala: "Sala 03",
            tipo: "Trabalhos",
            palestrantes: "Trabalhos inscritos",
            titulo: "Apresentação de mesa",
          },
        ],
      },
      {
        horario: "15h10 às 16h00",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Dupla",
            palestrantes: "Giulia Altera e Ana Rizzon",
            titulo: "Entregando o Escudo: Traição, Feridas de Apego e a Travessia da Dor - A reparação depois da traição lida por duas terapeutas, na Terapia Focada nas Emoções (EFT) e na Terapia do Esquema",
          },
          {
            sala: "Sala 02",
            tipo: "Palestra",
            palestrantes: "Vanessa Eletherio",
            titulo: "O passado não muda - a experiência sim: a reescrita de imagens na TE",
          },
          {
            sala: "Sala 03",
            tipo: "Conferência",
            palestrantes: "Karen Szupszynski",
            titulo: "Título a definir",
          },
        ],
      },
      {
        horario: "16h00 às 16h30",
        atividades: [
          {
            sala: "Todas",
            tipo: "Intervalo",
            palestrantes: "",
            titulo: "Coffee (apresentação de pôsteres no saguão)",
          },
        ],
      },
      {
        horario: "16h30 às 17h30",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Palestra",
            palestrantes: "Francesca Stephan",
            titulo: "Quando o lado crítico domina a relação íntima: cuidados na terapia de casal e família",
          },
          {
            sala: "Sala 02",
            tipo: "Patrocinador",
            palestrantes: "Patrocinador",
            titulo: "Título a definir",
          },
          {
            sala: "Sala 03",
            tipo: "Dupla",
            palestrantes: "Ana Clara Gomes e Luísa Deslandes",
            titulo: "Antes que a conversa vire briga - Ferramentas práticas para melhorar a comunicação do casal e interromper a escalada dos conflitos",
          },
        ],
      },
      {
        horario: "17h40 às 18h30",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Palestra",
            palestrantes: "Natanna Schultz",
            titulo: "Reformando e decorando a sua casa interna e a dos seus pacientes",
          },
          {
            sala: "Sala 02",
            tipo: "Dupla",
            palestrantes: "Paula Guths e Jacqueline Leão",
            titulo: "O mesmo modo, diferentes feridas: compreendendo e intervindo no modo autoengrandecedor",
          },
          {
            sala: "Sala 03",
            tipo: "Patrocinador",
            palestrantes: "Patrocinador",
            titulo: "Título a definir",
          },
        ],
      },
      {
        horario: "18h40 às 19h30",
        atividades: [
          {
            sala: "Sala 01",
            tipo: "Palestra",
            palestrantes: "Ana Rizzon",
            titulo: "\"Concordou, agradeceu e não mudou nada.\" Como intervir diante do Capitulador Complacente",
          },
          {
            sala: "Sala 01",
            tipo: "Encerramento",
            palestrantes: "",
            titulo: "Evento de encerramento",
          },
        ],
      },
    ],
  },
];
