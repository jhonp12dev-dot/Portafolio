import { MetadataRoute } from "next";

const locales = ["es", "en", "pt", "zh", "ko", "ru"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 
    process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null) || 
    "https://jhonpillaca.vercel.app";
  
  const sitemapEntries = locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: locale === "es" || locale === "en" ? 1.0 : 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...sitemapEntries,
  ];
}
