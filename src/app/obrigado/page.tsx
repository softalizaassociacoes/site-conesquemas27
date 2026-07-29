import type { Metadata } from "next";
import PurchaseEvent from "./PurchaseEvent";
import { Botao, Section } from "@/components/ui";
import { evento } from "@/data/evento";

export const metadata: Metadata = {
  title: "Obrigado",
  description: "Sua inscrição no III ConEsquemas 2027 foi registrada.",
  // Página de conversão: não deve ser indexada nem aparecer em buscas.
  robots: { index: false, follow: false },
};

export default function Obrigado() {
  return (
    <>
      {/* Dispara o evento Purchase do Meta Pixel (Guia, p. 4, item 2). */}
      <PurchaseEvent />

      <Section className="!py-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-5xl" aria-hidden="true">
            ✿
          </p>
          <h1 className="mt-6 text-3xl text-brand-800 sm:text-4xl">Obrigado!</h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-600">
            Você está quase lá. Acesse a Área do Participante para concluir e
            acompanhar sua inscrição no {evento.nome}.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Botao href={evento.areaParticipanteUrl} externo>
              Acessar Área do Participante
            </Botao>
            <Botao href="/" variante="secundario">
              Voltar para a home
            </Botao>
          </div>

          <p className="mt-10 text-sm leading-relaxed text-brand-500">
            Dúvidas? Fale com a gente pelo{" "}
            <a
              href={`mailto:${evento.contato.email}`}
              className="font-semibold text-plum-500 underline underline-offset-4"
            >
              {evento.contato.email}
            </a>{" "}
            ou pela central de WhatsApp{" "}
            <a
              href={`https://wa.me/${evento.contato.whatsapp[0].numero}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-plum-500 underline underline-offset-4"
            >
              {evento.contato.whatsapp[0].rotulo}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
