/**
 * Edital de Submissão de Trabalhos Científicos — III ConEsquemas 2027.
 * Fonte: Guia ConEsquemas, páginas 37 a 41.
 */

export const prazosSubmissao = [
  { rotulo: "Abertura das submissões", data: "07/08/2026" },
  { rotulo: "Encerramento das submissões", data: "01/02/2027" },
  { rotulo: "Divulgação dos trabalhos aprovados", data: "28/02/2027" },
  {
    rotulo: "Envio dos ajustes solicitados pela comissão",
    data: "Até 72 horas a partir da comunicação ao autor",
  },
];

export const modalidades = [
  {
    titulo: "Pôster",
    resumo:
      "Pesquisas, relatos de caso, relatos de experiência ou revisões.",
    itens: [
      "Apresentação de até 10 minutos, incluindo arguição da comissão avaliadora.",
      "Tamanho padrão de 90 cm de largura por 120 cm de altura, em orientação retrato.",
      "O modelo de layout será enviado por e-mail aos autores dos trabalhos aprovados.",
      "O pôster deverá ser levado impresso pelo autor, sendo de sua responsabilidade a impressão e a fixação no local indicado pela organização.",
    ],
  },
  {
    titulo: "Comunicação oral",
    resumo:
      "Pesquisas concluídas ou em andamento, relatos e revisões, com discussão mais aprofundada.",
    itens: [
      "Apresentação de até 15 minutos, seguida do tempo de arguição definido pela comissão avaliadora.",
      "O modelo de slides será enviado por e-mail aos autores dos trabalhos aprovados.",
    ],
  },
  {
    titulo: "Mesa redonda",
    resumo: "Discussão de um tema central sob diferentes perspectivas.",
    itens: [
      "Composta por 4 profissionais, sendo um deles o coordenador. Duração total de 90 minutos.",
      "O coordenador organiza a submissão, propõe o tema, articula a mesa e também apresenta.",
      "Serão 4 apresentações no total, uma de cada componente, precedidas de uma breve apresentação dos palestrantes pelo coordenador. Não haverá tempo destinado a perguntas do público.",
      "Titulação mínima — Coordenador: mestre. Demais componentes: especialista.",
      "O modelo de slides será enviado por e-mail aos participantes das mesas aprovadas.",
    ],
  },
];

export const eixosTematicos = [
  "Fundamentos e avanços teóricos da Terapia do Esquema",
  "Terapia do Esquema na clínica com adultos",
  "Terapia do Esquema com crianças e adolescentes",
  "Terapia do Esquema com casais e famílias",
  "Terapia do Esquema em grupos",
  "Técnicas vivenciais e prática clínica",
  "Terapia do Esquema e transtornos específicos",
  "Terapia Cognitivo Comportamental: teoria, técnicas e evidências",
  "Interfaces entre a Terapia do Esquema e a Terapia Cognitivo Comportamental",
  "Avaliação, pesquisa e evidências em Terapia do Esquema e TCC",
  "Formação, supervisão e o self do terapeuta",
  "Interfaces com outras abordagens e áreas",
];

export type SecaoEdital = { titulo: string; blocos: (string | string[])[] };

export const secoesEdital: SecaoEdital[] = [
  {
    titulo: "3. Da autoria e da inscrição",
    blocos: [
      "A submissão de trabalhos está vinculada à inscrição no congresso, conforme as regras de cada modalidade:",
      [
        "Pôster e comunicação oral: pelo menos um dos autores deverá estar regularmente inscrito no congresso.",
        "Mesa redonda: todos os participantes (coordenador e componentes) deverão estar regularmente inscritos no congresso.",
      ],
      "O envio do trabalho não substitui a inscrição no evento. Os autores exigidos por cada modalidade deverão comparecer e realizar a apresentação presencialmente.",
    ],
  },
  {
    titulo: "4. Das normas de submissão",
    blocos: [
      "4.1. As submissões serão realizadas exclusivamente pelo site oficial do congresso, diretamente na área do participante, dentro dos prazos estabelecidos neste edital. Para submeter, o participante deverá estar inscrito e acessar a sua área de congressista. No caso da mesa redonda, todos os componentes já devem estar inscritos no momento da submissão.",
      "4.2. Cada trabalho deverá ser enviado com título, nome completo dos autores, titulação e vínculo institucional, modalidade pretendida, eixo temático e resumo, observadas as seguintes regras de anexação:",
      [
        "Pôster e comunicação oral: anexar um único resumo.",
        "Mesa redonda: anexar um resumo geral da mesa e, além dele, os 4 resumos individuais (um de cada componente), totalizando 5 resumos anexados separadamente.",
      ],
      "4.4. O resumo deverá conter entre 250 e 500 palavras, estruturado em introdução, objetivos, método, resultados (parciais ou finais) e considerações finais, além de 3 a 5 palavras-chave. Relatos de experiência e revisões deverão adequar a estrutura à sua natureza. É de responsabilidade dos autores a revisão ortográfica, gramatical e de conteúdo, bem como a observância dos aspectos éticos exigidos para pesquisas com seres humanos, quando aplicável.",
      "4.5. Cada participante poderá submeter e apresentar, no máximo, um pôster, uma comunicação oral e uma mesa redonda, respeitado o limite de um trabalho por modalidade.",
      "4.6. O não cumprimento de qualquer das regras deste edital implica a desclassificação automática do trabalho.",
    ],
  },
  {
    titulo: "6. Da avaliação",
    blocos: [
      "6.1. Os trabalhos serão avaliados pela comissão científica do congresso, segundo critérios de relevância, adequação ao tema, consistência metodológica, clareza e contribuição para a área.",
      "6.2. A avaliação é soberana, e das decisões da comissão científica não caberá recurso.",
      "6.3. A comissão poderá sugerir a alteração da modalidade do trabalho, mediante comunicação aos autores.",
    ],
  },
  {
    titulo: "7. Da apresentação",
    blocos: [
      "7.1. O cronograma com data, horário e local de cada apresentação será divulgado no site oficial e deverá ser rigorosamente observado pelos autores.",
      "7.2. Os recursos audiovisuais disponíveis para as apresentações orais e mesas serão informados previamente.",
      "7.3. O não comparecimento para a apresentação, sem justificativa aceita pela organização, implica a perda do direito ao certificado do trabalho.",
    ],
  },
  {
    titulo: "8. Da certificação",
    blocos: [
      "Os trabalhos aprovados e efetivamente apresentados receberão certificado de apresentação, vinculado ao nome dos autores que estiverem regularmente inscritos no congresso. Os certificados digitais serão disponibilizados após o evento, pelo site oficial.",
    ],
  },
  {
    titulo: "9. Das disposições finais",
    blocos: [
      "9.1. A submissão do trabalho implica a aceitação integral dos termos deste edital e autoriza a organização a divulgar o título e os autores nos materiais oficiais do congresso, bem como a publicar o resumo nos anais do evento, quando houver.",
      "9.2. Os casos omissos serão resolvidos pela comissão científica do III ConEsquemas.",
      "9.3. Dúvidas devem ser encaminhadas para conesquemas@ceppape.com.br.",
    ],
  },
];
