import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";
import SuccessContent from "./success-content";

// SuccessContent reads the payment_intent query param via useSearchParams, so
// it must render inside a Suspense boundary (otherwise it bails the whole route
// to client-side rendering and breaks the static build).
export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-col items-center justify-center">
          <div className="flex justify-center mb-2">
            <Spinner />
          </div>
          <div>Verifying payment...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
