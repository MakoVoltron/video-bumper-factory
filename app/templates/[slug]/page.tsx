import Video from "@/components/ui/Video";
import { APP } from "@/lib/constants";
import { prisma } from "@/lib/db/client";
import { cache } from "react";
import { redirect } from "next/navigation";
import StripeCheckoutForm from "@/components/StripeCheckoutForm";
import Link from "next/link";

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

  if (!template) {
    return redirect("/");
  }

  const similarTemplates = await prisma.templatePreview.findMany({
    where: { category: template.category, id: { not: template.id } },
    take: 3,
  });

  return (
    <div className="max-w-5xl space-y-3">
      <div className="border rounded-md bg-gray-900/50 p-6">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-8 space-y-2">
            <div className="rounded overflow-hidden">
              <Video
                posterUrl={template.posterUrl}
                videoUrl={template.videoUrl}
                title={template.title}
              />
            </div>
            <h1 className="text-2xl font-bold">{template?.title}</h1>

            <p>{template?.description}</p>
          </div>
          <div className="col-span-4">
            <StripeCheckoutForm template={template} />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-md font-bold">You might also like</h3>
        <div className="grid grid-cols-12 gap-2">
          {similarTemplates.map((template) => (
            <div key={template.id} className="col-span-4">
              <Link href={`/templates/${template.slug}`}>
                <Video
                  posterUrl={template.posterUrl}
                  videoUrl={template.videoUrl}
                  title={template.title}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
