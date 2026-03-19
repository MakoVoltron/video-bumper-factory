import { Resend } from "resend";

export async function POST(req: Request) {
  const payload = await req.json();
  if (payload.type !== "email.received") return;

  const resend = new Resend(process.env.RESEND_API_KEY!);

  // 1. Fetch full email via Resend API
  const email = await resend.emails.get(payload.data.email_id);

  // 2. Forward to your Gmail
  await resend.emails.send({
    from: process.env.RESEND_EMAIL_FROM ?? "hello@videobumperfactory.com",
    to: process.env.ADMIN_EMAILS ?? "matej.valtr@gmail.com",
    subject: "New order from Video Bumper Factory",
    html: email.data?.html as string,
    replyTo: email.data?.from as string,
  });
}
