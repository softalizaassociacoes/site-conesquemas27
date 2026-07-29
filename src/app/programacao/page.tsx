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

const estrutura = [
  {
    dia: "Quinta-feira",
    data: "29 de abril de 2027",
    itens: [
      "Credenciamento dos minicursos",
      `Minicursos (${minicursosInfo.horario})`,
      "Credenciamento geral",
      "Cerimônia de abertura",
      "Conferências de abertura e coquetel",
    ],
  },
  {
    dia: "Sexta-feira",
    data: "30 de abril de 2027",
    itens: [
      "Conferências magnas em dois auditórios",
      "Mesas-redondas e comunicações orais",
      "Apresentação de pôsteres",
      "Exposição comercial e lançamentos de livros",
    ],
  },
  {
    dia: "Sábado",
    data: "01 de maio de 2027",
    itens: [
      "Conferências magnas em dois auditórios",
      "Mesas-redondas e comunicações orais",
      "Apresentação de pôsteres",
      "Cerimônia de encerramento",
    ],
  },
];

export default function Programacao() {
  return (
    <>
      <PageHero
        rotulo="Programação"
        titulo="Três dias de prática viva"
        descricao={`${evento.datas.rotulo} · ${evento.local.nome}, ${evento.local.cidade}/${evento.local.uf}. Certificado com ${evento.cargaHoraria.congresso}.`}
      />

      <Section>
        <div className="mb-10 rounded-2xl border border-dashed border-plum-200 bg-plum-50/60 px-6 py-6">
          <p className="eyebrow mb-2">Em construção</p>
          <h2 className="text-xl text-brand-800">
            A grade completa será divulgada em breve
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-600">
            A comissão científica está finalizando os horários de cada
            conferência, mesa e apresentação. Abaixo você já encontra a estrutura
            dos três dias. Acompanhe o site e as redes oficiais para não perder a
            publicação.
          </p>
        </div>

        <ul className="grid gap-6 lg:grid-cols-3">
          {estrutura.map((dia) => (
            <li key={dia.dia}>
              <Card className="h-full">
                <p className="eyebrow mb-3">{dia.dia}</p>
                <h3 className="text-xl text-brand-800">{dia.data}</h3>
                <div className="mt-5">
                  <ListaFlor itens={dia.itens} />
                </div>
              </Card>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-brand-500">
          A organização reserva-se o direito de alterar a programação (horários,
          palestrantes e temas) por motivos de força maior, garantindo a qualidade
          científica do evento.
        </p>
      </Section>

      <Section fundo="areia">
        <SectionTitle
          rotulo="Minicursos"
          titulo="Abertura do congresso, na quinta-feira"
          descricao={`${minicursosInfo.data} · ${minicursosInfo.horario} · gratuitos e exclusivos para inscritos, com certificado de ${minicursosInfo.cargaHoraria}.`}
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
