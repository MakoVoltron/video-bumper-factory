"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignInButton = ({ loading }: { loading: boolean }) => {
  return (
    <button
      className="w-full bg-purple-500 hover:bg-purple-600 py-2 px-3 rounded-xl"
      type="submit"
      disabled={loading}
    >
      {loading ? "Logging..." : "Log In"}
    </button>
  );
};

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await signIn.email(
      { email, password, callbackURL: "/post-auth" },
      {
        onError: (error: unknown) => {
          form.reset();
          if (error instanceof Error) {
            toast.warn(error.message);
          } else {
            toast.warn("Sign in failed.");
          }
        },
      }
    );

    console.log(user);

    setLoading(false);
  }

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-3 w-64">
      <input
        className="border py-2 px-3 rounded-xl"
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        className="border py-2 px-3 rounded-xl"
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <SignInButton loading={loading} />

      {error && <p>{decodeURIComponent(error)}</p>}
    </form>
  );
};

export default SignInForm;
