import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const paymentIntent = await stripe.paymentIntents.retrieve(params.id);

  if (paymentIntent.status !== "succeeded") {
    return NextResponse.json(
      { error: "Payment not completed" },
      { status: 400 },
    );
  }

  console.log("paymentIntent");
  console.log(paymentIntent);

  return NextResponse.json({
    amount: paymentIntent.amount,
    email: paymentIntent.receipt_email,
    templateTitle: paymentIntent.metadata.templateTitle,
  });
}
