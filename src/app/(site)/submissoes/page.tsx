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
import {
  eixosTematicos,
  modalidades,
  prazosSubmissao,
  secoesEdital,
} from "@/data/edital";

export const metadata: Metadata = {
  title: "Submissões",
  description:
    "Edital de submissão de trabalhos científicos do III ConEsquemas 2027 — pôster, comunicação oral e mesa redonda.",
};

export default function Submissoes() {
  return (
    <>
      <PageHero
        rotulo="Submissões"
        titulo="Edital de Submissão de Trabalhos Científicos"
        descricao={`Normas para submissão, avaliação e apresentação de trabalhos no ${evento.nome}, a ser realizado nos dias ${evento.datas.rotulo}, no ${evento.local.nome}, em Recife, Pernambuco.`}
      />

      {/* Prazos */}
      <Section>
        <SectionTitle rotulo="5. Dos prazos" titulo="Cronograma" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {prazosSubmissao.map((p) => (
            <li key={p.rotulo}>
              <Card className="h-full">
                <p className="text-xs font-bold uppercase tracking-widest text-plum-500">
                  {p.rotulo}
                </p>
                <p className="mt-2 font-display text-lg text-brand-800">
                  {p.data}
                </p>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-brand-500">
          O descumprimento dos prazos e das normas de submissão implica o
          indeferimento automático do trabalho.
        </p>
      </Section>

      {/* Modalidades */}
      <Section fundo="areia">
        <SectionTitle
          rotulo="2. Das modalidades"
          titulo="Como você pode apresentar"
        />
        <ul className="grid gap-6 lg:grid-cols-3">
          {modalidades.map((m) => (
            <li key={m.titulo}>
              <Card className="h-full">
                <h3 className="text-xl text-brand-800">{m.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-500">
                  {m.resumo}
                </p>
                <div className="mt-5">
                  <ListaFlor itens={[...m.itens]} />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Eixos */}
      <Section>
        <SectionTitle
          rotulo="4.3. Eixos temáticos"
          titulo="Enquadre seu trabalho em um dos eixos"
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {eixosTematicos.map((eixo) => (
            <li
              key={eixo}
              className="flex items-start gap-3 rounded-xl border border-brand-100 bg-white px-5 py-4 text-sm leading-relaxed text-brand-700"
            >
              <span className="mt-0.5 text-rosa" aria-hidden="true">
                ✿
              </span>
              {eixo}
            </li>
          ))}
        </ul>
      </Section>

      {/* Demais seções do edital */}
      <Section fundo="lilas">
        <SectionTitle rotulo="Edital completo" titulo="Regras e disposições" />
        <div className="space-y-8">
          {secoesEdital.map((secao) => (
            <Card key={secao.titulo}>
              <h3 className="text-lg text-brand-800">{secao.titulo}</h3>
              <div className="mt-4 space-y-4">
                {secao.blocos.map((bloco, i) =>
                  Array.isArray(bloco) ? (
                    <ListaFlor key={i} itens={bloco} />
                  ) : (
                    <p key={i} className="text-sm leading-relaxed text-brand-600">
                      {bloco}
                    </p>
                  ),
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <AvisoDados>
            As submissões abrem em <strong>07/08/2026</strong>, pela área do
            congressista. O link será divulgado aqui e nas redes oficiais —
            lembrando que é preciso estar inscrito para submeter.
          </AvisoDados>
          <div className="mt-6">
            <Botao href="/inscricoes">Ver valores e lotes</Botao>
          </div>
        </div>
      </Section>
    </>
  );
}
