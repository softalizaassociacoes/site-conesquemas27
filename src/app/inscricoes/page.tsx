import type { Metadata } from "next";
import Countdown from "@/components/Countdown";
import {
  Botao,
  Card,
  ListaFlor,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { evento } from "@/data/evento";
import {
  atencaoInscricoes,
  categorias,
  comprovacaoCategoria,
  formasPagamento,
  formatarBRL,
  observacoesInscricao,
  reembolso,
} from "@/data/lotes";
import { politicaInscricoes } from "@/data/institucional";

export const metadata: Metadata = {
  title: "Inscrições",
  description:
    "Valores, lotes e regulamento de inscrição do III ConEsquemas 2027. Lote Zero com 25% de desconto por 24 horas.",
};

export default function Inscricoes() {
  return (
    <>
      <PageHero
        rotulo="Inscrições"
        titulo="Garanta sua vaga no III ConEsquemas"
        descricao="As inscrições funcionam por lotes e os valores aumentam a cada novo lote. Quanto antes você garantir sua vaga, melhor a condição."
      />

      {/* Lote Zero */}
      <section className="border-b border-plum-100 bg-plum-50">
        <div className="container-page flex flex-col items-center gap-6 py-10 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="eyebrow mb-2">Lote Zero · {evento.loteZero.duracaoRotulo}</p>
            <h2 className="text-xl text-brand-800 sm:text-2xl">
              {evento.loteZero.descontoRotulo}
            </h2>
            <p className="mt-1.5 text-sm text-brand-600">
              De {evento.loteZero.rotulo}
            </p>
          </div>
          <Countdown alvo={evento.loteZero.inicioISO} />
        </div>
      </section>

      {/* Tabelas de valores */}
      <Section>
        <SectionTitle
          rotulo="Valores e pagamentos"
          titulo="Escolha sua categoria"
          descricao="Valores expressos em reais. A inscrição só é confirmada após o pagamento."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {categorias.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm"
            >
              <div className="bg-brand-800 px-6 py-5 text-white">
                <h3 className="text-lg">{cat.titulo}</h3>
                <p className="mt-1 text-xs leading-relaxed text-brand-100">
                  {cat.descricao}
                </p>
              </div>

              <ul className="flex-1 divide-y divide-brand-100">
                {cat.lotes.map((lote) => (
                  <li
                    key={lote.rotulo}
                    className={`flex items-baseline justify-between gap-3 px-6 py-4 ${
                      lote.destaque ? "bg-plum-50" : ""
                    }`}
                  >
                    <div>
                      <p
                        className={`text-xs font-bold uppercase tracking-widest ${
                          lote.destaque ? "text-plum-600" : "text-brand-400"
                        }`}
                      >
                        {lote.rotulo}
                        {lote.destaque && " · 25% off"}
                      </p>
                      <p className="mt-0.5 text-xs text-brand-500">
                        {lote.periodo}
                      </p>
                    </div>
                    <p className="shrink-0 font-display text-lg font-semibold text-brand-800">
                      {formatarBRL(lote.valor)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Card>
            <h3 className="text-lg text-brand-800">Formas de pagamento</h3>
            <div className="mt-4">
              <ListaFlor itens={[...formasPagamento]} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-brand-500">
              Após preencher a ficha, siga com o pagamento pela área de
              congressista. Se a categoria exige documento comprobatório, aguarde
              a análise e aprovação antes de pagar.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg text-brand-800">Observações importantes</h3>
            <div className="mt-4">
              <ListaFlor itens={[...observacoesInscricao]} />
            </div>
          </Card>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Botao href={evento.inscricaoUrl} externo>
            Fazer minha inscrição
          </Botao>
          <Botao href="/faq" variante="secundario">
            Tirar dúvidas no FAQ
          </Botao>
        </div>
      </Section>

      {/* Atenção */}
      <Section fundo="areia">
        <SectionTitle rotulo="Fique atento" titulo="Atenção às inscrições" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg text-brand-800">Vagas limitadas</h3>
            <div className="mt-4">
              <ListaFlor itens={[...atencaoInscricoes]} />
            </div>
          </Card>
          <Card>
            <h3 className="text-lg text-brand-800">Comprovação de categoria</h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-600">
              {comprovacaoCategoria.intro}
            </p>
            <div className="mt-4">
              <ListaFlor itens={[...comprovacaoCategoria.itens]} />
            </div>
            <p className="mt-4 rounded-lg bg-plum-50 px-4 py-3 text-sm font-medium text-plum-700">
              Importante: {comprovacaoCategoria.aviso}
            </p>
          </Card>
        </div>
      </Section>

      {/* Reembolso */}
      <Section>
        <SectionTitle
          rotulo="Cancelamento"
          titulo="Desistência e reembolso"
          descricao={reembolso.intro}
        />

        <div className="overflow-x-auto rounded-2xl border border-brand-100">
          <table className="w-full min-w-140 border-collapse text-left text-sm">
            <thead className="bg-brand-50 text-brand-800">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Justificativa
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Prazo para solicitação
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Valor reembolsado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100 bg-white">
              {reembolso.regras.map((r) => (
                <tr key={r.justificativa}>
                  <td className="px-5 py-4 font-medium text-brand-800">
                    {r.justificativa}
                  </td>
                  <td className="px-5 py-4 text-brand-600">{r.prazo}</td>
                  <td className="px-5 py-4 text-brand-600">{r.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg text-brand-800">Documentação necessária</h3>
            <div className="mt-4">
              <ListaFlor itens={[...reembolso.documentacao]} />
            </div>
          </Card>
          <Card>
            <h3 className="text-lg text-brand-800">Regras gerais</h3>
            <div className="mt-4">
              <ListaFlor itens={[...reembolso.observacoes]} />
            </div>
          </Card>
        </div>
      </Section>

      {/* Regulamento */}
      <Section fundo="lilas">
        <SectionTitle
          rotulo="Regulamento"
          titulo="Política de inscrições"
          descricao={politicaInscricoes.intro}
        />

        <Card className="mb-8">
          <h3 className="text-lg text-brand-800">Cada inscrito(a) terá direito a</h3>
          <div className="mt-4">
            <ListaFlor itens={[...politicaInscricoes.direitos]} />
          </div>
        </Card>

        <ul className="grid gap-5 sm:grid-cols-2">
          {politicaInscricoes.itens.map((item) => (
            <li key={item.titulo}>
              <Card className="h-full">
                <h3 className="text-base font-semibold text-brand-800">
                  {item.titulo}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-brand-600">
                  {item.texto}
                </p>
              </Card>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-brand-600">
          Dúvidas e solicitações:{" "}
          <a
            href={`mailto:${evento.contato.email}`}
            className="font-semibold text-plum-500 underline underline-offset-4"
          >
            {evento.contato.email}
          </a>
          {" · "}
          WhatsApp{" "}
          {evento.contato.whatsapp.map((w, i) => (
            <span key={w.numero}>
              {i > 0 && " ou "}
              <a
                href={`https://wa.me/${w.numero}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-plum-500 underline underline-offset-4"
              >
                {w.rotulo}
              </a>
            </span>
          ))}
        </p>
      </Section>
    </>
  );
}
