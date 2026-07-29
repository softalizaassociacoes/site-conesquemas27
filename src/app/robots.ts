import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/evento";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Página de conversão do pixel — não deve ser indexada.
      disallow: ["/obrigado"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
