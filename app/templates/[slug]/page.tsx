import Video from "@/components/ui/Video";
import { APP } from "@/lib/constants";
import { prisma } from "@/lib/db/client";
import { cache } from "react";
import { redirect } from "next/navigation";
import StripeCheckoutForm from "@/components/StripeCheckoutForm";

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

  console.log("template");
  console.log(template);

  return (
    <div className="border max-w-5xl rounded-md bg-gray-900/50">
      <div className="grid grid-cols-12 gap-2 p-6">
        <div className="col-span-8 space-y-2">
          <div className="rounded overflow-hidden">
            <Video
              posterUrl={template.posterUrl}
              videoUrl={template.videoUrl}
              title={template.title}
            />
          </div>
          <h1 className="text-xl font-bold">{template?.title}</h1>

          <p>{template?.description}</p>
        </div>
        <div className="col-span-4">
          <StripeCheckoutForm template={template} />
        </div>
      </div>
    </div>
  );
}
