import { readdir } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Galeria from "@/components/Galeria";
import { Botao, PageHero, Section } from "@/components/ui";
import { edicaoAnterior, evento } from "@/data/evento";

export const metadata: Metadata = {
  title: "Galeria de fotos",
  description:
    "Reviva os momentos do II ConEsquemas em Recife — encontros, trocas e prática viva.",
};

/**
 * Lê a pasta da galeria em tempo de build, para que novas fotos apareçam
 * apenas colocando o arquivo em public/images/edicao-anterior/galeria.
 */
async function carregarFotos() {
  const pasta = path.join(
    process.cwd(),
    "public",
    "images",
    "edicao-anterior",
    "galeria",
  );
  try {
    const arquivos = await readdir(pasta);
    return arquivos
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }))
      .map((f) => `/images/edicao-anterior/galeria/${f}`);
  } catch {
    return [];
  }
}

export default async function GaleriaEdicaoAnterior() {
  const fotos = await carregarFotos();

  return (
    <>
      <PageHero
        rotulo={`Edição anterior · ${edicaoAnterior.ano}`}
        titulo="Galeria de fotos"
        descricao={`O que aconteceu no ${edicaoAnterior.nome}: lágrimas, abraços, reencontros e descobertas que ecoaram muito além dos auditórios.`}
      />

      <Section>
        {fotos.length > 0 ? (
          <Galeria fotos={fotos} legenda={edicaoAnterior.nome} />
        ) : (
          <p className="rounded-xl border border-dashed border-plum-200 bg-plum-50/60 px-5 py-4 text-sm text-plum-700">
            As fotos serão publicadas em breve.
          </p>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          <Botao href={evento.redes.instagram} externo variante="secundario">
            Ver mais no Instagram
          </Botao>
          <Botao href="/edicao-anterior" variante="secundario">
            Voltar para a edição anterior
          </Botao>
        </div>
      </Section>
    </>
  );
}
