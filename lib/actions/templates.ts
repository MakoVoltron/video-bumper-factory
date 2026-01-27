"use server";

import { auth } from "@/lib/auth";
import { prisma } from "../db/client";
import { headers } from "next/headers";
import cloudinary from "../upload/cloudinary";

export async function deleteTemplate(videoId: string) {
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

  console.log("template to be deleted");
  console.log(template);
}
