"use client";

import { signUpAction } from "@/lib/actions/auth";
import { useState } from "react";

const SignUpForm = () => {
  const [response, setResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await signUpAction(formData);

    setResponse(result);
    setSubmitting(false);

    if (response?.success) {
      e.currentTarget.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
      <input
        className="border py-2 px-3 rounded-xl"
        type="text"
        name="name"
        placeholder="Name"
        required
      />
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
      <button
        className="w-full bg-purple-500 hover:bg-purple-600 py-2 px-3 rounded-xl"
        type="submit"
        disabled={submitting}
      >
        {submitting ? "Signing Up" : "Sign Up"}
      </button>

      {response?.message && <div>{response.message}</div>}
    </form>
  );
};

export default SignUpForm;
