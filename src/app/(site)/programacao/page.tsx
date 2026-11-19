import type { Metadata } from "next";
import ProgramacaoGrade from "@/components/ProgramacaoGrade";
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
import { programacaoPreliminar } from "@/data/programacao";

export const metadata: Metadata = {
  title: "Programação",
  description:
    "Programação preliminar do III ConEsquemas 2027 — 29 e 30 de abril e 01 de maio, no RioMar Eventos, Recife/PE.",
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
        <AvisoDados>
          Esta é a <strong>programação preliminar</strong>. Horários, títulos e
          participantes ainda podem mudar até a divulgação da versão final.
        </AvisoDados>

        <div className="mt-10">
          <ProgramacaoGrade
            dias={programacaoPreliminar}
            ano={evento.ano}
          />
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
