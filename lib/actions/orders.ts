"use server";

import { prisma } from "@/lib/db/client";
import { revalidatePath } from "next/cache";

export const deleteOrder = async (orderId: string) => {
  await prisma.order.delete({ where: { id: orderId } });
  revalidatePath("/dashboard/orders");
};
