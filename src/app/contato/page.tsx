import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { Card, PageHero, Section, SectionTitle } from "@/components/ui";
import { evento } from "@/data/evento";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a organização do III ConEsquemas 2027 por e-mail, WhatsApp ou redes sociais.",
};

export default function Contato() {
  return (
    <>
      <PageHero
        rotulo="Contato"
        titulo="Fale com a organização"
        descricao="Estamos à disposição para dúvidas sobre inscrições, submissões, minicursos e acessibilidade."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5">
            <Card>
              <p className="eyebrow mb-3">E-mail</p>
              <a
                href={`mailto:${evento.contato.email}`}
                className="font-display text-xl text-brand-800 transition hover:text-plum-500"
              >
                {evento.contato.email}
              </a>
            </Card>

            <Card>
              <p className="eyebrow mb-3">Central de WhatsApp</p>
              <ul className="space-y-2">
                {evento.contato.whatsapp.map((w) => (
                  <li key={w.numero}>
                    <a
                      href={`https://wa.me/${w.numero}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-display text-xl text-brand-800 transition hover:text-plum-500"
                    >
                      {w.rotulo}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <p className="eyebrow mb-3">Redes sociais</p>
              <ul className="space-y-2 text-brand-700">
                <li>
                  <a
                    href={evento.redes.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-plum-500"
                  >
                    Instagram — @conesquemas
                  </a>
                </li>
                <li>
                  <a
                    href={evento.redes.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-plum-500"
                  >
                    Facebook — ConEsquemas
                  </a>
                </li>
                <li>
                  <a
                    href={evento.redes.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-plum-500"
                  >
                    YouTube — @ceppa.cursos
                  </a>
                </li>
              </ul>
            </Card>

            <Card>
              <p className="eyebrow mb-3">Local do evento</p>
              <p className="leading-relaxed text-brand-700">
                {evento.local.nome}
                <br />
                {evento.local.complemento}
                <br />
                {evento.local.endereco}
              </p>
            </Card>

            <p className="text-sm text-brand-500">
              Antes de escrever, dê uma olhada no{" "}
              <Link
                href="/faq"
                className="font-semibold text-plum-500 underline underline-offset-4"
              >
                FAQ
              </Link>
              . A maior parte das dúvidas já está respondida por lá.
            </p>
          </div>

          <div>
            <SectionTitle
              rotulo="Newsletter"
              titulo="Receba as novidades do congresso"
              descricao="Editais, prazos e a abertura do Lote Zero direto no seu e-mail e WhatsApp."
            />
            <LeadForm />
          </div>
        </div>
      </Section>
    </>
  );
}
