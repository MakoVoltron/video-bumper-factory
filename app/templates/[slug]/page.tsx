import { APP } from "@/lib/constants";
import { prisma } from "@/lib/db/client";
import { cache } from "react";

const getTemplateBySlug = cache((slug: string) =>
  prisma.templatePreview.findUnique({ where: { slug } }),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);
  if (!template) return { title: "Template not found" };
  return {
    title: template.title ?? APP.NAME,
    description: template.description ?? APP.DESCRIPTION,
  };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const template = await getTemplateBySlug(slug);

  return (
    <div>
      <h1>Template Page {slug}</h1>
      <p>{template?.title}</p>
      <p>{template?.description}</p>
      <p>{template?.category}</p>
      <p>{template?.posterUrl}</p>
      <p>{template?.videoUrl}</p>
      <p>{template?.isFeatured}</p>
      <p>{template?.orderPriority}</p>
      <p>{template?.price}</p>
    </div>
  );
}
