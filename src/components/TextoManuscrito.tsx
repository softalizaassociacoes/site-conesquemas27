/**
 * Marca d'água manuscrita ao fundo das faixas roxas — mesmo recurso usado
 * nos cards de minicurso da identidade 2027. Decorativo, não é lido por
 * leitores de tela.
 */

const LINHAS = [
  "transformação",
  "E entender que, muitas vezes, aquilo que hoje parece",
  "exagero, defesa ou distância, já foi, um dia, a forma possível",
  "de sobrevivência.",
  "E talvez uma das partes mais bonitas desse encontro",
  "seja descobrir que cuidar de si envolve olhar para ela",
  "com a mesma delicadeza que aprendemos a oferecer.",
];

export default function TextoManuscrito({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="flex h-full flex-col justify-around py-6">
        {LINHAS.map((linha, i) => (
          <p
            key={linha}
            className="whitespace-nowrap font-manuscrito text-2xl leading-none text-white/12 sm:text-4xl lg:text-5xl"
            style={{ paddingInlineStart: `${(i % 3) * 3.5}rem` }}
          >
            {linha}
          </p>
        ))}
      </div>
    </div>
  );
}
