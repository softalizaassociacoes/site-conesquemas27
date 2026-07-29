import { Botao, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="!py-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="font-display text-6xl font-semibold text-brand-200">404</p>
        <h1 className="mt-5 text-2xl text-brand-800 sm:text-3xl">
          Não encontramos esta página
        </h1>
        <p className="mt-4 leading-relaxed text-brand-600">
          O endereço pode ter mudado ou o conteúdo ainda não foi publicado.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Botao href="/">Voltar para a home</Botao>
          <Botao href="/faq" variante="secundario">
            Ver o FAQ
          </Botao>
        </div>
      </div>
    </Section>
  );
}
