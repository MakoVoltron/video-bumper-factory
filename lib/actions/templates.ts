"use server";

import { auth } from "@/lib/auth";
import { prisma } from "../db/client";
import { headers } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import getCloudinary from "../upload/cloudinary";

export async function deleteTemplate(videoId: string) {
  const cloudinary = await getCloudinary();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user.role || session.user.role !== "ADMIN") {
    throw new Error("Not authorized");
  }

  const template = await prisma.templatePreview.delete({
    where: { id: videoId },
  });

  await cloudinary.uploader.destroy(template.posterPublicId, {
    resource_type: "image",
  });
  await cloudinary.uploader.destroy(template.videoPublicId, {
    resource_type: "video",
  });

  // Bust the cached template lists/sitemap and the deleted detail page.
  revalidateTag("templates");
  revalidatePath(`/templates/${template.slug}`);
}
