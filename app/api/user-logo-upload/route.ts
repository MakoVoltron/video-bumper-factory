export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import type { UploadApiResponse } from "cloudinary";
import Stripe from "stripe";
import { APP, MAX_FILE_SIZE_MB, params } from "@/lib/constants";
import getCloudinary from "@/lib/upload/cloudinary";
import { prisma } from "@/lib/db/client";
import { OrderStatus } from "@prisma/client";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const cloudinary = await getCloudinary();

  const paymentIntentId = formData.get(params.PAYMENT_INTENT_ID);
  const notes = formData.get("notes");

  if (typeof paymentIntentId !== "string") {
    return NextResponse.json(
      { error: "Missing paymentIntentId" },
      { status: 400 },
    );
  }

  const files = formData
    .getAll("file")
    .filter((f): f is File => f instanceof File);

  if (!files.length) {
    return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
  }

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(
        { error: `File ${file.name} exceeds ${MAX_FILE_SIZE_MB} MB limit` },
        { status: 413 },
      );
    }
  }

  /* ---- Verify Stripe payment ---- */
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (intent.status !== "succeeded") {
    return new Response("Payment not completed", { status: 403 });
  }

  /* ---- Upload to Cloudinary ---- */
  const uploads = await Promise.all(
    files.map(async (file, index) => {
      const buffer = Buffer.from(await file.arrayBuffer());

      return new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: `videobumper/orders/${intent.receipt_email}`,
              public_id: files.length === 1 ? "logo" : `logo_${index + 1}`,
              overwrite: true,
              resource_type: "auto",
              context: {
                orderId: intent.id,
                email: intent.receipt_email,
                amount: intent.amount,
                template: intent.metadata.templateTitle,
              },
            },
            (err, result) => {
              if (err || !result) reject(err);
              else resolve(result);
            },
          )
          .end(buffer);
      });
    }),
  );

  const existingOrder = await prisma.order.findUnique({
    where: { paymentIntentId },
  });
  console.log("Looking for order with paymentIntentId:", paymentIntentId);
  console.log("Found order:", existingOrder);

  // Update order with notes
  const order = await prisma.order.update({
    where: {
      paymentIntentId,
    },
    data: {
      notes: notes as string,
      status: OrderStatus.ASSET_UPLOADED,
      assets: {
        createMany: {
          data: uploads.map((u) => ({
            publicId: u.public_id,
            secureUrl: u.secure_url,
          })),
        },
      },
    },
  });

  console.log("Order updated:", order);

  // notify admin on email
  const resend = new Resend(process.env.RESEND_API_KEY!);

  await resend.emails.send({
    from: `${APP.NAME} <${process.env.RESEND_EMAIL_FROM}>`,
    to: process.env.ADMIN_EMAILS ?? "matej.valtr@gmail.com",
    subject: "New logo uploaded!",
    html: `
    <p>A customer just uploaded their logo.</p>
    <p>Go check it out!</p>

    `,
  });

  return NextResponse.json({
    files: uploads.map((u) => ({
      public_id: u.public_id,
      secure_url: u.secure_url,
    })),
  });
};
