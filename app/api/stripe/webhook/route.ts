import { prisma } from "@/lib/db/client";
import { sendOrderConfirmation } from "@/lib/email/sendOrderConfirmation";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // 🔐 IDEMPOTENCY CHECK
  const existingEvent = await prisma.stripeEvent.findUnique({
    where: { id: event.id },
  });

  if (existingEvent) {
    return NextResponse.json({ received: true });
  }

  // Store event immediately (prevents duplicates)
  await prisma.stripeEvent.create({
    data: {
      id: event.id,
      type: event.type,
    },
  });

  // 🎯 Handle successful payment
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const email = paymentIntent.receipt_email;
    const templateId = paymentIntent.metadata.templateId;
    const templateTitle = paymentIntent.metadata.templateTitle;
    const amount = paymentIntent.amount;

    if (email) {
      await sendOrderConfirmation({
        to: email,
        orderId: paymentIntent.id,
        amount,
        payment_intent: paymentIntent.id,
      });
    }
  }

  return NextResponse.json({ received: true });
}
