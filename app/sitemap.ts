import { APP } from "@/lib/constants";
import { prisma } from "@/lib/db/client";
import { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";

const getCachedSitemapTemplates = unstable_cache(
  () =>
    prisma.templatePreview.findMany({
      select: { slug: true, createdAt: true },
    }),
  ["sitemap"],
  { revalidate: 86400, tags: ["templates"] },
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = APP.URL.replace(/\/$/, "");

  const templates = await getCachedSitemapTemplates();

  return [
    {
      url: APP.URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...templates.map((t) => ({
      url: `${base}/templates/${t.slug}`,
      lastModified: t.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
