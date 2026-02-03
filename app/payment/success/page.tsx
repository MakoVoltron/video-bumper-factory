"use client";

import Spinner from "@/components/ui/Spinner";
import UploadLogo from "@/components/UploadLogo";
import { axiosClient } from "@/lib/axios";
import { params, route } from "@/lib/constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!paymentIntentId) {
      setLoading(false);
      return;
    }

    let mounted = true;

    const fetchPayment = async () => {
      try {
        const res = await axiosClient.get<PurchaseSummary>(
          `${route.paymentIntent}${paymentIntentId}`,
        );

        if (mounted) {
          setData(res.data);
        }
      } catch (error) {
        if (mounted) {
          setError(
            error instanceof Error
              ? error.message
              : "Payment not found or not completed",
          );
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
        <div>Veryfing payment...</div>
      </div>
    );
  if (!data || !paymentIntentId) return <div>Payment not found</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold">Thank you for your payment!</h2>
      <p>Now, please, upload your logo file below:</p>
      <div>{data.templateTitle}</div>
      <UploadLogo paymentIntentId={paymentIntentId} />
    </div>
  );
};

export default SuccessPage;
