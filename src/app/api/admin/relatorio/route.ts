import { NextResponse } from "next/server";
import { TEXTO_FALHA, lerAcessos } from "@/lib/admin/ga4";
import { naoAutenticado, sessaoAtual } from "@/lib/admin/guarda";
import { duracao, porExtenso, resolverPeriodo } from "@/lib/admin/periodo";
import { evento } from "@/data/evento";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * CSV do mesmo recorte que a tela está mostrando: mesmo período, mesmas seções.
 *
 * Confere a sessão por conta própria, sem depender do proxy: uma rota que
 * entrega dados não pode confiar só na barreira de fora.
 *
 * Aspas duplicadas, campo entre aspas e ponto e vírgula: é o que o Excel em
 * português abre direto, sem assistente de importação.
 */
const campo = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
const linha = (...valores: (string | number)[]) => valores.map(campo).join(";");

export async function GET(req: Request) {
  const sessao = await sessaoAtual();
  if (!sessao) return naoAutenticado();

  const url = new URL(req.url);
  const periodo = resolverPeriodo({
    de: url.searchParams.get("de") ?? undefined,
    ate: url.searchParams.get("ate") ?? undefined,
    periodo: url.searchParams.get("periodo") ?? undefined,
  });

  const r = await lerAcessos(periodo.inicio, periodo.fim, periodo.anterior);
  if (!r.ok) {
    const { titulo, texto } = TEXTO_FALHA[r.falha.tipo];
    return NextResponse.json(
      { ok: false, erro: `${titulo}. ${texto}` },
      { status: r.falha.tipo === "sem-credencial" ? 503 : 502 },
    );
  }
  const d = r.dados;

  const linhas: string[] = [
    linha(`Relatório de acessos — ${evento.nome}`),
    linha(
      "Período",
      `${porExtenso(periodo.inicio)} a ${porExtenso(periodo.fim)}`,
    ),
    linha(
      "Gerado em",
      new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
    ),
    linha(
      "Observação",
      "Conta apenas quem aceita os cookies de medição; o total real de visitantes é maior.",
    ),
  ];
  if (d.primeiroDiaMedido) {
    linhas.push(linha("Medição começou em", porExtenso(d.primeiroDiaMedido)));
  }

  linhas.push(
    "",
    linha("Resumo", "Período", "Período anterior"),
    linha("Usuários ativos", d.totais.usuarios, d.anterior.usuarios),
    linha("Sessões", d.totais.sessoes, d.anterior.sessoes),
    linha("Visualizações", d.totais.visualizacoes, d.anterior.visualizacoes),
    linha(
      "Duração média da sessão",
      duracao(d.totais.duracaoMediaSegundos),
      duracao(d.anterior.duracaoMediaSegundos),
    ),
    "",
    linha("Dia", "Usuários ativos"),
    ...d.porDia.map((p) => linha(porExtenso(p.dia), p.usuarios)),
  );

  const blocos: [string, string, string, typeof d.paginas][] = [
    ["Páginas mais vistas", "Caminho", "Visualizações", d.paginas],
    ["Origem do tráfego", "Mídia", "Sessões", d.origens],
    ["Canal", "", "Sessões", d.canais],
    ["Dispositivos", "", "Sessões", d.dispositivos],
    ["Cidades", "", "Sessões", d.cidades],
  ];
  for (const [titulo, colunaDetalhe, unidade, itens] of blocos) {
    linhas.push("");
    linhas.push(
      colunaDetalhe
        ? linha(titulo, colunaDetalhe, unidade)
        : linha(titulo, unidade),
    );
    for (const i of itens) {
      linhas.push(
        colunaDetalhe
          ? linha(i.rotulo, i.detalhe ?? "", i.valor)
          : linha(i.rotulo, i.valor),
      );
    }
  }

  // BOM na frente: sem ele o Excel no Windows estraga os acentos
  const corpo = `﻿${linhas.join("\r\n")}\r\n`;
  const nome = `conesquemas-acessos-${periodo.inicio}-a-${periodo.fim}.csv`;

  return new NextResponse(corpo, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${nome}"`,
      "Cache-Control": "no-store",
    },
  });
}
