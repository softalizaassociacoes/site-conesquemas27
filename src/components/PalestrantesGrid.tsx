import Image from "next/image";
import type { Palestrante } from "@/data/palestrantes";

/**
 * Grade de palestrantes: foto e nome, na ordem definida em
 * src/data/palestrantes.ts. Sem interação, então roda no servidor e não
 * manda JavaScript para o navegador.
 *
 * As fotos vão com `unoptimized`: já são WebP de 720x900 (~50 KB), exatamente
 * o que o card precisa, então o otimizador da Vercel não teria o que melhorar.
 * Passar por ele só gastaria cota de transformação — que chegou a estourar e
 * derrubar as fotos em produção (402 em /_next/image).
 */
export default function PalestrantesGrid({
  palestrantes,
}: {
  palestrantes: Palestrante[];
}) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {palestrantes.map((p) => (
        <li key={p.slug}>
          <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-brand-100">
            <Image
              src={p.foto}
              alt={p.nome}
              fill
              unoptimized
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          </div>
          <h3 className="mt-4 text-base leading-snug text-brand-800">
            {p.nome}
          </h3>
        </li>
      ))}
    </ul>
  );
}
