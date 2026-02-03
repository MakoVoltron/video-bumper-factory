import { params } from "@/lib/constants";
import { v2 as cloudinary } from "cloudinary";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentIntentId = searchParams.get(params.PAYMENT_INTENT_ID);

  const body = await request.json();
  console.log("body in signing: ", body);

  if (!paymentIntentId) {
    return new Response("Missing paymentIntendId", { status: 400 });
  }

  // 1.Verify payment
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
  // console.log("intent in Cloudinary signing request: ", intent);

  if (intent.status !== "succeeded") {
    return new Response("Payment not completed", { status: 403 });
  }

  const timestamp = body?.paramsToSign.timestamp;
  const uploadPreset = body?.paramsToSign.uploadPreset;

  if (!timestamp) return new Response("Missing timestamp", { status: 400 });

  // 2.Merge Cloudinary widget params with your trusted params
  const paramsToSign = {
    timestamp,
    upload_preset: uploadPreset,
    folder: `videobumper/orders/${intent.id}`,
    public_id: "logo",
    context: {
      orderId: intent.id,
      email: intent.receipt_email,
      amount: intent.amount,
    },
  };

  // 3.Sign
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!,
  );

  console.log("signature: ", signature);

  return Response.json({
    ...paramsToSign,
    signature,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  });
}
