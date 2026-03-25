"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Spinner from "./Spinner";
import { CheckoutTemplate } from "@/types/video";
import { product } from "@/lib/constants";

const StripeCheckoutForm = dynamic(
  () => import("@/components/StripeCheckoutForm"),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

const TemplateCheckoutTrigger = ({
  template,
}: {
  template: CheckoutTemplate;
}) => {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="p-3 bg-blue-500 w-full rounded-md text-white font-bold cursor-pointer hover:bg-blue-600"
      >
        Buy now for only ${product.price / 100} USD
      </button>
    );
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <StripeCheckoutForm template={template} />
    </div>
  );
};

export default TemplateCheckoutTrigger;
