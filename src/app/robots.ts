import type { MetadataRoute } from "next";
import { siteIndexavel, siteUrl } from "@/data/evento";

export default function robots(): MetadataRoute.Robots {
  // Em homologação, bloqueia tudo e não anuncia o sitemap.
  if (!siteIndexavel) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Página de conversão do pixel — não deve ser indexada.
      disallow: ["/obrigado", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
