import type { Metadata } from "next";
import ProgramacaoTabs from "@/components/ProgramacaoTabs";
import { Botao, PageHero, Section } from "@/components/ui";
import { edicaoAnterior } from "@/data/evento";
import { programacao2026 } from "@/data/programacao-2026";

export const metadata: Metadata = {
  title: `Programação do ${edicaoAnterior.nome}`,
  description: `Programação completa do II ConEsquemas — ${edicaoAnterior.datasRotulo}, no ${edicaoAnterior.local.nome}.`,
};

export default function ProgramacaoEdicaoAnterior() {
  return (
    <>
      <PageHero
        rotulo={`Edição anterior · ${edicaoAnterior.ano}`}
        titulo={`Programação do ${edicaoAnterior.nome}`}
        descricao={`${edicaoAnterior.datasRotulo} · ${edicaoAnterior.local.nome}, Recife/PE.`}
      />

      <Section fundo="lilas">
        <ProgramacaoTabs dias={programacao2026} />

        <div className="mt-12 flex flex-wrap gap-3">
          <Botao href="/programacao">Ver a programação de 2027</Botao>
          <Botao href="/edicao-anterior" variante="secundario">
            Voltar para a edição anterior
          </Botao>
        </div>
      </Section>
    </>
  );
}
