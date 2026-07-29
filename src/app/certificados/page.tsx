import type { Metadata } from "next";
import { AvisoDados, Botao, Card, ListaFlor, PageHero, Section } from "@/components/ui";
import { evento } from "@/data/evento";

export const metadata: Metadata = {
  title: "Certificados",
  description:
    "Certificados digitais do III ConEsquemas 2027 — 36 horas de participação no congresso e 3 horas de minicurso.",
};

export default function Certificados() {
  return (
    <>
      <PageHero
        rotulo="Certificados"
        titulo="Seus certificados digitais"
        descricao="Emitidos após o evento e disponibilizados online, mediante comprovação de presença."
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <p className="eyebrow mb-3">Participação</p>
            <h2 className="font-display text-3xl text-brand-800">
              {evento.cargaHoraria.congresso}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-600">
              Carga horária total correspondente à programação científica do
              congresso.
            </p>
          </Card>
          <Card>
            <p className="eyebrow mb-3">Minicurso</p>
            <h2 className="font-display text-3xl text-brand-800">
              {evento.cargaHoraria.minicurso}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-600">
              Certificado próprio para o minicurso escolhido no ato da inscrição.
            </p>
          </Card>
        </div>

        <Card className="mt-8">
          <h2 className="text-lg text-brand-800">Como obter</h2>
          <div className="mt-4">
            <ListaFlor
              itens={[
                "Os certificados digitais serão emitidos após o evento e disponibilizados online através da área do participante, mediante comprovação de presença.",
                "Certificados de minicursos serão enviados pelo mesmo sistema.",
                "Trabalhos aprovados e efetivamente apresentados recebem certificado de apresentação, vinculado ao nome dos autores regularmente inscritos.",
                "O CEPPA CURSOS não se responsabiliza por erros de digitação no preenchimento do cadastro — confira seus dados na inscrição.",
              ]}
            />
          </div>
        </Card>

        <div className="mt-8 space-y-6">
          <AvisoDados>
            A emissão dos certificados do III ConEsquemas será liberada após o
            encerramento do congresso, em maio de 2027. Esta página será
            atualizada com o link de acesso.
          </AvisoDados>
          <Botao href={evento.areaParticipanteUrl} externo>
            Acessar área do participante
          </Botao>
        </div>
      </Section>
    </>
  );
}
