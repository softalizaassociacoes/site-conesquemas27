import type { Metadata } from "next";
import { Card, ListaFlor, PageHero, Section, SectionTitle } from "@/components/ui";
import { evento } from "@/data/evento";
import { sobreRecife } from "@/data/institucional";

export const metadata: Metadata = {
  title: "Local do evento",
  description:
    "O III ConEsquemas 2027 acontece no Espaço RioMar Eventos, RioMar Recife (Pisos L3 e L4), Av. República do Líbano, 251 — Pina, Recife/PE.",
};

export default function LocalDoEvento() {
  const mapa = `https://www.google.com/maps?q=${encodeURIComponent(
    evento.local.mapsQuery,
  )}&output=embed`;

  return (
    <>
      <PageHero
        rotulo="Local do evento"
        titulo={evento.local.nome}
        descricao={`${evento.local.complemento} · ${evento.local.endereco}`}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div>
            <SectionTitle rotulo="Endereço" titulo="Como chegar" />
            <p className="leading-relaxed text-brand-600">
              {evento.local.nome}
              <br />
              {evento.local.complemento}
              <br />
              {evento.local.endereco}
            </p>
            <div className="mt-6">
              <ListaFlor
                itens={[
                  "Estrutura acessível, com elevadores e acesso adaptado para pessoas com deficiência ou mobilidade reduzida.",
                  "Estacionamento próprio do RioMar Recife (pago).",
                  "Ampla praça de alimentação, além dos coffee breaks previstos na programação.",
                ]}
              />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-brand-500">
              Em caso de necessidade específica de acessibilidade, entre em
              contato previamente pelo{" "}
              <a
                href={`mailto:${evento.contato.email}`}
                className="font-semibold text-plum-500 underline underline-offset-4"
              >
                {evento.contato.email}
              </a>
              .
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand-100 shadow-sm">
            <iframe
              src={mapa}
              title={`Mapa — ${evento.local.nome}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-96 w-full lg:h-full lg:min-h-112"
            />
          </div>
        </div>
      </Section>

      <Section fundo="areia">
        <SectionTitle
          rotulo="Sobre Recife"
          titulo="Uma das capitais mais vibrantes do Brasil"
          descricao={sobreRecife.intro}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <h3 className="text-lg text-brand-800">Turismo e cultura</h3>
            <div className="mt-4">
              <ListaFlor itens={[...sobreRecife.turismo]} />
            </div>
          </Card>
          <Card>
            <h3 className="text-lg text-brand-800">Sabores típicos</h3>
            <div className="mt-4">
              <ListaFlor itens={[...sobreRecife.sabores]} />
            </div>
          </Card>
          <Card>
            <h3 className="text-lg text-brand-800">Praias e passeios</h3>
            <div className="mt-4">
              <ListaFlor itens={[...sobreRecife.praias]} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-brand-500">
              {sobreRecife.praiasNota}
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionTitle
          rotulo="Hospedagem e transfers"
          titulo={`Agência parceira: ${evento.turismo.agencia}`}
          descricao={`Para maior comodidade dos participantes, o ${evento.nome} conta com a parceria da ${evento.turismo.agencia}, especializada em hospedagem, passeios e transfers.`}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <h3 className="text-lg text-brand-800">Contato</h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-600">
              📍 {evento.turismo.endereco}
            </p>
            <p className="mt-2 text-sm text-brand-600">
              📞 Telefone/WhatsApp:{" "}
              <a
                href={`https://wa.me/${evento.turismo.telefone}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-plum-500 underline underline-offset-4"
              >
                {evento.turismo.telefoneRotulo}
              </a>
            </p>
          </Card>
          <Card>
            <h3 className="text-lg text-brand-800">O que você pode reservar</h3>
            <div className="mt-4">
              <ListaFlor itens={[...sobreRecife.agenciaServicos]} />
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
