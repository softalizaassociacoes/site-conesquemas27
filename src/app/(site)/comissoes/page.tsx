import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Section, SectionTitle } from "@/components/ui";
import {
  comissaoCientifica,
  comissoes,
  comissoesIntro,
} from "@/data/institucional";

export const metadata: Metadata = {
  title: "Comissões",
  description:
    "Conheça a equipe que organiza o III ConEsquemas 2027 — presidência, direção científica, secretaria, tesouraria e marketing.",
};

type Membro = { cargo: string; nome: string; foto: string };

/**
 * Grade usada pelas duas comissões. A chave é o nome, não o cargo: na
 * científica três pessoas dividem "Comissão Científica".
 *
 * As fotos vão com `unoptimized` — já são WebP de 720x900, exatamente o que o
 * card usa, e assim a página não consome cota do otimizador da Vercel, que já
 * estourou antes e derrubou imagens sem erro nenhum no build.
 */
function GradeComissao({ pessoas }: { pessoas: readonly Membro[] }) {
  return (
    <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4">
      {pessoas.map((pessoa) => (
        <li key={pessoa.nome} className="text-center">
          <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-brand-100">
            <Image
              src={pessoa.foto}
              alt={pessoa.nome}
              fill
              unoptimized
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-plum-500">
            {pessoa.cargo}
          </p>
          <h3 className="mt-1 text-base leading-snug text-brand-800">
            {pessoa.nome}
          </h3>
        </li>
      ))}
    </ul>
  );
}

export default function Comissoes() {
  return (
    <>
      <PageHero
        rotulo="Organização"
        titulo="Quem constrói o III ConEsquemas"
        descricao={comissoesIntro}
      />

      <Section>
        <SectionTitle titulo="Comissão Organizadora" centralizado />
        <GradeComissao pessoas={comissoes} />
      </Section>

      <Section fundo="areia">
        <SectionTitle
          titulo="Comissão Científica"
          descricao="Responsável pela curadoria do conteúdo e pela avaliação dos trabalhos submetidos ao congresso."
          centralizado
        />
        <GradeComissao pessoas={comissaoCientifica} />
      </Section>
    </>
  );
}
