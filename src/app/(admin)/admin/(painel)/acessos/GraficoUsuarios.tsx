import type { PontoDoDia } from "@/lib/admin/ga4";
import { curta, porExtenso } from "@/lib/admin/periodo";

/**
 * Linha de usuários por dia, em SVG puro. São poucos pontos, e o painel não
 * justifica carregar uma biblioteca de gráfico só para desenhar isto.
 *
 * Os dias já chegam recortados a partir do início da medição: a linha nunca
 * começa num zero que, na verdade, é ausência de dado.
 */
export default function GraficoUsuarios({ pontos }: { pontos: PontoDoDia[] }) {
  if (pontos.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-brand-500">
        Ainda sem dados no período.
      </p>
    );
  }

  const L = 1000;
  const A = 200;
  const pad = 6;
  const maximo = Math.max(...pontos.map((p) => p.usuarios), 1);
  const x = (i: number) =>
    pontos.length === 1
      ? L / 2
      : (i / (pontos.length - 1)) * (L - pad * 2) + pad;
  const y = (v: number) => A - (v / maximo) * (A - pad) - pad / 2;

  const linha = pontos.map((p, i) => `${x(i)},${y(p.usuarios)}`).join(" ");
  const area = `${x(0)},${A} ${linha} ${x(pontos.length - 1)},${A}`;
  const passo = Math.ceil(pontos.length / 10);

  return (
    <figure>
      <svg
        viewBox={`0 0 ${L} ${A + 26}`}
        className="h-52 w-full"
        role="img"
        aria-label={`Usuários ativos por dia, de ${porExtenso(pontos[0].dia)} a ${porExtenso(
          pontos[pontos.length - 1].dia,
        )}. Máximo de ${maximo} num dia.`}
      >
        {[0, 0.5, 1].map((f) => (
          <line
            key={f}
            x1="0"
            x2={L}
            y1={y(maximo * f)}
            y2={y(maximo * f)}
            stroke="currentColor"
            strokeWidth="1"
            className="text-brand-100"
          />
        ))}
        <polygon points={area} className="fill-plum-100/60" />
        <polyline
          points={linha}
          fill="none"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="stroke-plum-500"
        />
        {pontos.map((p, i) => (
          <circle
            key={p.dia}
            cx={x(i)}
            cy={y(p.usuarios)}
            r={pontos.length > 45 ? 0 : 3.5}
            className="fill-plum-600"
          >
            <title>{`${porExtenso(p.dia)} — ${p.usuarios} ${
              p.usuarios === 1 ? "usuário" : "usuários"
            }`}</title>
          </circle>
        ))}
        {pontos.map((p, i) =>
          // o último rótulo sempre aparece; os do passo cedem lugar se caírem
          // perto dele, senão as datas se sobrepõem
          (i % passo === 0 && i < pontos.length - passo / 2) ||
          i === pontos.length - 1 ? (
            <text
              key={`r-${p.dia}`}
              x={x(i)}
              y={A + 18}
              textAnchor={
                i === 0 ? "start" : i === pontos.length - 1 ? "end" : "middle"
              }
              className="fill-current text-[13px] text-brand-500"
            >
              {curta(p.dia)}
            </text>
          ) : null,
        )}
      </svg>
      <figcaption className="mt-2 text-xs text-brand-500">
        Usuários ativos por dia. Máximo de {maximo} em um único dia.
      </figcaption>
    </figure>
  );
}
