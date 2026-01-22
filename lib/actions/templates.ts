"use server";

import { auth } from "@/lib/auth";
import { prisma } from "../db/client";

export async function deleteTemplate(videoId: string) {
  const session = await auth.api.getSession();
  if (!session?.user.role || session.user.role !== "ADMIN") {
    throw new Error("Not authorized");
  }

  await prisma.templatePreview.delete({ where: { id: videoId } });
}
