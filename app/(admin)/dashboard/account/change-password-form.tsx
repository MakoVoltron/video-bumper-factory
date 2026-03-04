"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    try {
      await authClient.changePassword({
        currentPassword,
        newPassword,
      });
      toast.success("Password updated successfully");

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update password.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 space-y-4 px-28">
      <h2 className="text-xl">Update password</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-2 mb-2">
          <div className="md:col-span-4 grid gap-2">
            <Input
              name="currentPassword"
              placeholder="Current Password"
              cols="12"
            />
            <Input name="newPassword" placeholder="New Password" cols="12" />

            <Button
              type="submit"
              disabled={loading}
              text={loading ? "Submitting..." : "Submit"}
              size="sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
