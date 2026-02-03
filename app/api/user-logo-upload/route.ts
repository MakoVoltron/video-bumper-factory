import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import formidable, { File as FormidableFile } from "formidable";
import { IncomingMessage } from "http";
import { params } from "@/lib/constants";
import { error } from "console";
import { email } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* -------------------- Helpers -------------------- */
function parseForm(req: IncomingMessage): Promise<{
  fields: formidable.Fields;
  files: formidable.Files;
}> {
  const form = formidable({
    allowEmptyFiles: false,
    multiples: true,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

function getStringField(fields: formidable.Fields, key: string): string {
  const value = fields[key];
  if (typeof value !== "string") {
    throw new Error(`Missing or invalid ${key}`);
  }
  return value;
}

function normalizeFiles(
  input?: FormidableFile | FormidableFile[],
): FormidableFile[] {
  if (!input) return [];
  return Array.isArray(input) ? input : [input];
}

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const paymentIntentId = formData.get(params.PAYMENT_INTENT_ID);

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

  /* ---- Verify Stripe payment ---- */
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (intent.status !== "succeeded") {
    return new Response("Payment not completed", { status: 403 });
  }

  /* ---- Upload to Cloudinary ---- */
  const uploads = await Promise.all(
    files.map(async (file, index) => {
      const buffer = Buffer.from(await file.arrayBuffer());

      return new Promise<{ public_id: string; secure_url: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: `videobumper/orders/${intent.id}`,
                public_id: files.length === 1 ? "logo" : `logo_${index + 1}`,
                overwrite: true,
                resource_type: "image",
                context: {
                  orderId: intent.id,
                  email: intent.receipt_email ?? "",
                  amount: intent.amount,
                },
              },
              (err, result) => {
                if (err || !result) reject(err);
                else resolve(result);
              },
            )
            .end(buffer);
        },
      );
    }),
  );

  return NextResponse.json({
    files: uploads.map((u) => ({
      public_id: u.public_id,
      secure_url: u.secure_url,
    })),
  });
};
