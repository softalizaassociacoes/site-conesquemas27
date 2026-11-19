import type { Metadata } from "next";
import PalestrantesGrid from "@/components/PalestrantesGrid";
import { AvisoDados, Botao, PageHero, Section } from "@/components/ui";
import { edicaoAnterior } from "@/data/evento";
import { palestrantes2027 } from "@/data/palestrantes";
import { siteEdicao2026 } from "@/data/navegacao";

export const metadata: Metadata = {
  title: "Palestrantes",
  description:
    "Conheça os palestrantes do III ConEsquemas 2027 — referências nacionais e internacionais da Terapia do Esquema.",
};

export default function Palestrantes() {
  return (
    <>
      <PageHero
        rotulo="Palestrantes"
        titulo="Quem estará com você no palco"
        descricao="Referências nacionais e internacionais da Terapia do Esquema reunidas em Recife para três dias de prática viva."
      />

      <Section>
        <PalestrantesGrid palestrantes={palestrantes2027} />

        <div className="mt-12 space-y-6">
          <AvisoDados>
            A lista de palestrantes pode receber novos nomes até a abertura do
            congresso. Acompanhe o site e as redes oficiais.
          </AvisoDados>
          <Botao href={siteEdicao2026} externo variante="secundario">
            Ver os palestrantes do {edicaoAnterior.nome} ↗
          </Botao>
        </div>
      </Section>
    </>
  );
}
