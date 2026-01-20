"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { useEffect } from "react";
import { toast } from "react-toastify";

const AuthToast = () => {
  const params = useSearchParams();
  const router = useRouter();

  const toastType = params.get("toast");

  useEffect(() => {
    if (!toastType) return;

    if (toastType === "signin-success") {
      toast.success("Welcome back 👋");
    }

    const newParams = new URLSearchParams(params.toString());
    newParams.delete("toast");

    const query = newParams.toString();
    router.replace(query ? `?${query}` : "", { scroll: false });
  }, [toastType, params, router]);

  return null;
};

export default AuthToast;
