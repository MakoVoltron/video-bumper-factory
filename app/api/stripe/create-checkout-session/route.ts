import { product } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { templateId, templateTitle } = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.price,
    currency: product.currency,
    automatic_payment_methods: { enabled: true },
    metadata: {
      templateId,
      templateTitle,
    },
  });

  console.log("paymentIntent from create");
  console.log(paymentIntent);

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
