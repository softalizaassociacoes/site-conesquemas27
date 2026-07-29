import type { Metadata } from "next";
import Acordeao from "@/components/Acordeao";
import { Botao, PageHero, Section } from "@/components/ui";
import { evento } from "@/data/evento";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description:
    "Dúvidas sobre inscrições, valores, reembolso, minicursos, submissões e certificados do III ConEsquemas 2027.",
};

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.flatMap((grupo) =>
      grupo.perguntas.map((p) => ({
        "@type": "Question",
        name: p.pergunta,
        acceptedAnswer: { "@type": "Answer", text: p.resposta.join(" ") },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        rotulo="FAQ"
        titulo="Perguntas frequentes"
        descricao="Não achou o que procurava? Fale com a organização pelo e-mail ou WhatsApp."
      />

      <Section>
        <div className="space-y-12">
          {faq.map((grupo) => (
            <div key={grupo.titulo}>
              <h2 className="mb-5 text-xl text-brand-800 sm:text-2xl">
                {grupo.titulo}
              </h2>
              <Acordeao
                itens={grupo.perguntas.map((p) => ({
                  titulo: p.pergunta,
                  conteudo: [...p.resposta],
                }))}
              />
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Botao href={`mailto:${evento.contato.email}`} externo>
            Falar com a organização
          </Botao>
          <Botao href="/contato" variante="secundario">
            Ver canais de contato
          </Botao>
        </div>
      </Section>
    </>
  );
}
