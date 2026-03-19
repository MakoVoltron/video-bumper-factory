import { params } from "@/lib/constants";
import { prisma } from "@/lib/db/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paymentIntentId = searchParams.get(params.PAYMENT_INTENT_ID);

  if (!paymentIntentId) return NextResponse.json({ exists: false });

  const order = await prisma.order.findUnique({ where: { paymentIntentId } });
  return NextResponse.json({ exists: !!order });
}
