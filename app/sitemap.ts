import { APP } from "@/lib/constants";
import { prisma } from "@/lib/db/client";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = APP.URL.replace(/\/$/, "");

  const templates = await prisma.templatePreview.findMany({
    select: { slug: true, createdAt: true },
  });

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
