import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { Botao, Card, PageHero, Section, SectionTitle } from "@/components/ui";
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
        <div className="grid gap-6 lg:grid-cols-2">
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
            <Link
              href="/local-do-evento"
              className="mt-4 inline-block text-sm font-semibold text-plum-500 transition hover:text-plum-700"
            >
              Como chegar →
            </Link>
          </Card>
        </div>

        <div className="mt-10 rounded-2xl bg-sand/60 px-6 py-8 text-center sm:px-10">
          <h2 className="text-xl text-brand-800">Antes de escrever</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-brand-600">
            A maior parte das dúvidas sobre inscrições, reembolso, minicursos,
            submissões e certificados já está respondida no nosso FAQ.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Botao href="/faq">Ver o FAQ</Botao>
            <Botao href={`mailto:${evento.contato.email}`} externo variante="secundario">
              Escrever para a organização
            </Botao>
          </div>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionTitle
            rotulo="Fique por dentro"
            titulo="Receba as novidades do congresso"
            descricao="Editais, prazos e a abertura do Lote Zero direto no seu e-mail e WhatsApp."
          />
          <LeadForm />
        </div>
      </Section>
    </>
  );
}
