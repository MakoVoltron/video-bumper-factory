"use client";

import Spinner from "@/components/ui/Spinner";
import UploadLogo from "@/components/UploadLogo";
import { axiosClient } from "@/lib/axios";
import { params, route } from "@/lib/constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type PurchaseSummary = {
  templateTitle: string;
  amount: number;
  email: string;
};

const SuccessPage = () => {
  const urlParams = useSearchParams();
  const paymentIntentId = urlParams.get(params.PAYMENT_INTENT);

  const [data, setData] = useState<PurchaseSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderReady, setOrderReady] = useState(false);

  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!paymentIntentId) {
      setLoading(false);
      return;
    }

    let mounted = true;

    const pollOrder = async () => {
      for (let i = 0; i < 10; i++) {
        const res = await axiosClient.get(
          `/orders/check?${params.PAYMENT_INTENT_ID}=${paymentIntentId}`,
        );
        if (res.data.exists) {
          if (mounted) setOrderReady(true);
          return;
        }
        await new Promise((r) => setTimeout(r, 1500)); // wait 1.5s between attemp
      }
    };

    const fetchPayment = async () => {
      try {
        const [res] = await Promise.all([
          axiosClient.get<PurchaseSummary>(
            `${route.paymentIntent}/${paymentIntentId}`,
          ),
          pollOrder(),
        ]);

        if (mounted) {
          setData(res.data);
        }
      } catch (error) {
        if (mounted) {
          const errorMsg =
            error instanceof Error
              ? error.message
              : "Payment not found or not completed";

          toast.error(errorMsg);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPayment();

    return () => {
      mounted = false;
    };
  }, [paymentIntentId]);

  if (loading)
    return (
      <div className="flex-col items-center justify-center">
        <div className="flex justify-center mb-2">
          <Spinner />
        </div>
        <div>Verifying payment...</div>
      </div>
    );

  if (!data || !paymentIntentId) return <div>Payment not found</div>;

  return (
    <div className="w-md md:w-xl p-4 space-y-2">
      <h2 className="text-2xl font-bold">Thank you for your payment!</h2>
      <p>Now, please, upload your logo file below:</p>

      {data && orderReady && <UploadLogo paymentIntentId={paymentIntentId} />}
      {data && !orderReady && (
        <p className="text-sm text-gray-500">Preparing your order...</p>
      )}
    </div>
  );
};

export default SuccessPage;
