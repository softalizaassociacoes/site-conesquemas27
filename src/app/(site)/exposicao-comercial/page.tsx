import type { Metadata } from "next";
import { Botao, Card, ListaFlor, PageHero, Section, SectionTitle } from "@/components/ui";
import { evento } from "@/data/evento";
import { exposicaoComercial } from "@/data/institucional";

export const metadata: Metadata = {
  title: "Exposição Comercial",
  description:
    "Espaço para clínicas, editoras, empresas de testes psicológicos e recursos terapêuticos no III ConEsquemas 2027. Planos de patrocínio e apoio.",
};

export default function ExposicaoComercial() {
  return (
    <>
      <PageHero
        rotulo="Exposição Comercial"
        titulo="Sua marca no encontro da Terapia do Esquema"
        descricao={exposicaoComercial.intro}
      />

      <Section>
        <SectionTitle
          rotulo="Para os participantes"
          titulo="Uma excelente oportunidade para"
        />
        <ul className="grid gap-5 sm:grid-cols-2">
          {exposicaoComercial.oportunidades.map((item) => (
            <li key={item}>
              <Card className="h-full">
                <p className="flex gap-3 leading-relaxed text-brand-700">
                  <span className="text-rosa" aria-hidden="true">
                    ✿
                  </span>
                  {item}
                </p>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm leading-relaxed text-brand-600">
          Expositores interessados em participar podem solicitar informações
          detalhadas pelo e-mail{" "}
          <a
            href={`mailto:${evento.contato.email}`}
            className="font-semibold text-plum-500 underline underline-offset-4"
          >
            {evento.contato.email}
          </a>
          .
        </p>
      </Section>

      <Section fundo="areia">
        <SectionTitle
          rotulo="Patrocínio e apoio"
          titulo={`Seja um patrocinador ou apoiador do ${evento.nome}`}
          descricao={exposicaoComercial.patrocinioIntro}
        />
        <Card>
          <h2 className="text-lg text-brand-800">Oportunidades de exposição</h2>
          <div className="mt-4">
            <ListaFlor itens={[...exposicaoComercial.patrocinioItens]} />
          </div>
        </Card>
        <div className="mt-8">
          <Botao href={`mailto:${evento.contato.email}`} externo>
            📩 Conhecer os planos de patrocínio
          </Botao>
        </div>
      </Section>
    </>
  );
}
