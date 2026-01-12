"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { useEffect } from "react";
import { toast } from "react-toastify";

const AuthToast = () => {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const toastType = params.get("toast");

    if (toastType === "signin-success") {
      toast.success("Welcome back 👋");
    }

    // remove param
    const url = new URL(window.location.href);
    url.searchParams.delete("toast");
    router.replace(url.pathname, { scroll: false });
  }, [params, router]);

  return null;
};

export default AuthToast;
