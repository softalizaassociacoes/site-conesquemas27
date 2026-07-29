/**
 * Margaridas da identidade visual 2027 — o mesmo motivo dos cards de
 * minicurso e das fotos da comissão. Puramente decorativo.
 */

function Margarida({
  x,
  y,
  raio,
  giro = 0,
  opacidade,
}: {
  x: number;
  y: number;
  raio: number;
  giro?: number;
  opacidade: number;
}) {
  const petalas = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${giro}) scale(${raio / 40})`}
      opacity={opacidade}
    >
      {petalas.map((angulo) => (
        <ellipse
          key={angulo}
          cx="0"
          cy="-26"
          rx="12"
          ry="25"
          transform={`rotate(${angulo})`}
          fill="currentColor"
        />
      ))}
      <circle r="9" fill="currentColor" opacity="0.55" />
    </g>
  );
}

export default function Margaridas({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={`pointer-events-none absolute text-white ${className}`}
      aria-hidden="true"
    >
      <Margarida x={300} y={90} raio={110} giro={12} opacidade={0.16} />
      <Margarida x={148} y={196} raio={78} giro={-18} opacidade={0.13} />
      <Margarida x={318} y={286} raio={92} giro={26} opacidade={0.1} />
      <Margarida x={230} y={370} raio={62} giro={8} opacidade={0.08} />
    </svg>
  );
}
