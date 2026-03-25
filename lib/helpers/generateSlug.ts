import { prisma } from "../db/client";

function generateSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function uniqueSlug(name: string): Promise<string> {
  const base = generateSlug(name);
  let slug = base;
  let counter = 2;

  while (true) {
    const existing = await prisma.templatePreview.findUnique({
      where: { slug },
    });
    if (!existing) return slug;
    slug = `${base}-${counter}`;
    counter++;
  }
}
