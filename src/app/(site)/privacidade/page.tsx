import type { Metadata } from "next";
import EscolhaCookies from "@/components/EscolhaCookies";
import { PageHero, Section, SectionTitle } from "@/components/ui";
import { evento } from "@/data/evento";

/**
 * Política de privacidade.
 *
 * ATENÇÃO: este texto descreve exatamente o que o site faz hoje — cada
 * ferramenta citada existe no código, e nada que mede ficou de fora. Ainda
 * assim, ele PRECISA DE APROVAÇÃO DA ORGANIZAÇÃO antes de valer como documento
 * oficial: faltam a razão social, o CNPJ e o encarregado de dados (LGPD, art.
 * 41), que só o CEPPA pode informar.
 *
 * Ao mexer em qualquer medição do site, atualize esta página junto. Uma
 * política que descreve o que o site fazia mês passado é pior que nenhuma.
 */

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "O que o site do III ConEsquemas 2027 mede, quem mede, para quê, por quanto tempo e como revogar o consentimento.",
};

const ATUALIZADO_EM = "19 de novembro de 2026";

function Bloco({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-xl text-brand-800 sm:text-2xl">{titulo}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-brand-700">
        {children}
      </div>
    </section>
  );
}

function Tabela({
  colunas,
  linhas,
}: {
  colunas: string[];
  linhas: string[][];
}) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
        <thead>
          <tr>
            {colunas.map((c) => (
              <th
                key={c}
                scope="col"
                className="border border-brand-100 bg-brand-50 px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-brand-700"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha) => (
            <tr key={linha[0]}>
              {linha.map((celula, i) => (
                <td
                  key={`${linha[0]}-${i}`}
                  className="border border-brand-100 px-3 py-2.5 align-top text-brand-700"
                >
                  {celula}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Privacidade() {
  return (
    <>
      <PageHero
        rotulo="Privacidade"
        titulo="O que medimos, e o que você escolhe"
        descricao="Nenhuma medição acontece neste site antes de você aceitar. Esta página explica o que é medido depois do aceite, por quem, para quê e como voltar atrás."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-brand-500">
            Última atualização: {ATUALIZADO_EM}.
          </p>

          <Bloco titulo="Quem é responsável">
            <p>
              Este site é o do {evento.nomeCompleto}, realizado pela{" "}
              {evento.realizacao}. Dúvidas sobre privacidade, pedidos de acesso
              ou exclusão de dados podem ser enviados para{" "}
              <a
                href={`mailto:${evento.contato.email}`}
                className="font-semibold text-plum-600 underline underline-offset-4"
              >
                {evento.contato.email}
              </a>
              .
            </p>
          </Bloco>

          <Bloco titulo="Antes do seu aceite, nada é medido">
            <p>
              Na primeira visita aparece um aviso no rodapé da tela com duas
              opções, aceitar e recusar. Até você clicar em uma delas, o site
              não carrega nenhuma ferramenta de medição e nenhum dado seu sai
              daqui para o Google ou para a Meta.
            </p>
            <p>
              Se você recusar, continua assim: as ferramentas não são
              carregadas. Se aceitar, a escolha fica guardada no seu navegador e
              vale nas próximas visitas, sem precisar clicar de novo. A escolha
              é por navegador e por aparelho.
            </p>
          </Bloco>

          <Bloco titulo="O que é medido depois do aceite">
            <p>
              Duas ferramentas, de duas empresas diferentes, e as duas dependem
              do mesmo aceite.
            </p>

            <h3 className="pt-2 text-base font-semibold text-brand-800">
              Google Analytics 4
            </h3>
            <p>
              Registra as páginas visitadas, quanto tempo durou a visita, de
              onde o acesso veio (um link, uma busca, uma rede social), o tipo
              de aparelho e o navegador, e uma localização aproximada por cidade,
              deduzida do endereço de rede. Registra também alguns cliques, para
              sabermos quais caminhos funcionam: ida para a página de inscrição,
              ida para a área restrita, abertura do WhatsApp e do e-mail de
              contato. Desses cliques guardamos apenas que aconteceram e para
              onde levavam.
            </p>
            <p>
              A publicidade fica desligada em qualquer cenário: o site nunca
              concede ao Google as permissões de anúncio, de dados para anúncio
              nem de personalização, e por isso os dados daqui não alimentam
              campanhas do Google.
            </p>

            <h3 className="pt-2 text-base font-semibold text-brand-800">
              Meta Pixel (Facebook e Instagram)
            </h3>
            <p>
              Registra a visualização das páginas, o envio do formulário de
              interesse e a conclusão de uma inscrição, quando você chega à
              página de agradecimento. A Meta usa esses registros para medir o
              resultado dos anúncios do congresso e para formar públicos de
              divulgação nas redes dela.
            </p>

            <h3 className="pt-2 text-base font-semibold text-brand-800">
              Mapa do local do evento
            </h3>
            <p>
              A página do local do evento mostra um mapa do Google Maps embutido.
              Ele é parte do conteúdo da página, carrega junto com ela e, como
              qualquer conteúdo de terceiro, faz o Google receber o seu endereço
              de rede ao exibir o mapa. Nenhuma medição nossa passa por ele.
            </p>
          </Bloco>

          <Bloco titulo="Cookies usados">
            <p>
              Os cookies abaixo só são criados depois do aceite. Nenhum deles
              guarda nome, e-mail ou telefone.
            </p>
            <Tabela
              colunas={["Cookie", "De quem", "Para quê", "Validade"]}
              linhas={[
                [
                  "_ga",
                  "Google",
                  "Distinguir um navegador do outro na contagem de visitantes",
                  "2 anos",
                ],
                [
                  "_ga_<id da propriedade>",
                  "Google",
                  "Manter o estado da sessão de medição",
                  "2 anos",
                ],
                [
                  "_fbp",
                  "Meta",
                  "Ligar a visita a campanhas e públicos de anúncio",
                  "3 meses",
                ],
              ]}
            />
            <p>
              A sua escolha sobre os cookies não é um cookie: fica no
              armazenamento local do navegador, sob a chave{" "}
              <code className="rounded bg-brand-50 px-1.5 py-0.5 text-sm text-brand-800">
                conesquemas-consentimento
              </code>
              , e não é enviada para lugar nenhum.
            </p>
          </Bloco>

          <Bloco titulo="Dados que você digita">
            <p>
              O formulário de interesse pede nome, e-mail, telefone e categoria.
              Esses dados não passam pelas ferramentas de medição: são enviados
              por e-mail para a organização do congresso e usados para entrar em
              contato sobre o evento. Ficam guardados na caixa de e-mail da
              organização pelo tempo necessário a esse contato, e você pode
              pedir a exclusão a qualquer momento pelo endereço acima.
            </p>
            <p>
              A inscrição no congresso e a submissão de trabalhos acontecem em
              outro endereço, na plataforma de eventos da Softaliza. O que você
              preenche lá é tratado pela política daquela plataforma, não por
              esta.
            </p>
          </Bloco>

          <Bloco titulo="Por quanto tempo">
            <p>
              Os cookies vencem nos prazos da tabela acima e podem ser apagados
              a qualquer momento pelo seu navegador. Os relatórios ficam nas
              contas do Google Analytics e da Meta pertencentes à organização,
              pelo prazo de retenção configurado em cada uma dessas ferramentas.
              Os relatórios são números agregados: não há como identificar uma
              pessoa neles.
            </p>
          </Bloco>

          <Bloco titulo="Como revogar">
            <p>
              Você pode mudar de ideia quando quiser, e a qualquer momento. O
              botão abaixo apaga a sua escolha neste navegador, desliga a medição
              na hora e faz o aviso aparecer de novo, para você escolher outra
              vez.
            </p>
            <EscolhaCookies />
            <p>
              Apagar os cookies do site pelo próprio navegador tem o mesmo
              efeito. Você também pode usar o modo de navegação anônima, em que
              nada fica guardado entre visitas.
            </p>
          </Bloco>

          <Bloco titulo="Seus direitos">
            <p>
              A Lei Geral de Proteção de Dados garante a você confirmar se
              tratamos dados seus, acessá-los, corrigi-los, pedir a exclusão,
              revogar o consentimento e saber com quem foram compartilhados.
              Para exercer qualquer um desses direitos, escreva para{" "}
              <a
                href={`mailto:${evento.contato.email}`}
                className="font-semibold text-plum-600 underline underline-offset-4"
              >
                {evento.contato.email}
              </a>
              .
            </p>
          </Bloco>
        </div>
      </Section>

      <Section fundo="areia">
        <div className="mx-auto max-w-3xl">
          <SectionTitle
            rotulo="Resumo"
            titulo="Em uma frase"
            descricao="Sem o seu aceite, este site não mede nada. Com o aceite, mede o uso das páginas no Google Analytics e o resultado das campanhas no Meta Pixel, e você pode desfazer essa escolha a qualquer momento nesta página."
          />
        </div>
      </Section>
    </>
  );
}
