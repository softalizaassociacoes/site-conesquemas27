import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/evento";

const rotas = [
  { caminho: "/", prioridade: 1 },
  { caminho: "/sobre-o-evento", prioridade: 0.8 },
  { caminho: "/comissoes", prioridade: 0.5 },
  { caminho: "/exposicao-comercial", prioridade: 0.6 },
  { caminho: "/local-do-evento", prioridade: 0.7 },
  { caminho: "/palestrantes", prioridade: 0.9 },
  { caminho: "/programacao", prioridade: 0.9 },
  { caminho: "/minicursos", prioridade: 0.8 },
  { caminho: "/submissoes", prioridade: 0.8 },
  { caminho: "/inscricoes", prioridade: 1 },
  { caminho: "/certificados", prioridade: 0.5 },
  { caminho: "/monitoria", prioridade: 0.5 },
  { caminho: "/faq", prioridade: 0.7 },
  { caminho: "/contato", prioridade: 0.6 },
  { caminho: "/edicao-anterior", prioridade: 0.5 },
  { caminho: "/edicao-anterior/palestrantes", prioridade: 0.4 },
  { caminho: "/edicao-anterior/programacao", prioridade: 0.4 },
  { caminho: "/edicao-anterior/galeria", prioridade: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return rotas.map(({ caminho, prioridade }) => ({
    url: `${siteUrl}${caminho}`,
    changeFrequency: "weekly",
    priority: prioridade,
  }));
}
