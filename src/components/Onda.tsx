/**
 * Borda ondulada que separa as faixas roxas do conteúdo branco.
 * Motivo da identidade visual 2027.
 */
export default function Onda({
  cor = "#ffffff",
  className = "",
  invertida = false,
}: {
  /** Cor do que vem DEPOIS da onda. */
  cor?: string;
  className?: string;
  /** Vira a curva de cabeça para baixo (uso no topo de uma seção). */
  invertida?: boolean;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${
        invertida ? "top-0" : "bottom-0"
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`block h-10 w-full sm:h-16 lg:h-20 ${
          invertida ? "rotate-180" : ""
        }`}
      >
        <path
          fill={cor}
          d="M0,72 C180,16 360,4 540,36 C720,68 900,124 1080,116 C1220,110 1340,88 1440,52 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}
