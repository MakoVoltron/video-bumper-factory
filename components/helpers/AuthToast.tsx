"use client";

import { toastParam } from "@/lib/constants";
import { useSearchParams, useRouter } from "next/navigation";

import { useEffect } from "react";
import { toast } from "react-toastify";

const AuthToast = () => {
  const params = useSearchParams();
  const router = useRouter();

  const toastType = params.get("toast");

  useEffect(() => {
    if (!toastType) return;

    if (toastType === toastParam.signinSuccess) {
      toast.success("Welcome back 👋");
    }

    if (toastType === toastParam.logoUploadSuccess) {
      toast.success("Logo sent! We'll be in touch soon 💪");
    }

    const newParams = new URLSearchParams(params.toString());
    newParams.delete("toast");

    const query = newParams.toString();
    router.replace(query ? `?${query}` : window.location.pathname, {
      scroll: false,
    });
  }, [toastType, params, router]);

  return null;
};

export default AuthToast;
