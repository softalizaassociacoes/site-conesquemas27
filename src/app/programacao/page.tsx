import type { Metadata } from "next";
import {
  AvisoDados,
  Botao,
  Card,
  ListaFlor,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { evento } from "@/data/evento";
import { minicursos, minicursosInfo } from "@/data/minicursos";
import { siteEdicao2026 } from "@/data/navegacao";
import {
  SALA_TODAS,
  programacaoPreliminar,
  type Atividade,
  type Faixa,
} from "@/data/programacao";

export const metadata: Metadata = {
  title: "Programação",
  description:
    "Programação preliminar do III ConEsquemas 2027 — 29 e 30 de abril e 01 de maio, no RioMar Eventos, Recife/PE.",
};

/**
 * Colunas conforme o tamanho da faixa. Uma atividade sozinha ocupa a linha
 * inteira: num grid de três colunas ela ficaria espremida à esquerda, com dois
 * vãos vazios ao lado.
 */
function colunas(total: number) {
  if (total === 1) return "";
  if (total === 2) return "md:grid-cols-2";
  return "md:grid-cols-2 xl:grid-cols-3";
}

function CartaoAtividade({ atividade }: { atividade: Atividade }) {
  return (
    <li className="h-full rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className="rounded-full bg-plum-50 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-plum-600">
          {atividade.sala}
        </span>
        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-brand-400">
          {atividade.tipo}
        </span>
      </div>

      <h4 className="mt-3 text-base leading-snug text-brand-800">
        {atividade.titulo}
      </h4>

      {atividade.detalhes && (
        <ul className="mt-2.5 space-y-1.5">
          {atividade.detalhes.map((detalhe) => (
            <li key={detalhe} className="text-sm leading-relaxed text-brand-600">
              {detalhe}
            </li>
          ))}
        </ul>
      )}

      {atividade.palestrantes && (
        <p className="mt-3 text-sm font-semibold text-plum-500">
          {atividade.palestrantes}
        </p>
      )}
    </li>
  );
}

/**
 * Intervalos valem para o congresso inteiro — é o que a planilha marca como
 * sala "Todas". Viram uma faixa larga, sem cartões: a largura já diz que
 * alcança todas as salas, então o rótulo da sala não precisa ser repetido.
 */
function FaixaIntervalo({ faixa }: { faixa: Faixa }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl bg-sand/60 px-5 py-3">
      <span className="font-display text-sm font-semibold tabular-nums text-brand-700">
        {faixa.horario}
      </span>
      {faixa.atividades.map((a) => (
        <span key={a.titulo} className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-[0.7rem] font-bold uppercase tracking-wider text-brand-400">
            {a.tipo}
          </span>
          <span className="text-sm text-brand-600">{a.titulo}</span>
        </span>
      ))}
    </div>
  );
}

export default function Programacao() {
  return (
    <>
      <PageHero
        rotulo="Programação"
        titulo="Três dias de prática viva"
        descricao={`${evento.datas.rotulo} · ${evento.local.nome}, ${evento.local.cidade}/${evento.local.uf}. Certificado com ${evento.cargaHoraria.congresso}.`}
      />

      <Section>
        <AvisoDados>
          Esta é a <strong>programação preliminar</strong>. Horários, títulos e
          participantes ainda podem mudar até a divulgação da versão final.
        </AvisoDados>

        <div className="mt-10 space-y-14">
          {programacaoPreliminar.map((dia) => (
            <div key={dia.dia}>
              <div className="mb-6 border-b border-brand-100 pb-4">
                <h2 className="text-2xl text-brand-800 sm:text-3xl">
                  {dia.dia}
                </h2>
                <p className="mt-1 text-sm font-semibold text-plum-500">
                  {dia.data}
                </p>
              </div>

              <div className="space-y-6">
                {dia.faixas.map((faixa) => {
                  const intervalo = faixa.atividades.every(
                    (a) => a.sala === SALA_TODAS,
                  );
                  if (intervalo) {
                    return <FaixaIntervalo key={faixa.horario} faixa={faixa} />;
                  }
                  return (
                    <div
                      key={faixa.horario}
                      className="grid gap-3 lg:grid-cols-[8.5rem_1fr] lg:gap-6"
                    >
                      <p className="font-display text-base font-semibold tabular-nums text-brand-700 lg:pt-1">
                        {faixa.horario}
                      </p>
                      <ul
                        className={`grid gap-4 ${colunas(faixa.atividades.length)}`}
                      >
                        {faixa.atividades.map((atividade) => (
                          <CartaoAtividade
                            key={`${atividade.sala}-${atividade.titulo}`}
                            atividade={atividade}
                          />
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section fundo="lilas">
        <SectionTitle
          rotulo="O que compõe o congresso"
          titulo="Modalidades da programação científica"
        />
        <ListaFlor
          itens={[
            "Conferências e mesas-redondas conduzidas por palestrantes convidados.",
            "Comunicações orais, mesas redondas e pôsteres aprovados pela comissão científica, conforme o edital de submissão.",
            "Minicursos, realizados uma única vez e escolhidos no ato da inscrição.",
            "Exposição Comercial, com clínicas, editoras, testes psicológicos, recursos terapêuticos e materiais ligados à prática clínica e acadêmica.",
          ]}
        />
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-brand-500">
          A organização reserva-se o direito de alterar a programação (horários,
          palestrantes e temas), sempre que necessário, por motivos de força
          maior, garantindo a qualidade científica do evento. O horário das
          palestras será definido pela comissão organizadora.
        </p>
      </Section>

      <Section fundo="areia">
        <SectionTitle
          rotulo="Minicursos"
          titulo="Gratuitos e exclusivos para inscritos"
          descricao={`Escolhidos no ato da inscrição, com certificado próprio de ${minicursosInfo.cargaHoraria}.`}
        />
        <ul className="grid gap-5 sm:grid-cols-3">
          {minicursos.map((mc) => (
            <li key={mc.slug}>
              <Card className="h-full">
                <h3 className="text-base leading-snug text-brand-800">
                  {mc.titulo}
                </h3>
                <p className="mt-3 text-sm font-semibold text-plum-500">
                  {mc.facilitadores.join(" · ")}
                </p>
              </Card>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Botao href="/minicursos" variante="secundario">
            Ver descrição dos minicursos
          </Botao>
          <Botao href={siteEdicao2026} externo variante="secundario">
            Ver a programação de 2026 ↗
          </Botao>
        </div>
      </Section>
    </>
  );
}
