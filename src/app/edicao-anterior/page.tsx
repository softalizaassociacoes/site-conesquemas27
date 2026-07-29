import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, PageHero, Section, SectionTitle } from "@/components/ui";
import { edicaoAnterior } from "@/data/evento";
import { palestrantes2026 } from "@/data/palestrantes";

export const metadata: Metadata = {
  title: "Edição anterior",
  description:
    "Reviva o II ConEsquemas (2026): local, palestrantes, programação completa e galeria de fotos.",
};

const atalhos = [
  {
    href: "/edicao-anterior/palestrantes",
    titulo: "Palestrantes",
    descricao: `Os ${palestrantes2026.length} palestrantes que estiveram no palco em ${edicaoAnterior.ano}.`,
  },
  {
    href: "/edicao-anterior/programacao",
    titulo: "Programação completa",
    descricao: "A grade dos três dias, auditório por auditório.",
  },
  {
    href: "/edicao-anterior/galeria",
    titulo: "Galeria de fotos",
    descricao: "Os encontros, as trocas e os abraços registrados em Recife.",
  },
];

export default function EdicaoAnterior() {
  return (
    <>
      <PageHero
        rotulo="Edição anterior"
        titulo={`Reviva o ${edicaoAnterior.nome}`}
        descricao={`${edicaoAnterior.datasRotulo} · ${edicaoAnterior.local.nome}, Recife/PE.`}
      />

      <Section>
        <ul className="grid gap-6 lg:grid-cols-3">
          {atalhos.map((a) => (
            <li key={a.href}>
              <Link href={a.href} className="group block h-full">
                <Card className="h-full transition group-hover:border-plum-200 group-hover:shadow-md">
                  <h2 className="text-xl text-brand-800">{a.titulo}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-brand-600">
                    {a.descricao}
                  </p>
                  <p className="mt-5 text-sm font-semibold text-plum-500">
                    Ver mais →
                  </p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section fundo="areia">
        <SectionTitle
          rotulo="Local"
          titulo={edicaoAnterior.local.nome}
          descricao={edicaoAnterior.local.endereco}
        />
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            "centro-eventos-01",
            "centro-eventos-09",
            "centro-eventos-03",
            "centro-eventos-04",
          ].map((nome) => (
            <li key={nome}>
              <Image
                src={`/images/edicao-anterior/local/${nome}.jpg`}
                alt={`${edicaoAnterior.local.nome} — ${edicaoAnterior.ano}`}
                width={800}
                height={600}
                className="aspect-4/3 w-full rounded-xl object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
