import type { Metadata } from "next";
import Image from "next/image";
import { Botao, Card, ListaFlor, PageHero, Section } from "@/components/ui";
import { evento } from "@/data/evento";
import { minicursos, minicursosInfo } from "@/data/minicursos";

export const metadata: Metadata = {
  title: "Minicursos",
  description:
    "Minicursos do III ConEsquemas 2027 — gratuitos e exclusivos para inscritos no congresso, com certificado de 3 horas.",
};

export default function Minicursos() {
  return (
    <>
      <PageHero
        rotulo="Minicursos"
        titulo="Gratuitos e exclusivos para inscritos"
        descricao={`${minicursosInfo.formato} · Certificado próprio de ${minicursosInfo.cargaHoraria}`}
      />

      <Section>
        <Card className="mb-12">
          <h2 className="text-lg text-brand-800">Como funciona</h2>
          <div className="mt-4">
            <ListaFlor itens={[...minicursosInfo.regras]} />
          </div>
        </Card>

        <ul className="space-y-12">
          {minicursos.map((mc, i) => (
            <li key={mc.slug}>
              <article className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
                {mc.imagem && (
                  <Image
                    src={mc.imagem}
                    alt={`Minicurso com ${mc.facilitadores.join(", ")}`}
                    width={1500}
                    height={2000}
                    className="w-full rounded-2xl object-cover"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                )}

                <div>
                  <p className="eyebrow mb-3">{i + 1}º minicurso</p>
                  <h2 className="text-2xl leading-snug text-brand-800 sm:text-3xl">
                    {mc.titulo}
                  </h2>
                  {mc.subtitulo && (
                    <p className="mt-2 text-lg italic text-brand-500">
                      {mc.subtitulo}
                    </p>
                  )}
                  <p className="mt-4 font-semibold text-plum-500">
                    Com {mc.facilitadores.join(", ")}
                  </p>
                  <p className="mt-1 text-sm text-brand-500">
                    Carga horária: {minicursosInfo.cargaHoraria}
                  </p>

                  <div className="prosa mt-6 text-brand-600">
                    {mc.descricao.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>

                  {mc.conteudo && (
                    <div className="mt-6">
                      <h3 className="mb-3 font-display text-lg text-brand-800">
                        Conteúdo programático
                      </h3>
                      <ListaFlor itens={[...mc.conteudo]} />
                    </div>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap gap-3">
          <Botao href={evento.inscricaoUrl} externo>
            Inscrever-se e escolher meu minicurso
          </Botao>
          <Botao href="/inscricoes" variante="secundario">
            Ver valores
          </Botao>
        </div>
      </Section>
    </>
  );
}
