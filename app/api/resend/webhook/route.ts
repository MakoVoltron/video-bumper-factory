import { Resend } from "resend";
import { Webhook } from "svix";

type ResendWebhookEmailReceived = {
  type: "email.received";
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
    html?: string;
    text?: string;
    headers: Record<string, string>;
    attachments?: {
      filename: string;
      content: string; // base64
      content_type: string;
    }[];
  };
};

type ResendWebhookPayload = ResendWebhookEmailReceived;

export async function POST(req: Request) {
  // 1. Verify signature
  const secret = process.env.RESEND_WEBHOOK_SECRET!;
  const body = await req.text();
  const headers = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };

  let payload: ResendWebhookEmailReceived;

  try {
    const wh = new Webhook(secret);
    payload = wh.verify(body, headers) as ResendWebhookPayload;
  } catch (err) {
    console.log("Error signing email: ", err);
    return new Response("Invalid signature", { status: 400 });
  }

  if (payload.type !== "email.received") {
    return new Response("Event type not handled", { status: 200 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY!);
  const email = await resend.emails.get(payload.data.email_id);

  // 2. Forward to your Gmail
  await resend.emails.send({
    from: process.env.RESEND_EMAIL_FROM ?? "hello@videobumperfactory.com",
    to: process.env.ADMIN_EMAILS ?? "matej.valtr@gmail.com",
    subject: "New order from Video Bumper Factory",
    html: email.data?.html as string,
    replyTo: email.data?.from as string,
  });

  return new Response("OK", { status: 200 });
}
