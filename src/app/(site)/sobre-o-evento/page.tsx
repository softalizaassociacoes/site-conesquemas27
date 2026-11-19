import type { Metadata } from "next";
import { Botao, Card, ListaFlor, PageHero, Section, SectionTitle } from "@/components/ui";
import { evento } from "@/data/evento";
import {
  descricaoEvento,
  pilares,
  preRequisitos,
  publicoAlvo,
} from "@/data/institucional";

export const metadata: Metadata = {
  title: "Sobre o evento",
  description: descricaoEvento.chamada,
};

export default function SobreOEvento() {
  return (
    <>
      <PageHero
        rotulo="O evento"
        titulo={evento.nomeCompleto}
        descricao={descricaoEvento.chamada}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="prosa text-brand-600">
            {descricaoEvento.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="space-y-4">
            {pilares.map((pilar) => (
              <li key={pilar.titulo}>
                <Card>
                  <h2 className="flex items-center gap-2.5 text-lg text-brand-800">
                    <span className="text-rosa" aria-hidden="true">
                      ✿
                    </span>
                    {pilar.titulo}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-brand-600">
                    {pilar.texto}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section fundo="areia">
        <SectionTitle rotulo="Para quem" titulo="Público-alvo" />
        <div className="prosa mb-8 max-w-3xl text-brand-600">
          {publicoAlvo.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="mb-5 font-display text-lg text-brand-800">Cabe aqui quem…</p>
        <ListaFlor itens={[...publicoAlvo.itens]} />
        <p className="mt-8 max-w-3xl leading-relaxed text-brand-600">
          {publicoAlvo.fecho}
        </p>
      </Section>

      <Section>
        <SectionTitle rotulo="Antes de participar" titulo="Pré-requisitos" />
        <ul className="grid gap-6 sm:grid-cols-2">
          {preRequisitos.map((bloco) => (
            <li key={bloco.titulo}>
              <Card className="h-full">
                <h3 className="text-lg text-brand-800">{bloco.titulo}</h3>
                <div className="mt-4">
                  <ListaFlor itens={[...bloco.itens]} />
                </div>
              </Card>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Botao href={evento.inscricaoUrl} externo>
            {evento.inscricaoRotulo}
          </Botao>
          <Botao href="/inscricoes" variante="secundario">
            Ver valores e lotes
          </Botao>
        </div>
      </Section>
    </>
  );
}
