"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { APIError } from "better-auth";
import { prisma } from "../db/client";

export type SignInState = {
  success: boolean;
  message?: string;
};

export type SignUpState = SignInState;

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim());

export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    await auth.api.signUpEmail({
      body: { email, password, name, role: "USER" },
      headers: await headers(),
    });

    // auto-assing role
    const role = ADMIN_EMAILS.includes(email) ? "ADMIN" : "USER";
    await prisma.user.update({ where: { email }, data: { role } });

    return { success: true, message: "You were logged in" };

    // redirect("/");
  } catch (error) {
    console.log(error);

    const message =
      error instanceof APIError
        ? (error.body?.message ?? "Could not create your account")
        : "Sign up failed";

    return { success: false, message };
  }
}

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });

    redirect("/");
  } catch (error) {
    const message =
      error instanceof APIError
        ? (error.body?.message ?? "Invalid credentials")
        : "Sign-in failed";

    redirect(`/signin?error=${encodeURIComponent(message)}`);
  }
}

// export async function signInAction(
//   prevState: SignInState,
//   formData: FormData
// ): Promise<SignInState> {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   try {
//     await auth.api.signInEmail({
//       body: { email, password },
//       headers: await headers(),
//     });

//     return { success: true, message: "You were logged in" };
//   } catch (error) {
//     return {
//       success: false,
//       message: extractAuthErrorMessage(error),
//     };
//   }
// }

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
}
