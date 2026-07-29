export type Palestrante = {
  slug: string;
  nome: string;
  /** Vazio quando a organização ainda não enviou o mini-currículo. */
  bio?: string;
  foto?: string;
};

/**
 * Palestrantes do III ConEsquemas (2027).
 * Fotos oficiais enviadas pelo cliente em public/images/palestrantes.
 * As biografias marcadas como ausentes aguardam envio da organização.
 */
export const palestrantes2027: Palestrante[] = [
  {
    slug: "aline-kristensen",
    nome: "Esp. Aline Kristensen",
    foto: "/images/palestrantes/Aline Kristensen.png",
    bio: "Psicóloga Clínica (PUCRS), com formação em TCC pelo Beck Institute (Philadelphia/USA). Especialista em Psicoterapia Cognitivo-Comportamental (WP) e em Terapia Individual Sistêmica (CEFI-POA). Terapeuta do Esquema com 20 anos de experiência clínica. Pesquisadora, professora e supervisora na temática da Relação Terapêutica em cursos de pós-graduação no Brasil. Organizadora e autora do livro “A relação terapêutica nas psicoterapias cognitivo-comportamentais: prática clínica e aspectos transteóricos” (Artmed, 2024). Criadora do @relacaoterapeuticabrasil.",
  },
  {
    slug: "aline-reis",
    nome: "Aline Reis",
    foto: "/images/palestrantes/Aline Reis.png",
  },
  {
    slug: "ana-clara-gomes",
    nome: "Ma. Ana Clara Gomes",
    foto: "/images/palestrantes/Ana Clara Gomes.png",
    bio: "Psicóloga pela UFMG, mestre em Psicologia: Cognição e Comportamento (UFMG). Professora de pós-graduação em Terapia de Casal e Psicologia dos Relacionamentos em diversas instituições. Especialista em TCC (PUCRS). Formação em Terapia Cognitiva Sexual, Terapia do Esquema (Wainer/ISST), Terapia do Esquema para Casais (ITPC) e Mindfulness (NUMI).",
  },
  {
    slug: "ana-carla-gameleira",
    nome: "Esp. Ana Carla Gameleira",
    foto: "/images/palestrantes/Ana Gameleira.png",
    bio: "Psicóloga infantojuvenil e autora de livros e recursos terapêuticos. Psicoterapeuta Cognitivo-Comportamental (Beck Institute) e Terapeuta do Esquema pelo Insere. Formação em Terapia do Esquema na Infância e Adolescência (ISST — Alemanha). Especialista em TCC na Infância e Adolescência (Intcc — RS) e em Transtornos Alimentares (Uniara — SP). Foco de trabalho em dificuldades alimentares. Formação em TCC (NuAPC/Uncisal) e Ludoterapia. Educadora Parental (PDA — USA).",
  },
  {
    slug: "ana-rizzon",
    nome: "Esp. Ana Rizzon",
    foto: "/images/palestrantes/Ana Rizzon.png",
    bio: "Psicóloga clínica e terapeuta de casais há 23 anos. Coordenadora e docente de cursos de Terapia do Esquema. Supervisora da prática clínica e escritora. É coautora do romance “Num sofá de bolinhas: amor & terapia” e organizadora do livro “Terapia do Esquema: base teórica e estratégias avançadas”. Especialista em Gestalt-Terapia, pós-graduada em Psicoterapia Sistêmica Familiar (UNISINOS) e em Terapia Cognitivo-Comportamental (UFRGS), e Especialista em Terapia do Esquema pela Wainer Psicologia.",
  },
  {
    slug: "bruno-cardoso",
    nome: "Dr. Bruno Luiz Avelino Cardoso",
    foto: "/images/palestrantes/Bruno Cardoso.png",
    bio: "Professor adjunto do Departamento de Psicologia e do PPG em Psicologia: Cognição e Comportamento da UFMG. Terapeuta certificado pela FBTC e Presidente da ABTE. Treinamento em ensino e supervisão de TCC pelo Beck Institute (EUA). Doutor em Psicologia pela UFSCar, com sanduíche na Pennsylvania State University (FAPESP). Mestre pela UFMA. Especialista em TCC (Instituto WP) e em Sexualidade Humana (Child Behavior Institute of Miami). Formação em Terapia do Esquema (Wainer/NYC Institute for Schema Therapy) e em Terapia do Esquema para Casais (ITPC).",
  },
  {
    slug: "bruno-reis",
    nome: "Bruno Reis",
    foto: "/images/palestrantes/Bruno Reis.png",
    bio: "Autor do livro “Terapia Cognitivo-Comportamental para a População Negra”. Conduz o minicurso “Terapia do Esquema Culturalmente Sensível e Brasileira”, articulando pesquisas atuais sobre o povo brasileiro com a experiência de percorrer diferentes regiões do país conhecendo distintas práticas psicológicas e as demandas específicas de cada contexto.",
  },
  {
    slug: "bruno-vianna",
    nome: "Esp. Bruno Vianna de Menezes",
    foto: "/images/palestrantes/Bruno Vianna.png",
    bio: "Psicólogo Clínico (UNICAP), com 15 anos de prática. Terapeuta Cognitivo-Comportamental e Terapeuta do Esquema, com foco em relacionamentos abusivos. Atuação também como Terapeuta de Grupo para transtornos de personalidade há mais de 15 anos em instituições terapêuticas. Professor convidado de cursos de especialização em TCC.",
  },
  {
    slug: "flavia-rios",
    nome: "Ma. Flávia Rios",
    foto: "/images/palestrantes/Flávia rios.png",
    bio: "Psicóloga Clínica pela Universidade Católica de Pernambuco (UNICAP) com 15 anos de atuação na área de saúde mental e clínica. Mestrado em Psicologia pela UFPE com ênfase em Processos Sociointerativos e Desenvolvimento Humano. Especialista em Terapia Cognitivo-Comportamental pela FAFIRE. Formação em Terapia do Esquema — Insere Psicologia / ASLATES. Coordenadora da Comissão de Eventos da ATCPE. Professora de pós-graduações em TCC e Supervisora Clínica.",
  },
  {
    slug: "francesca-stephan",
    nome: "Dra. Francesca Stephan",
    foto: "/images/palestrantes/Francesca Stephan.png",
    bio: "Mestre e Doutora em Psicologia (Processos Psicossociais e Saúde) pela UFJF. Pesquisadora CNPq, membro do NEVAS (Violência e Ansiedade Social). Psicóloga clínica com especialização em Terapia da Família e Casal e formação em TCC, Terapia Cognitiva Sexual, Terapia do Esquema (incluindo para Casais) e Supervisão Clínica. Professora universitária. Membro da ATC-MG e da ABTE. Mais de 21 anos de experiência clínica com família, casal, grupos e comunidades.",
  },
  {
    slug: "gabryelle-alves",
    nome: "Esp. Gabryelle Alves",
    foto: "/images/palestrantes/Gabryelle Alves.png",
    bio: "Psicóloga Clínica e Neuropsicóloga (CRP 15/6549). Formação em Terapia do Esquema pelo INSERE. Especialista em Neuropsicologia pelo IPOG. Certificação nível 1 em Chairwork Psychotherapy. Formação em Análise do Comportamento Aplicada ao Transtorno do Espectro Autista, Psicoterapia Infantil e Psicodiagnóstico Infantojuvenil.",
  },
  {
    slug: "johnatan-felipe",
    nome: "Johnatan Felipe",
    foto: "/images/palestrantes/Johnatan Felipe.png",
  },
  {
    slug: "karen-szupszynski",
    nome: "Karen Szupszynski",
    foto: "/images/palestrantes/Karen Szupszynski.png",
  },
  {
    slug: "katuryn-lara",
    nome: "Esp. Katuryn Lara",
    foto: "/images/palestrantes/Katuryn Lara.png",
    bio: "Psicóloga e Supervisora Clínica. Especialista em TCC. Formação em Psicoterapia do Luto e em Terapia do Esquema. Criadora do projeto @falandosobreperdas, com foco no atendimento de pessoas enlutadas.",
  },
  {
    slug: "kelly-paim",
    nome: "Dra. Kelly Paim",
    foto: "/images/palestrantes/Kelly Paim.png",
    bio: "Formada em Psicologia (PUCRS), especialista em TCC e em Psicoterapia de Casal e Família. Mestre em Psicologia Clínica. Formação em Terapia do Esquema, com certificação internacional pela ISST. Professora e supervisora de pós-graduação. Coautora dos livros “Sua História de Amor” e “Armadilhas da Química Amorosa”. Organizadora dos livros “Terapia Cognitiva Focada em Esquemas”, “Terapia do Esquema para Casais”, “TCCs para Casais e Famílias” e “Terapia do Esquema no Cinema”. Sócia-fundadora e vice-presidente da ABTE.",
  },
  {
    slug: "luiza-deslandes",
    nome: "Esp. Luiza Deslandes de Almeida",
    foto: "/images/palestrantes/Luiza Deslandes.png",
    bio: "Psicóloga (PUC MG), com ênfase em atendimento clínico. Atua com terapia individual e de casais. Pós-graduada em Sexualidade Humana (Faculdade Santa Casa BH). Formação em Terapia do Esquema para Casais (ITPC — MA) e em Terapia do Esquema (MPTE — Ana Rizzon). Interesses: conjugalidade, sexualidade, relações interpessoais, transtornos ansiosos, autoconhecimento e habilidades sociais.",
  },
  {
    slug: "margareth-oliveira",
    nome: "Margareth Oliveira",
    foto: "/images/palestrantes/Margareth Oliveira.png",
  },
  {
    slug: "melissa-fioravante",
    nome: "Melissa Fioravante",
    foto: "/images/palestrantes/Melissa Fioravante.png",
  },
  {
    slug: "natanna-schutz",
    nome: "Natanna Schutz",
    foto: "/images/palestrantes/Natanna Schutz.png",
  },
  {
    slug: "paula-guths",
    nome: "Ma. Paula Guths",
    foto: "/images/palestrantes/Paula Guths.png",
    bio: "Psicóloga graduada pela PUCRS (2003), cofundadora da Escola de Terapia do Esquema. Especialista em Psicoterapia Cognitivo-Comportamental (UNISINOS, 2005). Mestre em Psicologia Clínica (PUCRS, 2013). Formação em Terapia dos Esquemas (Wainer Psicologia Cognitiva / NYC Institute for Schema Therapy, 2015). Membro pleno (Full Member) da ISST desde 2016. Experiência em atendimento clínico individual desde 2005.",
  },
  {
    slug: "renata-brasil",
    nome: "Renata Brasil",
    foto: "/images/palestrantes/Renata Brasil.png",
  },
  {
    slug: "rodrigo-trapp",
    nome: "Me. Rodrigo Trapp",
    foto: "/images/palestrantes/Rodrigo Trapp.png",
    bio: "Terapeuta, Supervisor e Professor de Pós-Graduação. Psicólogo, mestre e doutorando pela UFRGS. Certificação Avançada Internacional em Terapia do Esquema Individual e Treinamento Avançado em Terapia do Esquema em Grupo pelo Schema Therapy Institute Midwest Indianapolis — ISST (EUA). Certificação Níveis 1 e 2 em Chairwork Psychotherapy (NY/EUA). Especialista em TCC, com formação em Terapia Cognitiva Processual. Autor de artigos e capítulos de livro sobre Terapia do Esquema.",
  },
  {
    slug: "rossana-andriola",
    nome: "Esp. Rossana Andriola",
    foto: "/images/palestrantes/Rossana Andriola.png",
    bio: "Psicóloga, Especialista em TCC. Terapeuta e Supervisora do Esquema certificada pela ISST. Sócia fundadora da Valência Psicologia Cognitiva. Professora convidada em diversos cursos de formação e especialização em Terapia do Esquema. Organizadora do primeiro livro brasileiro em Terapia do Esquema: “Terapia Cognitiva Focada em Esquemas: Integração em Psicoterapia”.",
  },
  {
    slug: "vanina-cartaxo",
    nome: "Esp. Vanina Cartaxo",
    foto: "/images/palestrantes/Vanina Cartaxo.png",
    bio: "Psicóloga Clínica. Especialista em TCC. Terapeuta do Esquema (Wainer Psicologia). Especialista em Terapia Cognitivo-Comportamental / CINTEP-PB. Escritora de 25 livros na área.",
  },
];
