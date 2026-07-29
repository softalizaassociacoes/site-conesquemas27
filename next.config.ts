import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const raiz = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Evita que o Next suba a raiz do workspace por causa de lockfiles fora do projeto.
  turbopack: { root: raiz },
  outputFileTracingRoot: raiz,

  images: {
    // As fotos oficiais chegam em PNG; servimos AVIF/WebP otimizados.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  poweredByHeader: false,

  // A edição de 2026 passou a ter site próprio. As URLs antigas do WordPress e
  // as rotas internas que existiam aqui apontam para lá, preservando o SEO.
  async redirects() {
    const site2026 = "https://conesquemas26.softaliza.com.br";
    return [
      { source: "/edicao-passada", destination: site2026, permanent: true },
      { source: "/edicao-anterior", destination: site2026, permanent: true },
      { source: "/edicao-anterior/:path*", destination: site2026, permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
