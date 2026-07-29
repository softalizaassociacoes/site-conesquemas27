import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Section } from "@/components/ui";
import { comissoes, comissoesIntro } from "@/data/institucional";

export const metadata: Metadata = {
  title: "Comissões",
  description:
    "Conheça a equipe que organiza o III ConEsquemas 2027 — presidência, direção científica, secretaria, tesouraria e marketing.",
};

export default function Comissoes() {
  return (
    <>
      <PageHero
        rotulo="Organização"
        titulo="Quem constrói o III ConEsquemas"
        descricao={comissoesIntro}
      />

      <Section>
        <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4">
          {comissoes.map((pessoa) => (
            <li key={pessoa.cargo} className="text-center">
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-brand-100">
                <Image
                  src={pessoa.foto}
                  alt={pessoa.nome}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-plum-500">
                {pessoa.cargo}
              </p>
              <h2 className="mt-1 text-base leading-snug text-brand-800">
                {pessoa.nome}
              </h2>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
