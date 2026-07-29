/**
 * Perguntas frequentes do III ConEsquemas 2027.
 * Fonte: Guia ConEsquemas, páginas 18 a 22.
 */

export type Pergunta = { pergunta: string; resposta: string[] };
export type GrupoFAQ = { titulo: string; perguntas: Pergunta[] };

export const faq: GrupoFAQ[] = [
  {
    titulo: "Inscrições e valores",
    perguntas: [
      {
        pergunta: "Como faço para me inscrever no evento?",
        resposta: [
          "As inscrições são realizadas exclusivamente pelo site oficial do congresso. Basta preencher corretamente os dados solicitados, escolher sua categoria e efetuar o pagamento.",
        ],
      },
      {
        pergunta: "Posso me registrar no local do evento?",
        resposta: [
          "Não. As inscrições devem ser realizadas antecipadamente pelo site oficial. As vagas são limitadas, por isso recomendamos garantir sua participação com antecedência.",
        ],
      },
      {
        pergunta: "O congresso terá lotes com valores diferentes?",
        resposta: [
          "Sim. As inscrições funcionam por lotes, e os valores aumentam a cada novo lote. Quanto antes você garantir sua vaga, melhor a condição.",
        ],
      },
      {
        pergunta: "Quais formas de pagamento são aceitas?",
        resposta: [
          "Aceitamos cartão de crédito em até 6x sem juros e Pix à vista. Consulte no ato da inscrição as condições de parcelamento disponíveis.",
        ],
      },
      {
        pergunta: "O que está incluído na inscrição?",
        resposta: [
          "A inscrição dá direito a acesso a toda a programação científica do congresso, ao minicurso escolhido no ato da inscrição (sujeito à disponibilidade de vagas), ao certificado de participação e ao material do evento.",
        ],
      },
      {
        pergunta: "Quem pode se inscrever como estudante?",
        resposta: [
          "Estudantes de graduação e pós-graduação (especialização, mestrado e doutorado), mediante apresentação de comprovante atualizado de matrícula. Caso o documento não seja apresentado, a inscrição será automaticamente reclassificada para a categoria profissional.",
        ],
      },
    ],
  },
  {
    titulo: "Cancelamento, reembolso e transferência",
    perguntas: [
      {
        pergunta: "Como funciona o cancelamento e reembolso da inscrição?",
        resposta: [
          "Até 7 dias corridos após a compra: reembolso integral.",
          "Até 30 dias antes do evento: reembolso de 50% do valor pago.",
          "Até 48 horas antes do evento, por motivos de saúde comprovados com atestado médico nominal: reembolso de 80% ou possibilidade de transferência da inscrição.",
          "Em caso de duplicidade de pagamento: reembolso de 100%, desde que solicitado até 48 horas antes do congresso.",
          "As solicitações devem ser enviadas para conesquemas@ceppape.com.br. Importante: após o prazo de 48 horas que antecede o evento, não haverá devolução ou transferência.",
        ],
      },
      {
        pergunta: "Posso transferir minha inscrição para outra pessoa?",
        resposta: [
          "Sim. A transferência é permitida até 48 horas antes do início do evento, mediante solicitação formal para conesquemas@ceppape.com.br.",
          "Caso a categoria do(a) beneficiário(a) seja diferente da original (ex.: estudante para profissional), será cobrada a diferença de valor.",
        ],
      },
    ],
  },
  {
    titulo: "Formato e local",
    perguntas: [
      {
        pergunta: "O evento será presencial? Haverá transmissão online?",
        resposta: [
          "O III ConEsquemas será 100% presencial, realizado no RioMar Eventos (RioMar Recife, Pisos L3 e L4: Av. República do Líbano, 251, Pina, Recife, PE).",
        ],
      },
      {
        pergunta:
          "O local é acessível para pessoas com deficiência ou mobilidade reduzida?",
        resposta: [
          "Sim. O RioMar Eventos conta com estrutura acessível, com elevadores e acesso adaptado. Em caso de necessidade específica, entre em contato conosco previamente pelo conesquemas@ceppape.com.br para que possamos acolher da melhor forma.",
        ],
      },
      {
        pergunta: "Haverá estacionamento e alimentação no local?",
        resposta: [
          "O RioMar Recife dispõe de estacionamento próprio (pago) e ampla praça de alimentação, além das opções de coffee break previstas na programação do congresso.",
        ],
      },
    ],
  },
  {
    titulo: "Trabalhos científicos e editais",
    perguntas: [
      {
        pergunta: "Quais modalidades de trabalho posso submeter?",
        resposta: [
          "O III ConEsquemas recebe trabalhos científicos nas modalidades comunicação oral, mesa e pôster, com editais específicos para cada uma.",
        ],
      },
      {
        pergunta: "Preciso estar inscrito para submeter meu trabalho?",
        resposta: [
          "Sim. Para submissão de pôster ou comunicação oral, basta que pelo menos um dos autores esteja inscrito no congresso. Para submissão de mesa, todos os autores participantes devem estar inscritos.",
        ],
      },
      {
        pergunta: "Se eu enviar um trabalho, preciso participar do congresso?",
        resposta: [
          "Sim. O envio de trabalhos está vinculado à inscrição, e os autores exigidos por cada modalidade deverão participar do congresso.",
        ],
      },
      {
        pergunta: "Como funciona a aprovação dos trabalhos?",
        resposta: [
          "A aprovação seguirá critérios definidos pela comissão científica, sendo indispensável o cumprimento dos prazos e normas de submissão.",
        ],
      },
      {
        pergunta: "Se meu trabalho for aprovado, receberei certificado?",
        resposta: [
          "Sim. Os trabalhos aprovados e apresentados receberão certificado de apresentação vinculado ao nome dos autores que estiverem regularmente inscritos.",
        ],
      },
      {
        pergunta: "Quando os editais serão divulgados e onde acompanhar?",
        resposta: [
          "Os editais de comunicação oral, mesa, pôster e monitoria serão publicados no site oficial do congresso, cada um com suas regras, prazos e critérios próprios. Acompanhe o site e nossas redes oficiais para não perder as aberturas e os prazos.",
        ],
      },
    ],
  },
  {
    titulo: "Minicursos e monitoria",
    perguntas: [
      {
        pergunta: "Como funcionam os minicursos?",
        resposta: [
          "Os minicursos são gratuitos e exclusivos para inscritos no congresso. Conferem certificado próprio e devem ser escolhidos no ato da inscrição. As vagas são limitadas pela capacidade da sala, portanto estão sujeitas à disponibilidade e são preenchidas por ordem de inscrição. Após a escolha, não é possível trocar de minicurso.",
        ],
      },
      {
        pergunta: "Como funciona a monitoria no III ConEsquemas?",
        resposta: [
          "O congresso contará com uma equipe de monitores, selecionados por meio de edital específico. A monitoria é uma oportunidade de participar de perto da organização do evento, acompanhar as atividades científicas e vivenciar os bastidores de um congresso de Terapia do Esquema, com contrapartidas definidas no edital.",
        ],
      },
      {
        pergunta: "Quem pode se candidatar e onde encontro o edital?",
        resposta: [
          "Os requisitos, o número de vagas, as funções e as contrapartidas (como certificado de monitoria e eventuais condições de inscrição) serão detalhados no edital de monitoria, publicado no site oficial do congresso. Fique atento ao prazo de candidatura.",
        ],
      },
    ],
  },
  {
    titulo: "Certificados",
    perguntas: [
      {
        pergunta: "Como faço para obter meu certificado?",
        resposta: [
          "Os certificados digitais serão emitidos após o evento e disponibilizados online através do nosso site, mediante comprovação de presença. Certificados de minicursos também serão enviados pelo mesmo sistema.",
        ],
      },
      {
        pergunta: "Qual a carga horária do certificado de participação?",
        resposta: [
          "O certificado de participação terá carga horária total de 36 horas, correspondente à programação do congresso. Já o do minicurso será de 3 horas.",
        ],
      },
    ],
  },
  {
    titulo: "Público e conteúdo",
    perguntas: [
      {
        pergunta: "Para quem é o congresso?",
        resposta: [
          "O III ConEsquemas é voltado a psicólogos, estudantes de psicologia e demais profissionais e estudantes interessados na Terapia do Esquema, do iniciante ao experiente.",
        ],
      },
      {
        pergunta: "Preciso ter formação em Terapia do Esquema para participar?",
        resposta: [
          "Não. O congresso acolhe desde quem está tendo os primeiros contatos com a abordagem até quem já atua com Terapia do Esquema há anos. A programação é pensada para somar em diferentes níveis de experiência.",
        ],
      },
    ],
  },
  {
    titulo: "Hospedagem, passeios e contato",
    perguntas: [
      {
        pergunta: "Onde encontro informações sobre hospedagem e passeios?",
        resposta: [
          "O III ConEsquemas conta com a parceria da agência Hericahctour, especializada em hospedagem, transfers e passeios turísticos.",
          "Endereço: Avenida Santos Dumont, 2626, Aldeota, Fortaleza/CE, 60150-160. Telefone/WhatsApp: (84) 99115-2429.",
          "Com a Hericahctour, você pode reservar hospedagem em hotéis credenciados, transfers entre aeroporto, hotel e local do evento, e passeios turísticos em Recife, Olinda, Porto de Galinhas e Praia dos Carneiros.",
        ],
      },
      {
        pergunta: "Como recebo as informações e atualizações do congresso?",
        resposta: [
          "Todas as novidades, prazos e editais são divulgados no site oficial e nas nossas redes sociais. Em caso de dúvidas, fale com a organização pelo conesquemas@ceppape.com.br.",
        ],
      },
    ],
  },
];
