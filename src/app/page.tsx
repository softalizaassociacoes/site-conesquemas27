import Image from "next/image";
import Link from "next/link";
import Carrossel from "@/components/Carrossel";
import Countdown from "@/components/Countdown";
import LeadForm from "@/components/LeadForm";
import Margaridas from "@/components/Margaridas";
import Onda from "@/components/Onda";
import PalestrantesGrid from "@/components/PalestrantesGrid";
import TextoManuscrito from "@/components/TextoManuscrito";
import { Botao, Card, Section, SectionTitle } from "@/components/ui";
import { evento, edicaoAnterior } from "@/data/evento";
import { descricaoEvento, pilares } from "@/data/institucional";
import { carrossel, minicursos } from "@/data/minicursos";
import { palestrantes2027 } from "@/data/palestrantes";
import { categorias, formatarBRL } from "@/data/lotes";
import { siteEdicao2026 } from "@/data/navegacao";

export default function Home() {
  const menorLoteZero = Math.min(...categorias.map((c) => c.lotes[0].valor));

  return (
    <>
      {/* Banner — o cabeçalho fica sobreposto a esta faixa */}
      <section className="relative overflow-hidden bg-linear-to-br from-brand-500 via-brand-500 to-brand-600 text-white">
        <TextoManuscrito />
        <Margaridas className="-right-24 -top-16 h-[30rem] w-[30rem] sm:-right-16 lg:h-[42rem] lg:w-[42rem]" />
        <Margaridas className="-left-32 bottom-0 hidden h-80 w-80 rotate-180 lg:block" />

        <div className="container-page relative pt-36 pb-24 sm:pt-40 lg:pt-44 lg:pb-36">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">
            {/* Marca + contagem regressiva */}
            <div className="text-center">
              <p className="font-display text-3xl font-semibold tracking-[0.28em] text-white/90 sm:text-4xl lg:text-5xl">
                CONESQUEMAS
              </p>
              <div className="mt-9 lg:mt-11">
                <Countdown alvo={evento.datas.inicioISO} variante="banner" />
              </div>
            </div>

            {/* Chamada principal */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-[2.9rem]">
                {evento.nomeCompleto}
              </h1>

              <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start">
                <span className="text-sm font-semibold uppercase tracking-wide sm:text-base">
                  {evento.datas.rotuloCurto}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90 ring-1 ring-white/25">
                  Em breve
                </span>
              </p>

              <p className="mt-3 text-sm text-white/70">
                {evento.local.nome} · {evento.local.cidade}/{evento.local.uf}
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  href="/inscricoes"
                  className="rounded-full bg-white/25 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/35"
                >
                  Valores e lotes
                </Link>
                <Link
                  href="/programacao"
                  className="rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white ring-1 ring-white/60 transition hover:bg-white/15"
                >
                  Programação
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Onda />
      </section>

      {/* Carrossel de destaques */}
      <section className="relative">
        <div className="container-page -mt-4 pb-4 sm:-mt-8 lg:-mt-10">
          <div className="mx-auto max-w-4xl">
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
              titulo="Não perca a abertura do Lote Zero"
              descricao="São apenas 24 horas com 25% de desconto sobre o 1º lote. Deixe seu contato e avisamos antes de abrir."
            />
            <div className="flex flex-wrap gap-3">
              <Botao href={evento.redes.instagram} externo variante="secundario">
                Seguir no Instagram
              </Botao>
              <Botao
                href={`https://wa.me/${evento.contato.whatsapp[0].numero}`}
                externo
                variante="secundario"
              >
                Falar no WhatsApp
              </Botao>
            </div>
          </div>
          <LeadForm />
        </div>
      </Section>

      {/* Edição anterior */}
      <section className="relative overflow-hidden bg-brand-600 py-20 text-white sm:py-24">
        <TextoManuscrito className="opacity-60" />
        <Margaridas className="-right-20 -bottom-24 h-72 w-72 lg:h-96 lg:w-96" />
        <Onda invertida />
        <div className="container-page relative text-center">
          <p className="mb-3 inline-flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-blush">
            <span className="h-px w-8 bg-rosa" aria-hidden="true" />
            Edição anterior
          </p>
          <h2 className="mx-auto mt-1 max-w-2xl text-2xl sm:text-3xl">
            Reviva o {edicaoAnterior.nome}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Local, palestrantes, programação completa e a galeria de fotos da
            edição de {edicaoAnterior.ano} seguem disponíveis no site próprio da
            edição.
          </p>
          <div className="mt-8">
            <Botao href={siteEdicao2026} externo variante="contorno-claro">
              Ver a edição de {edicaoAnterior.ano} ↗
            </Botao>
          </div>
        </div>
      </section>
    </>
  );
}
