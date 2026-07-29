import type { Metadata } from "next";
import { Botao, Card, ListaFlor, PageHero, Section, SectionTitle } from "@/components/ui";
import { evento } from "@/data/evento";
import { minicursos, minicursosInfo } from "@/data/minicursos";
import { siteEdicao2026 } from "@/data/navegacao";

export const metadata: Metadata = {
  title: "Programação",
  description:
    "Programação do III ConEsquemas 2027 — 29 e 30 de abril e 01 de maio, no RioMar Eventos, Recife/PE.",
};

export default function Programacao() {
  return (
    <>
      <PageHero
        rotulo="Programação"
        titulo="Três dias de prática viva"
        descricao={`${evento.datas.rotulo} · ${evento.local.nome}, ${evento.local.cidade}/${evento.local.uf}. Certificado com ${evento.cargaHoraria.congresso}.`}
      />

      <Section>
        <div className="rounded-2xl border border-dashed border-plum-200 bg-plum-50/60 px-6 py-8">
          <p className="eyebrow mb-2">Em breve</p>
          <h2 className="text-xl text-brand-800">
            A programação científica ainda será divulgada
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-600">
            O cronograma com data, horário e local de cada conferência, mesa e
            apresentação será publicado no site oficial e deverá ser
            rigorosamente observado pelos autores. Acompanhe o site e nossas
            redes oficiais para não perder a divulgação.
          </p>
        </div>

        <div className="mt-10">
          <SectionTitle
            rotulo="O que já está definido"
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
            A organização reserva-se o direito de alterar a programação
            (horários, palestrantes e temas), sempre que necessário, por motivos
            de força maior, garantindo a qualidade científica do evento. O
            horário das palestras será definido pela comissão organizadora.
          </p>
        </div>
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
