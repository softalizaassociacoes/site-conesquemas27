import type { Metadata } from "next";
import { AvisoDados, Botao, Card, ListaFlor, PageHero, Section } from "@/components/ui";
import { evento } from "@/data/evento";

export const metadata: Metadata = {
  title: "Monitoria",
  description:
    "Participe da equipe de monitores do III ConEsquemas 2027 e vivencie os bastidores do congresso.",
};

export default function Monitoria() {
  return (
    <>
      <PageHero
        rotulo="Monitoria"
        titulo="Quer vivenciar o ConEsquemas de perto?"
        descricao="A monitoria é uma oportunidade de atuar nos bastidores, contribuindo com a logística, organização, apoio técnico e suporte a palestrantes e congressistas."
      />

      <Section>
        <Card>
          <h2 className="text-lg text-brand-800">Como funciona</h2>
          <div className="mt-4">
            <ListaFlor
              itens={[
                "O congresso contará com uma equipe de monitores, selecionados por meio de edital específico.",
                "É uma oportunidade de participar de perto da organização do evento, acompanhar as atividades científicas e vivenciar os bastidores de um congresso de Terapia do Esquema.",
                "Os requisitos, o número de vagas, as funções e as contrapartidas (como certificado de monitoria e eventuais condições de inscrição) serão detalhados no edital.",
                "Todos os campos do formulário são obrigatórios. O não preenchimento completo implica em desclassificação.",
              ]}
            />
          </div>
        </Card>

        <div className="mt-8 space-y-6">
          <AvisoDados>
            O edital de monitoria do III ConEsquemas ainda não foi publicado. Ele
            será divulgado aqui e nas redes oficiais, com prazo de candidatura e
            critérios próprios — fique atento.
          </AvisoDados>
          <div className="flex flex-wrap gap-3">
            <Botao href={evento.redes.instagram} externo variante="secundario">
              Acompanhar no Instagram
            </Botao>
            <Botao href={`mailto:${evento.contato.email}`} externo variante="secundario">
              Tirar dúvidas por e-mail
            </Botao>
          </div>
        </div>
      </Section>
    </>
  );
}
