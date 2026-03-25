import "dotenv/config";

import { uniqueSlug } from "../lib/helpers/generateSlug";
import { prisma } from "@/lib/db/client";

async function main() {
  const templates = await prisma.templatePreview.findMany();

  for (const template of templates) {
    const slug = await uniqueSlug(template.title);
    await prisma.templatePreview.update({
      where: { id: template.id },
      data: { slug },
    });
    console.log(`✓ ${template.title} -> ${slug}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
