"use client";

import { axiosClient } from "@/lib/axios";
import { endpoint, product, route } from "@/lib/constants";
import { Template } from "@/types/video";
import { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Spinner from "./ui/Spinner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

type StripeCheckoutFormProps = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const StripeFormInner = ({ onSuccess, onError }: StripeCheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${route.success}`,
        receipt_email: email,
      },
    });

    setLoading(false);

    if (result.error) {
      console.error(result.error.message);
      onError?.(result.error.message ?? "Payment failed");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <input
          className="p-3 border border-gray-200 rounded-md w-full bg-white"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className="text-xs text-red-500 m-1">
          Email for delivering your final logo animation.
        </p>
      </div>

      <div>
        <PaymentElement options={{ wallets: { link: "never" } }} />
      </div>

      <button
        className="p-3 bg-blue-500 w-full rounded-md text-white font-bold cursor-pointer hover:bg-blue-600"
        type="submit"
        disabled={!stripe || !elements || loading}
      >
        {loading ? "Processing..." : `Pay ${product.price / 100} USD`}
      </button>
    </form>
  );
};

const StripeCheckoutForm = ({ template }: { template: Template }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    axiosClient
      .post(endpoint.createSession, {
        templateId: template.id,
        templateTitle: template.title,
      })
      .then((res) => {
        console.log("axios res");
        console.log(res);

        if (mounted) {
          setClientSecret(res.data.clientSecret);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [template.id, template.title]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripeFormInner />
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckoutForm;
