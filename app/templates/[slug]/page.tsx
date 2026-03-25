import { prisma } from "@/lib/db/client";

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const template = await prisma.templatePreview.findUnique({
    where: { slug },
  });

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
