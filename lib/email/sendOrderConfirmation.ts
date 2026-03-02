import { Resend } from "resend";
import { APP, defaultValues, params } from "../constants";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface OrderParams {
  to: string;
  orderId: string;
  amount: number;
  payment_intent: string;
}

export async function sendOrderConfirmation({
  to,
  orderId,
  amount,
  payment_intent,
}: OrderParams) {
  console.log("sending email...");

  try {
    await resend.emails.send({
      from: `${APP.NAME} <${defaultValues.emailFrom}>`,
      to,
      subject: `Order #${orderId} confirmed`,
      html: `
        <h1>Thank you for your purchase</h1>
        <p>Your order <strong>#${orderId}</strong> has been confirmed.</p>
        <p>Total paid: ${(amount / 100).toFixed(2)} €</p>
        <p>Please, upload your logo files in the link below:</p>
        <a href='${APP.URL}/payment/success?${params.PAYMENT_INTENT}=${payment_intent}' >Upload logo</a>
        `,
    });
  } catch (error) {
    console.error("Resend error:", error);
  }
}
