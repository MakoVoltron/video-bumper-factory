import { Resend } from "resend";
import { APP, defaultValues, params } from "../constants";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface OrderParams {
  to: string;
  payment_intent: string;
  templateTitle: string;
}

export async function sendOrderConfirmation({
  to,
  payment_intent,
  templateTitle,
}: OrderParams) {
  console.log("sending email...");

  try {
    await resend.emails.send({
      from: `${APP.NAME} <${defaultValues.emailFrom}>`,
      to,
      subject: `Order placed! Now we need your logo!`,
      html: `
        <h2>Thank you for your payment</h2>
        <p>Your order <strong>#${templateTitle}</strong> has been confirmed.</p>
        <p>In order to start working on your video bumper, please, upload your logo files in the link below:</p>
        <a href='${APP.URL}/payment/success?${params.PAYMENT_INTENT}=${payment_intent}'>👉 Upload logo</a>
        <p>After receiving your logo, we'll get back to you within 48 hours with finished bumper. </p>
        <p><em>Note: For the best results, please, upload PNG file without background or .PSD/.AI project files.</em></p>
        <p>With love, Mate from Video Bumper Factory</p>

        `,
    });
  } catch (error) {
    console.error("Resend error:", error);
  }
}
