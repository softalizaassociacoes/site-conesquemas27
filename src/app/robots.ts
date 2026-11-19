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
      // /obrigado é página de conversão do pixel; /admin é o painel privado.
      disallow: ["/obrigado", "/admin", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
