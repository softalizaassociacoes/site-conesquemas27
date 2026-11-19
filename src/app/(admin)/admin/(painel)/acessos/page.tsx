import type { Metadata } from "next";
import Link from "next/link";
import GraficoUsuarios from "@/app/(admin)/admin/(painel)/acessos/GraficoUsuarios";
import {
  CartaoPainel,
  Recado,
  RolagemHorizontal,
  Rotulo,
} from "@/components/admin/ui";
import {
  TEXTO_FALHA,
  lerAcessos,
  type Acessos,
  type Fatia,
} from "@/lib/admin/ga4";
import {
  PRESETS,
  duracao,
  hoje,
  porExtenso,
  resolverPeriodo,
} from "@/lib/admin/periodo";

export const metadata: Metadata = {
  title: "Acessos",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

const inteiro = new Intl.NumberFormat("pt-BR");

function Variacao({ atual, antes }: { atual: number; antes: number }) {
  if (!antes) {
    return (
      <span className="ml-2 text-[0.65rem] font-bold uppercase tracking-wider text-brand-400">
        sem comparação
      </span>
    );
  }
  const pct = Math.round(((atual - antes) / antes) * 100);
  const sobe = pct >= 0;
  return (
    <span
      className={`ml-2 rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${
        sobe ? "bg-brand-50 text-brand-700" : "bg-plum-50 text-plum-700"
      }`}
    >
      {sobe ? "+" : ""}
      {pct}%
    </span>
  );
}

function Cartao({
  rotulo,
  valor,
  atual,
  antes,
  rodape,
}: {
  rotulo: string;
  valor: string;
  atual: number;
  antes: number;
  rodape: string;
}) {
  return (
    <CartaoPainel>
      <Rotulo>{rotulo}</Rotulo>
      <p className="mt-2 flex flex-wrap items-baseline font-display text-3xl font-semibold text-brand-800">
        {valor}
        <Variacao atual={atual} antes={antes} />
      </p>
      <p className="mt-1 text-xs text-brand-500">{rodape}</p>
    </CartaoPainel>
  );
}

function Tabela({
  titulo,
  itens,
  unidade,
}: {
  titulo: string;
  itens: Fatia[];
  unidade: string;
}) {
  const total = itens.reduce((s, i) => s + i.valor, 0);
  return (
    <CartaoPainel>
      <h2 className="text-lg text-brand-800">{titulo}</h2>
      {itens.length === 0 ? (
        <p className="mt-3 text-sm text-brand-500">Ainda sem dados no período.</p>
      ) : (
        <RolagemHorizontal>
          <ul className="mt-4 min-w-[17rem] space-y-3">
            {itens.map((i) => (
              <li key={`${i.rotulo}-${i.detalhe ?? ""}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="min-w-0 flex-1">
                    <span
                      className="block truncate text-sm text-brand-800"
                      title={i.rotulo}
                    >
                      {i.rotulo}
                    </span>
                    {i.detalhe && (
                      <span
                        className="block truncate text-xs text-brand-500"
                        title={i.detalhe}
                      >
                        {i.detalhe}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-plum-600">
                    {inteiro.format(i.valor)}
                  </span>
                </div>
                <div
                  className="mt-1 h-1.5 rounded-full bg-brand-50"
                  aria-hidden="true"
                >
                  <div
                    className="h-full rounded-full bg-plum-300"
                    style={{ width: `${total ? (i.valor / total) * 100 : 0}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </RolagemHorizontal>
      )}
      <p className="mt-4 text-xs text-brand-500">{unidade}</p>
    </CartaoPainel>
  );
}

export default async function TelaAcessos({
  searchParams,
}: {
  searchParams: Promise<{ de?: string; ate?: string; periodo?: string }>;
}) {
  const params = await searchParams;
  const periodo = resolverPeriodo(params);
  const resultado = await lerAcessos(
    periodo.inicio,
    periodo.fim,
    periodo.anterior,
  );

  const seletor = (
    <div className="flex flex-wrap items-end gap-x-2 gap-y-3">
      {PRESETS.map((p) => {
        const ativo = periodo.preset === p.chave;
        return (
          <Link
            key={p.chave}
            href={`/admin/acessos?periodo=${p.chave}`}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              ativo
                ? "bg-plum-500 text-white"
                : "bg-white text-brand-600 ring-1 ring-brand-200 hover:bg-plum-50"
            }`}
          >
            {p.rotulo}
          </Link>
        );
      })}
      <form
        method="get"
        action="/admin/acessos"
        className="flex flex-wrap items-end gap-2"
      >
        <label className="text-xs text-brand-500">
          De
          <input
            type="date"
            name="de"
            max={hoje()}
            defaultValue={periodo.inicio}
            className="ml-2 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-sm text-brand-800"
          />
        </label>
        <label className="text-xs text-brand-500">
          até
          <input
            type="date"
            name="ate"
            max={hoje()}
            defaultValue={periodo.fim}
            className="ml-2 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-sm text-brand-800"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-plum-600 ring-1 ring-plum-200 transition hover:bg-plum-50"
        >
          Aplicar
        </button>
      </form>
    </div>
  );

  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v) as [string, string][],
  ).toString();

  const cabecalho = (extra?: React.ReactNode) => (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl text-brand-800 sm:text-3xl">Acessos ao site</h1>
        <p className="mt-1 text-sm text-brand-500">
          {porExtenso(periodo.inicio)} a {porExtenso(periodo.fim)} ·{" "}
          {periodo.rotulo}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {extra}
        <a
          href={`/api/admin/relatorio${qs ? `?${qs}` : ""}`}
          className="rounded-full bg-plum-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-plum-500/25 transition hover:bg-plum-600"
        >
          Baixar CSV
        </a>
      </div>
    </div>
  );

  if (!resultado.ok) {
    const { titulo, texto } = TEXTO_FALHA[resultado.falha.tipo];
    return (
      <div className="container-page py-8">
        {cabecalho()}
        <div className="mt-6">{seletor}</div>
        <div className="mt-8 max-w-3xl">
          <Recado titulo={titulo}>{texto}</Recado>
        </div>
      </div>
    );
  }

  const d: Acessos = resultado.dados;
  const t = d.totais;
  const a = d.anterior;

  // O período pedido pode começar antes de a medição existir. Em vez de
  // desenhar uma linha despencando a zero, a tela recorta e avisa.
  const comecouAntes =
    d.primeiroDiaMedido !== null && periodo.inicio < d.primeiroDiaMedido;
  const serie = comecouAntes
    ? d.porDia.filter((p) => p.dia >= d.primeiroDiaMedido!)
    : d.porDia;

  const vazio = t.usuarios === 0 && t.sessoes === 0 && t.visualizacoes === 0;

  return (
    <div className="container-page py-8">
      {cabecalho(
        d.agora !== null ? (
          <span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-brand-600 ring-1 ring-brand-200">
            {d.agora} agora
          </span>
        ) : null,
      )}
      <div className="mt-6">{seletor}</div>

      {comecouAntes && (
        <div className="mt-6 max-w-3xl">
          <Recado
            titulo="O período pedido é maior que a história disponível"
            tom="neutro"
          >
            A medição deste site começou em {porExtenso(d.primeiroDiaMedido!)}.
            Antes dessa data não existe dado, então o gráfico começa aí, em vez
            de mostrar dias zerados que nunca foram medidos.
          </Recado>
        </div>
      )}

      {vazio ? (
        <div className="mt-8 max-w-3xl">
          <Recado titulo="Ainda sem dados no período" tom="neutro">
            Nenhum acesso medido entre {porExtenso(periodo.inicio)} e{" "}
            {porExtenso(periodo.fim)}. Experimente um período maior.
          </Recado>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Cartao
              rotulo="Usuários ativos"
              valor={inteiro.format(t.usuarios)}
              atual={t.usuarios}
              antes={a.usuarios}
              rodape={
                a.usuarios
                  ? `${inteiro.format(a.usuarios)} no período anterior`
                  : "sem período anterior medido"
              }
            />
            <Cartao
              rotulo="Sessões"
              valor={inteiro.format(t.sessoes)}
              atual={t.sessoes}
              antes={a.sessoes}
              rodape={
                a.sessoes
                  ? `${inteiro.format(a.sessoes)} no período anterior`
                  : "sem período anterior medido"
              }
            />
            <Cartao
              rotulo="Visualizações"
              valor={inteiro.format(t.visualizacoes)}
              atual={t.visualizacoes}
              antes={a.visualizacoes}
              rodape={
                a.visualizacoes
                  ? `${inteiro.format(a.visualizacoes)} no período anterior`
                  : "sem período anterior medido"
              }
            />
            <Cartao
              rotulo="Duração média"
              valor={duracao(t.duracaoMediaSegundos)}
              atual={t.duracaoMediaSegundos}
              antes={a.duracaoMediaSegundos}
              rodape={
                a.duracaoMediaSegundos
                  ? `${duracao(a.duracaoMediaSegundos)} no período anterior`
                  : "sem período anterior medido"
              }
            />
          </div>

          <div className="mt-6">
            <CartaoPainel>
              <h2 className="text-lg text-brand-800">Dia a dia</h2>
              <div className="mt-4">
                <GraficoUsuarios pontos={serie} />
              </div>
            </CartaoPainel>
          </div>

          <div className="mt-6">
            <Tabela
              titulo="Páginas mais vistas"
              itens={d.paginas}
              unidade="Visualizações no período. O caminho aparece abaixo do título."
            />
          </div>

          <div className="mt-6 grid items-start gap-4 lg:grid-cols-2">
            <Tabela
              titulo="Origem do tráfego"
              itens={d.origens}
              unidade="Sessões por origem e mídia."
            />
            <Tabela
              titulo="Canal"
              itens={d.canais}
              unidade="Sessões por canal."
            />
            <Tabela
              titulo="Dispositivos"
              itens={d.dispositivos}
              unidade="Sessões por tipo de aparelho."
            />
            <Tabela
              titulo="Cidades"
              itens={d.cidades}
              unidade="Sessões por cidade."
            />
          </div>
        </>
      )}

      <p className="mt-8 text-xs leading-relaxed text-brand-500">
        Números do Google Analytics 4, contando apenas quem aceita os cookies de
        medição. O total real de visitantes é maior que o mostrado aqui.
        {d.primeiroDiaMedido &&
          ` A medição começou em ${porExtenso(d.primeiroDiaMedido)}.`}
      </p>
    </div>
  );
}
