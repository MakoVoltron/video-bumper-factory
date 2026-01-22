"use server";

import { auth } from "@/lib/auth";
import { prisma } from "../db/client";
import { headers } from "next/headers";

export async function deleteTemplate(videoId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user.role || session.user.role !== "ADMIN") {
    throw new Error("Not authorized");
  }

  await prisma.templatePreview.delete({ where: { id: videoId } });
}
