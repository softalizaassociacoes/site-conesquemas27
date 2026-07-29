import Image from "next/image";
import Link from "next/link";
import Carrossel from "@/components/Carrossel";
import Countdown from "@/components/Countdown";
import PalestrantesGrid from "@/components/PalestrantesGrid";
import LeadForm from "@/components/LeadForm";
import { Botao, Card, Section, SectionTitle } from "@/components/ui";
import { evento, edicaoAnterior } from "@/data/evento";
import { descricaoEvento, pilares } from "@/data/institucional";
import { carrossel, minicursos } from "@/data/minicursos";
import { palestrantes2027 } from "@/data/palestrantes";
import { categorias, formatarBRL } from "@/data/lotes";

export default function Home() {
  const menorLoteZero = Math.min(...categorias.map((c) => c.lotes[0].valor));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-800 text-white">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-plum-500/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-rosa/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-page relative py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Countdown alvo={evento.datas.inicioISO} variante="escuro" />

            <p className="mt-8 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-blush">
              <span className="h-px w-8 bg-rosa" aria-hidden="true" />
              {evento.edicao} Edição
              <span className="h-px w-8 bg-rosa" aria-hidden="true" />
            </p>

            <h1 className="mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {evento.nomeCompleto}
            </h1>

            <p className="mt-5 text-lg font-medium text-blush sm:text-xl">
              {evento.datas.rotulo}
            </p>
            <p className="mt-1.5 text-sm text-brand-100">
              {evento.local.nome} · {evento.local.cidade}/{evento.local.uf}
            </p>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-brand-100 sm:text-lg">
              {descricaoEvento.chamada}
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Botao href={evento.inscricaoUrl} externo>
                Inscreva-se
              </Botao>
              <Botao href="/programacao" variante="contorno-claro">
                Programação
              </Botao>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-4xl">
            <Carrossel slides={carrossel} />
          </div>
        </div>
      </section>

      {/* Lote Zero */}
      <section className="border-b border-plum-100 bg-plum-50">
        <div className="container-page flex flex-col items-center gap-6 py-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="eyebrow mb-2">
              Lote Zero · {evento.loteZero.duracaoRotulo}
            </p>
            <p className="text-lg font-semibold text-brand-800 sm:text-xl">
              {evento.loteZero.descontoRotulo}, a partir de{" "}
              {formatarBRL(menorLoteZero)}
            </p>
            <p className="mt-1 text-sm text-brand-600">
              De {evento.loteZero.rotulo}. Vagas limitadas.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Countdown alvo={evento.loteZero.inicioISO} />
            <Botao href="/inscricoes">Ver valores</Botao>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionTitle
              rotulo="O evento"
              titulo="Tem congresso que você assiste. O ConEsquemas é um que você sente."
            />
            <div className="prosa text-brand-600">
              {descricaoEvento.paragrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <Botao href="/sobre-o-evento" variante="secundario">
                Saiba mais
              </Botao>
            </div>
          </div>

          <ul className="space-y-4">
            {pilares.map((pilar) => (
              <li key={pilar.titulo}>
                <Card>
                  <h3 className="flex items-center gap-2.5 text-lg text-brand-800">
                    <span className="text-rosa" aria-hidden="true">
                      ✿
                    </span>
                    {pilar.titulo}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-brand-600">
                    {pilar.texto}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Onde e quando */}
      <Section fundo="areia">
        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="text-center">
            <p className="eyebrow justify-center">Onde</p>
            <h2 className="mt-3 text-xl text-brand-800 sm:text-2xl">
              {evento.local.nome}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-600">
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

          <Card className="text-center">
            <p className="eyebrow justify-center">Quando</p>
            <h2 className="mt-3 text-xl text-brand-800 sm:text-2xl">
              {evento.datas.rotuloCurto}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-600">
              Três dias de programação científica presencial, com{" "}
              {evento.cargaHoraria.congresso} de certificado.
            </p>
            <Link
              href="/programacao"
              className="mt-4 inline-block text-sm font-semibold text-plum-500 transition hover:text-plum-700"
            >
              Ver programação →
            </Link>
          </Card>
        </div>
      </Section>

      {/* Palestrantes */}
      <Section>
        <SectionTitle
          rotulo="Palestrantes"
          titulo="Quem estará com você no palco"
          descricao="Referências nacionais e internacionais da Terapia do Esquema reunidas em Recife."
          centralizado
        />
        <PalestrantesGrid palestrantes={palestrantes2027.slice(0, 8)} />
        <div className="mt-10 text-center">
          <Botao href="/palestrantes" variante="secundario">
            Ver todos os palestrantes
          </Botao>
        </div>
      </Section>

      {/* Minicursos */}
      <Section fundo="lilas">
        <SectionTitle
          rotulo="Minicursos"
          titulo="Gratuitos e exclusivos para inscritos"
          descricao="Escolha o seu no ato da inscrição. Vagas limitadas pela capacidade da sala."
          centralizado
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {minicursos.map((mc) => (
            <li key={mc.slug}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-100">
                {mc.imagem && (
                  <Image
                    src={mc.imagem}
                    alt={`Minicurso com ${mc.facilitadores.join(", ")}`}
                    width={1500}
                    height={2000}
                    className="aspect-3/4 w-full object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg leading-snug text-brand-800">
                    {mc.titulo}
                  </h3>
                  {mc.subtitulo && (
                    <p className="mt-1 text-sm italic text-brand-500">
                      {mc.subtitulo}
                    </p>
                  )}
                  <p className="mt-3 text-sm font-semibold text-plum-500">
                    {mc.facilitadores.join(" · ")}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Botao href="/minicursos" variante="secundario">
            Detalhes dos minicursos
          </Botao>
        </div>
      </Section>

      {/* Captura de leads */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle
              rotulo="Fique por dentro"
              titulo="Receba em primeira mão a abertura do Lote Zero"
              descricao="O Lote Zero dura apenas 24 horas e tem 25% de desconto sobre o 1º lote. Deixe seu contato e avisamos antes de abrir."
            />
          </div>
          <LeadForm />
        </div>
      </Section>

      {/* Edição anterior */}
      <section className="bg-brand-800 py-16 text-white sm:py-20">
        <div className="container-page text-center">
          <p className="mb-3 inline-flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-blush">
            <span className="h-px w-8 bg-rosa" aria-hidden="true" />
            Edição anterior
          </p>
          <h2 className="mx-auto mt-1 max-w-2xl text-2xl sm:text-3xl">
            Reviva o {edicaoAnterior.nome}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">
            Local, palestrantes, programação completa e a galeria de fotos da
            edição de {edicaoAnterior.ano} seguem disponíveis.
          </p>
          <div className="mt-8">
            <Botao href="/edicao-anterior" variante="contorno-claro">
              Ver a edição de {edicaoAnterior.ano}
            </Botao>
          </div>
        </div>
      </section>
    </>
  );
}
