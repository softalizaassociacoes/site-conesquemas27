/**
 * Programação completa do II ConEsquemas (23 a 25 de abril de 2026).
 * Preservada na seção "Edição Anterior", conforme orientação do cliente.
 */

export type Atividade = {
  horario: string;
  titulo: string;
  pessoas?: string;
  nota?: string;
  tipo?: "intervalo" | "cerimonia" | "minicurso" | "credenciamento";
};

export type Trilha = { nome: string; atividades: Atividade[] };
export type DiaProgramacao = {
  id: string;
  rotulo: string;
  data: string;
  trilhas: Trilha[];
};

export const programacao2026: DiaProgramacao[] = [
  {
    id: "quinta",
    rotulo: "Quinta-feira",
    data: "23 de abril de 2026",
    trilhas: [
      {
        nome: "Minicursos e abertura",
        atividades: [
          {
            horario: "A partir 12:00h",
            titulo: "Credenciamento dos minicursos",
            tipo: "credenciamento",
          },
          {
            horario: "13:00h às 16:00h",
            titulo:
              "MINICURSO: Terapia do Esquema para os Transtornos de Personalidade do Cluster C",
            pessoas: "Paula Guths",
            nota: "Auditório 1 | Inscrição mediante pagamento",
            tipo: "minicurso",
          },
          {
            horario: "13:00h às 16:00h",
            titulo:
              "MINICURSO: Filhos em Construção, Pais em Reforma: A Terapia do Esquema como Caminho para Orientação Parental e Prevenção",
            pessoas: "Patrícia Noleto",
            nota: "Auditório 2 | Inscrição mediante pagamento",
            tipo: "minicurso",
          },
          {
            horario: "A partir 16:00h",
            titulo: "Credenciamento geral",
            tipo: "credenciamento",
          },
          {
            horario: "17:00h às 18:00h",
            titulo: "Cerimônia de abertura",
            tipo: "cerimonia",
          },
        ],
      },
      {
        nome: "Auditório 1",
        atividades: [
          {
            horario: "18:00h às 18:50h",
            titulo:
              "Foco na emoção: O uso de técnicas vivenciais para acessar e ressignificar esquemas",
            pessoas: "Kelly Paim",
          },
          {
            horario: "19:00h às 19:50h",
            titulo: "Tempestade em Copo D'alma: E quando a Voz Crítica me maltrata?",
            pessoas: "Rodrigo Trapp",
          },
          {
            horario: "20:00h às 21:00h",
            titulo:
              "Conexão que transforma: intervenção prática para romper o ciclo esquemático",
            pessoas: "Ana Rizzon & Ana Carla Gameleira",
          },
          {
            horario: "21:00h às 21:40h",
            titulo: "🥂 Coquetel de abertura",
            nota: 'Foyer | Lançamento do livro "Técnicas de cadeira em terapia do esquema" com Rodrigo Trapp',
            tipo: "intervalo",
          },
        ],
      },
    ],
  },
  {
    id: "sexta",
    rotulo: "Sexta-feira",
    data: "24 de abril de 2026",
    trilhas: [
      {
        nome: "Auditório 1",
        atividades: [
          {
            horario: "A partir 07:30h",
            titulo: "Credenciamento geral",
            tipo: "credenciamento",
          },
          {
            horario: "08:30h às 09:20h",
            titulo:
              '"E por falar em saudade, onde anda você?" — Quando o Adulto Saudável vive o nunca mais',
            pessoas: "Vanina Cartaxo",
          },
          {
            horario: "09:30h às 10:30h",
            titulo:
              "Reflexos: como a criança e o adolescente que você foi impactam na relação terapêutica das crianças e adolescentes que atende hoje",
            pessoas: "Ana Gameleira",
          },
          {
            horario: "10:30h às 11:00h",
            titulo: "☕ Intervalo — coffee break",
            nota: 'Foyer | Lançamento do livro "O Encontro" (Vanina Cartaxo) e "O meu EU de tantos NÓS" (Lívia Freitas)',
            tipo: "intervalo",
          },
          {
            horario: "11:00h às 11:50h",
            titulo:
              "Eu aqui com você: Autenticidade, Presença e Self Involving na Reparação em TE",
            pessoas: "Aline Kristensen",
          },
          {
            horario: "12:00h às 13:00h",
            titulo:
              "Quando as coisas ficam difíceis: uma nova maneira de confrontar empaticamente os chamados 'clientes hipercompensadores'",
            pessoas: "Eckard Roediger",
            nota: "Atividade remota",
          },
          {
            horario: "13:00h às 14:30h",
            titulo: "🍽️ Intervalo — almoço",
            tipo: "intervalo",
          },
          {
            horario: "14:30h às 16:00h",
            titulo:
              "Entre nós: O Que a Relação Terapêutica Revela Sobre o Funcionamento Individual e Conjugal",
            pessoas: "Adriana Maia & Aline Kristensen",
          },
          {
            horario: "16:10h às 17:00h",
            titulo:
              "Protetor Zangado: Um guia prático para intervir com o paciente que não quer conversar",
            pessoas: "Ana Rizzon",
          },
          {
            horario: "17:00h às 17:40h",
            titulo: "☕ Intervalo — coffee break",
            nota: 'Foyer | Lançamento do livro "Terapia do Esquema: Fundamentos, avaliação e estratégias" (Sérgio Morales)',
            tipo: "intervalo",
          },
          {
            horario: "17:40h às 18:30h",
            titulo:
              "O prêmio de melhor ator vai para… o Modo Pseudovulnerável: aprendendo a confrontá-lo",
            pessoas: "Rossana Andriola",
          },
          {
            horario: "18:40h às 19:30h",
            titulo:
              "Estratégias eficazes e afetuosas em Terapia do Esquema para a dependência química",
            pessoas: "Sergio Morales",
          },
          {
            horario: "19:40h às 20:25h",
            titulo:
              "Sessão especial Insere: Série Adolescência — uma análise clínica aplicada a Terapia do Esquema",
            pessoas: "Patrícia Nolêto, Sérgio Morales & Jacqueline Leão",
          },
        ],
      },
      {
        nome: "Auditório 2",
        atividades: [
          {
            horario: "08:30h às 09:20h",
            titulo:
              "Terapia do Esquema para Solteiros: Reescrevendo seu roteiro amoroso — da repetição à conexão real",
            pessoas: "Ana Clara Gomes Braga & Luiza Deslandes de Almeida",
          },
          {
            horario: "09:30h às 10:30h",
            titulo: "Luz, câmera, esquemas… Atendendo um personagem de This is Us",
            pessoas: "Rossana Andriola",
          },
          {
            horario: "10:30h às 11:00h",
            titulo: "☕ Intervalo — coffee break",
            tipo: "intervalo",
          },
          {
            horario: "11:00h às 11:50h",
            titulo:
              "Entre o hipercontrole e a vulnerabilidade: o manejo da ansiedade a partir da Terapia do Esquema",
            pessoas: "Flávia Rios",
          },
          {
            horario: "12:00h às 13:00h",
            titulo: "Atividade no Auditório 1",
          },
          {
            horario: "13:00h às 14:30h",
            titulo: "🍽️ Intervalo — almoço",
            tipo: "intervalo",
          },
          {
            horario: "14:30h às 16:00h",
            titulo:
              "Comportamento Alimentar e Sexual como Estratégias de Regulação Emocional: Um Estudo de Caso na Clínica da Terapia do Esquema",
            pessoas:
              "Luanna Ávila de Castro Gomes, Thássia Maria Soares Leão & Jéssica de Oliveira Araújo",
          },
          {
            horario: "16:10h às 17:00h",
            titulo:
              "Família eh, família ah, família: Psicoterapia familiar e terapia do esquema",
            pessoas: "Francesca Stephan",
          },
          {
            horario: "17:00h às 17:40h",
            titulo: "☕ Intervalo — coffee break",
            tipo: "intervalo",
          },
          {
            horario: "17:40h às 18:30h",
            titulo:
              "Quando a Evidência Encontra a Singularidade: Tensões, Inovação e Complexidade na Prática Clínica",
            pessoas: "Leopoldo Barbosa",
          },
          {
            horario: "18:40h às 20:25h",
            titulo: "Atividades no Auditório 1",
          },
        ],
      },
      {
        nome: "Apresentações de trabalhos",
        atividades: [
          {
            horario: "17:00h às 17:40h",
            titulo:
              "Técnica “Mergulhe na Raiva”: Inovação Experiencial na Terapia do Esquema para Romper Padrões de Esquiva Emocional",
            pessoas: "Melissa Gevezier Fioravante Vignoli",
          },
          {
            horario: "17:00h às 17:40h",
            titulo:
              "“Há vida após uma gaia?”: Manejo da infidelidade virtual na terapia de casal",
            pessoas: "Ilda Maria Moraes e Silva",
          },
          {
            horario: "17:00h às 17:40h",
            titulo: "Terapia do Esquema e violência: estudo qualitativo",
            pessoas: "Igor Carlos Cunha Mota",
          },
          {
            horario: "17:00h às 17:40h",
            titulo: "Fomentando o Modo Adulto Saudável no contexto escolar",
            pessoas: "Agnelo Pereira da Silva Junior",
          },
        ],
      },
    ],
  },
  {
    id: "sabado",
    rotulo: "Sábado",
    data: "25 de abril de 2026",
    trilhas: [
      {
        nome: "Auditório 1",
        atividades: [
          {
            horario: "A partir 07:30h",
            titulo: "Credenciamento geral",
            tipo: "credenciamento",
          },
          {
            horario: "08:30h às 09:20h",
            titulo:
              "Da magia à técnica: os artefatos de Harry Potter na prática da Terapia do Esquema",
            pessoas: "Patrícia Noleto",
          },
          {
            horario: "09:30h às 10:30h",
            titulo: "Técnicas de Cadeira: Os Quatro Diálogos em Terapia do Esquema",
            pessoas: "Rodrigo Trapp & Gabryelle Alves",
          },
          {
            horario: "10:30h às 11:00h",
            titulo: "☕ Intervalo — coffee break",
            nota: 'Foyer | Lançamento do livro "Manual de terapia de grupo PRISMAS" (Bruno Cardoso e Ana Clara Braga)',
            tipo: "intervalo",
          },
          {
            horario: "11:00h às 11:50h",
            titulo:
              "E quando a sociedade é internalizada?: identificando e intervindo sobre o modo crítico sociocultural opressor internalizado em pessoas LGBT+",
            pessoas: "Bruno Cardoso",
          },
          {
            horario: "12:00h às 13:00h",
            titulo:
              "Infidelidade e redes sociais: como trabalhar as relações quando a confiança e segurança são ameaçadas",
            pessoas: "Francesca Stephan",
          },
          {
            horario: "13:00h às 14:30h",
            titulo: "🍽️ Intervalo — almoço",
            tipo: "intervalo",
          },
          {
            horario: "14:30h às 16:00h",
            titulo:
              "Para além da criança zangada: trabalhando a raiva nos diferentes modos raivosos",
            pessoas: "Kelly Paim & Paula Guths",
          },
          {
            horario: "16:10h às 17:00h",
            titulo: "E quando o abuso parece amor?",
            pessoas: "Bruno Vianna",
          },
          {
            horario: "17:00h às 17:40h",
            titulo: "☕ Intervalo — coffee break",
            nota: "Foyer | Lançamento de livros com Jullyanna Cardoso e Leopoldo Barbosa",
            tipo: "intervalo",
          },
          {
            horario: "17:40h às 18:30h",
            titulo:
              "Do Espelho da Mãe ao Olhar para Si: Terapia do Esquema com Filhos de Mães Narcisistas",
            pessoas: "Jacqueline Leão",
          },
          {
            horario: "18:40h às 19:30h",
            titulo:
              "O trabalho com imagens conjuntas: intervenção interpessoal com casais e pais-filhos",
            pessoas: "Sergio Morales",
          },
          {
            horario: "18:40h às 19:30h",
            titulo: "Cerimônia de encerramento",
            tipo: "cerimonia",
          },
        ],
      },
      {
        nome: "Auditório 2",
        atividades: [
          {
            horario: "08:30h às 09:20h",
            titulo: "Falando sobre perdas: a TE no processo de acolhimento do luto",
            pessoas: "Katuryn Lara",
          },
          {
            horario: "09:30h às 10:30h",
            titulo:
              "Reconectar para Curar: diferenciando rupturas de feridas de apego na relação amorosa",
            pessoas: "Adriana Maia",
          },
          {
            horario: "10:30h às 11:00h",
            titulo: "☕ Intervalo — coffee break",
            tipo: "intervalo",
          },
          {
            horario: "11:00h às 11:50h",
            titulo: "Eu, meu TDAH e nosso combo imperfeito de esquemas",
            pessoas: "Vanina Cartaxo",
          },
          {
            horario: "12:00h às 13:00h",
            titulo:
              "Esquemas e Neurodivergência: como eu me sinto sobre mim e o quanto meu cérebro consegue colocar em prática",
            pessoas: "Gabryelle Alves",
          },
          {
            horario: "13:00h às 14:30h",
            titulo: "🍽️ Intervalo — almoço",
            tipo: "intervalo",
          },
          {
            horario: "14:30h às 16:00h",
            titulo:
              "MESA: Por trás dos sintomas: modos, esquemas e a face emocional da psicopatologia",
            pessoas: "Jullyanna Cardoso & Milena Gomes",
            nota: "Procrastinar, punir, fugir: quando os modos dominam o TDAH · Rigidez, proteção e afeto: o olhar esquemático sobre o autismo",
          },
          {
            horario: "16:10h às 17:00h",
            titulo:
              "Cuidando de quem cuida: A orientação de pais sob a lente da Terapia do Esquema",
            pessoas: "Ana Raphaela Novaes",
          },
          {
            horario: "17:00h às 17:40h",
            titulo: "☕ Intervalo — coffee break",
            tipo: "intervalo",
          },
          {
            horario: "17:40h às 18:30h",
            titulo: "Quando Aproximar Ameaça: o manejo clínico de pacientes evitativos",
            pessoas: "Paula Guths",
          },
          {
            horario: "18:40h às 19:30h",
            titulo: "Atividade no Auditório 1",
          },
        ],
      },
      {
        nome: "Apresentações de trabalhos",
        atividades: [
          {
            horario: "17:00h às 17:40h",
            titulo: "O estigma prediz escolhas amorosas?",
            pessoas: "Rafael Costa Coelho",
          },
          {
            horario: "17:00h às 17:40h",
            titulo: "Análise de modos esquemáticos forenses em homicidas",
            pessoas: "Igor Carlos Cunha Mota",
          },
          {
            horario: "17:00h às 17:40h",
            titulo: "Impacto dos esquemas em relacionamentos abusivos",
            pessoas: "Bruna Lisboa Martins de Souza",
          },
          {
            horario: "17:00h às 17:40h",
            titulo:
              "Como a personalidade e a química esquemática predizem comportamento infiel?",
            pessoas: "Raquel Brasil",
          },
        ],
      },
    ],
  },
];
