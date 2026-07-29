import type { Metadata } from "next";
import PalestrantesGrid from "@/components/PalestrantesGrid";
import { Botao, PageHero, Section } from "@/components/ui";
import { edicaoAnterior } from "@/data/evento";
import { palestrantes2026 } from "@/data/palestrantes";

export const metadata: Metadata = {
  title: `Palestrantes do ${edicaoAnterior.nome}`,
  description: `Os ${palestrantes2026.length} palestrantes do II ConEsquemas, realizado em ${edicaoAnterior.datasRotulo}.`,
};

export default function PalestrantesEdicaoAnterior() {
  return (
    <>
      <PageHero
        rotulo={`Edição anterior · ${edicaoAnterior.ano}`}
        titulo={`Palestrantes do ${edicaoAnterior.nome}`}
        descricao={`${edicaoAnterior.datasRotulo} · ${edicaoAnterior.local.nome}, Recife/PE.`}
      />

      <Section>
        <PalestrantesGrid palestrantes={palestrantes2026} />

        <div className="mt-12 flex flex-wrap gap-3">
          <Botao href="/palestrantes">Ver os palestrantes de 2027</Botao>
          <Botao href="/edicao-anterior" variante="secundario">
            Voltar para a edição anterior
          </Botao>
        </div>
      </Section>
    </>
  );
}
