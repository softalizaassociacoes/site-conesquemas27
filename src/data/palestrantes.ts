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

/**
 * Palestrantes do II ConEsquemas (2026) — preservados na seção Edição Anterior.
 */
export const palestrantes2026: Palestrante[] = [
  {
    slug: "sergio-morales",
    nome: "Dr. Sergio Morales",
    foto: "/images/edicao-anterior/palestrantes/dr-sergio-morales.jpg",
    bio: "Diretor Geral do Instituto Mexicano de Terapia do Esquema. Vice-presidente e Cofundador da Associação Latino-americana de Terapia do Esquema. Treinador, Certificador e Supervisor em Terapia do Esquema, em Terapia do Esquema para Casais e em Terapia do Esquema para Crianças e Adolescentes (ISST). Terapeuta Avançado em Terapia de Esquema em Grupo (ISST). Doutor em Capacitação e Docência. Autor do livro “Terapia do Esquema: Fundamentos, Avaliação e Estratégias de Intervenção para Terapeutas”.",
  },
  {
    slug: "ana-rizzon",
    nome: "Esp. Ana Rizzon",
    foto: "/images/edicao-anterior/palestrantes/esp-ana-rizzon.jpg",
    bio: "Psicóloga clínica e terapeuta de casais há 23 anos. Coordenadora e docente de cursos de Terapia do Esquema. Supervisora da prática clínica e escritora. Coautora do romance “Num sofá de bolinhas: amor & terapia” e organizadora do livro “Terapia do Esquema: base teórica e estratégias avançadas”.",
  },
  {
    slug: "rodrigo-trapp",
    nome: "Me. Rodrigo Trapp",
    foto: "/images/edicao-anterior/palestrantes/me-rodrigo-trapp.jpg",
    bio: "Terapeuta, Supervisor e Professor de Pós-Graduação. Psicólogo, mestre e doutorando pela UFRGS. Certificação Avançada Internacional em Terapia do Esquema Individual e Treinamento Avançado em Terapia do Esquema em Grupo pelo ISST (EUA). Certificação Níveis 1 e 2 em Chairwork Psychotherapy (NY/EUA).",
  },
  {
    slug: "patricia-noleto",
    nome: "Esp. Patrícia Noleto",
    foto: "/images/edicao-anterior/palestrantes/esp-patricia-noleto.jpg",
    bio: "Psicóloga, Supervisora Clínica e Educadora Parental. Coordenadora técnica do Insere Kids. Autora do livro “Filhos em Construção: as necessidades da criança pela Teoria do Esquema”. Especialista em Terapia Cognitivo-Comportamental na infância e adolescência. Formação em Terapia do Esquema e em EMDR.",
  },
  {
    slug: "aline-kristensen",
    nome: "Esp. Aline Kristensen",
    foto: "/images/edicao-anterior/palestrantes/esp-aline-kristensen.jpg",
    bio: "Psicóloga Clínica (PUCRS), com formação em TCC pelo Beck Institute (Philadelphia/USA). Terapeuta do Esquema com 20 anos de experiência clínica. Organizadora e autora do livro “A relação terapêutica nas psicoterapias cognitivo-comportamentais” (Artmed, 2024).",
  },
  {
    slug: "kelly-paim",
    nome: "Dra. Kelly Paim",
    foto: "/images/edicao-anterior/palestrantes/dra-kelly-paim.jpg",
    bio: "Formada em Psicologia (PUCRS), especialista em TCC e em Psicoterapia de Casal e Família. Mestre em Psicologia Clínica. Formação em Terapia do Esquema, com certificação internacional pela ISST. Sócia-fundadora e vice-presidente da ABTE.",
  },
  {
    slug: "bruno-luiz-avelino-cardoso",
    nome: "Dr. Bruno Luiz Avelino Cardoso",
    foto: "/images/edicao-anterior/palestrantes/dr-bruno-luiz-avelino-cardoso.jpg",
    bio: "Professor adjunto do Departamento de Psicologia e do PPG em Psicologia: Cognição e Comportamento da UFMG. Terapeuta certificado pela FBTC e Presidente da ABTE. Doutor em Psicologia pela UFSCar. Supervisor clínico e autor.",
  },
  {
    slug: "paula-guths",
    nome: "Ma. Paula Guths",
    foto: "/images/edicao-anterior/palestrantes/ma-paula-guths.jpg",
    bio: "Psicóloga graduada pela PUCRS (2003), cofundadora da Escola de Terapia do Esquema. Mestre em Psicologia Clínica (PUCRS, 2013). Membro pleno (Full Member) da ISST desde 2016.",
  },
  {
    slug: "francesca-stephan",
    nome: "Dra. Francesca Stephan",
    foto: "/images/edicao-anterior/palestrantes/dra-francesca-stephan.jpg",
    bio: "Mestre e Doutora em Psicologia (Processos Psicossociais e Saúde) pela UFJF. Pesquisadora CNPq. Psicóloga clínica com especialização em Terapia da Família e Casal. Membro da ATC-MG e da ABTE.",
  },
  {
    slug: "jacqueline-leao",
    nome: "Ma. Jacqueline Leão",
    foto: "/images/edicao-anterior/palestrantes/ma-jacqueline-leao.jpg",
    bio: "Diretora do Insere Psicologia e Educação. Psicóloga clínica, Mestre em Sociologia e Especialista em Psicologia Jurídica. Secretária-geral da ASLATES. Terapeuta e Supervisora advanced certificada pela ISST.",
  },
  {
    slug: "ana-carla-gameleira",
    nome: "Esp. Ana Carla Gameleira",
    foto: "/images/edicao-anterior/palestrantes/esp-ana-carla-gameleira.jpg",
    bio: "Psicóloga infantojuvenil e autora de livros e recursos terapêuticos. Terapeuta do Esquema pelo Insere. Formação em Terapia do Esquema na Infância e Adolescência (ISST — Alemanha).",
  },
  {
    slug: "rossana-andriola",
    nome: "Esp. Rossana Andriola",
    foto: "/images/edicao-anterior/palestrantes/esp-rossana-andriola.jpg",
    bio: "Psicóloga, Especialista em TCC. Terapeuta e Supervisora do Esquema certificada pela ISST. Sócia fundadora da Valência Psicologia Cognitiva.",
  },
  {
    slug: "adriana-lenzi-maia",
    nome: "Esp. Adriana Lenzi Maia",
    foto: "/images/edicao-anterior/palestrantes/esp-adriana-lenzi-maia.jpg",
    bio: "Psicóloga clínica. Psicoterapeuta, professora e supervisora no Instituto Insere, no IPTC e no ITPC. Terapeuta do Esquema certificada pela ISST, com formação em Terapia Comportamental Dialética (Linehan Institute).",
  },
  {
    slug: "bruno-vianna-de-menezes",
    nome: "Esp. Bruno Vianna de Menezes",
    foto: "/images/edicao-anterior/palestrantes/esp-bruno-vianna-de-menezes.jpg",
    bio: "Psicólogo Clínico (UNICAP), com 15 anos de prática. Terapeuta Cognitivo-Comportamental e Terapeuta do Esquema, com foco em relacionamentos abusivos.",
  },
  {
    slug: "thassia-maria-soares-leao",
    nome: "Esp. Thássia Maria Soares Leão",
    foto: "/images/edicao-anterior/palestrantes/esp-thassia-maria-soares-leao.jpg",
    bio: "Graduada em Psicologia (CESMAC, 2009). Formação em Terapia do Esquema (Insere, 2019). Especialização em Avaliação Psicológica (Ipog, 2021). Idealizadora do projeto “Esquematiza Psi”.",
  },
  {
    slug: "jessica-de-oliveira-araujo",
    nome: "Esp. Jéssica de Oliveira Araújo",
    foto: "/images/edicao-anterior/palestrantes/esp-jessica-de-oliveira-araujo.jpg",
    bio: "Graduada em Psicologia (UNIT, 2019). Formação em Terapia do Esquema (Insere, 2019), TCC (Neuropsi, 2021) e Supervisão Clínica (Wainer, 2023).",
  },
  {
    slug: "luanna-avila",
    nome: "Luanna Ávila",
    foto: "/images/edicao-anterior/palestrantes/luanna-avila.jpg",
    bio: "Graduada em Psicologia. Formação em Terapia do Esquema (Insere, 2019), TCC (Neuropsi, 2021) e Supervisão Clínica (Wainer, 2023). Pós-graduação em Comportamento Alimentar (IPGS).",
  },
  {
    slug: "vanina-cartaxo",
    nome: "Esp. Vanina Cartaxo",
    foto: "/images/edicao-anterior/palestrantes/esp-vanina-cartaxo.jpg",
    bio: "Psicóloga Clínica. Especialista em TCC. Terapeuta do Esquema (Wainer Psicologia). Escritora de 25 livros na área.",
  },
  {
    slug: "katuryn-lara",
    nome: "Esp. Katuryn Lara",
    foto: "/images/edicao-anterior/palestrantes/esp-katuryn-lara.jpg",
    bio: "Psicóloga e Supervisora Clínica. Especialista em TCC. Formação em Psicoterapia do Luto e em Terapia do Esquema. Criadora do projeto @falandosobreperdas.",
  },
  {
    slug: "luiza-deslandes-de-almeida",
    nome: "Esp. Luiza Deslandes de Almeida",
    foto: "/images/edicao-anterior/palestrantes/esp-luiza-deslandes-de-almeida.jpg",
    bio: "Psicóloga (PUC MG), com ênfase em atendimento clínico. Pós-graduada em Sexualidade Humana. Formação em Terapia do Esquema para Casais (ITPC — MA) e em Terapia do Esquema (MPTE).",
  },
  {
    slug: "ana-clara-gomes",
    nome: "Ma. Ana Clara Gomes",
    foto: "/images/edicao-anterior/palestrantes/ma-ana-clara-gomes.jpg",
    bio: "Psicóloga pela UFMG, mestre em Psicologia: Cognição e Comportamento (UFMG). Especialista em TCC (PUCRS). Formação em Terapia do Esquema (Wainer/ISST) e Terapia do Esquema para Casais (ITPC).",
  },
  {
    slug: "flavia-rios",
    nome: "Ma. Flávia Rios",
    foto: "/images/edicao-anterior/palestrantes/ma-flavia-rios.jpg",
    bio: "Psicóloga Clínica pela UNICAP com 15 anos de atuação. Mestrado em Psicologia pela UFPE. Formação em Terapia do Esquema — Insere Psicologia / ASLATES. Coordenadora da Comissão de Eventos da ATCPE.",
  },
  {
    slug: "jullyanna-cardoso",
    nome: "Ma. Jullyanna Cardoso",
    foto: "/images/edicao-anterior/palestrantes/ma-jullyanna-cardoso.jpg",
    bio: "Mestra em Psicologia da Saúde pela FPS-PE. Pós-graduada em Terapia Cognitivo-Comportamental e em Terapia do Esquema pela PUC-PR. Sócia-diretora do Centro Pernambucano de Psicologia Aplicada (CEPPA). Presidente do ConEsquemas.",
  },
  {
    slug: "leopoldo-barbosa",
    nome: "Dr. Leopoldo Barbosa, Ph.D.",
    foto: "/images/edicao-anterior/palestrantes/dr-leopoldo-barbosa.jpg",
    bio: "Psicólogo pela Universidade Estadual da Paraíba. Mestrado em Psicologia Clínica pela UNICAP e Doutorado em Neuropsiquiatria e Ciências do Comportamento pela UFPE. Pós-doutorado pela UFRN. Coordenador do Mestrado Profissional em Psicologia da Saúde da FPS.",
  },
  {
    slug: "milena-gomes",
    nome: "Esp. Milena Gomes",
    foto: "/images/edicao-anterior/palestrantes/esp-milena-gomes.jpg",
    bio: "Psicóloga, Terapeuta do Esquema e mestranda em Psicologia da Saúde pela FPS. Especialista em Terapia Cognitivo-Comportamental pela PUC-PR e Neuropsicóloga pela Esuda.",
  },
  {
    slug: "gabryelle-alves",
    nome: "Esp. Gabryelle Alves",
    foto: "/images/edicao-anterior/palestrantes/esp-gabryelle-alves.jpg",
    bio: "Psicóloga Clínica e Neuropsicóloga (CRP 15/6549). Formação em Terapia do Esquema pelo INSERE. Especialista em Neuropsicologia pelo IPOG. Certificação nível 1 em Chairwork Psychotherapy.",
  },
  {
    slug: "ana-raphaela-novaes",
    nome: "Esp. Ana Raphaela Novaes",
    foto: "/images/edicao-anterior/palestrantes/esp-ana-raphaela-novaes.jpg",
    bio: "Psicóloga pela UFAL. Diretora da Clínica CRIAR — Desenvolvimento Infantil. Psicóloga Clínica há 18 anos. Formação em Terapia do Esquema e Terapia de Casais pelo INSERE. Certificação em Educação Parental (PDA/USA).",
  },
];
