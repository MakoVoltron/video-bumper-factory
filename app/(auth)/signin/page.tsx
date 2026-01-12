import { auth } from "@/lib/auth";
import SignInForm from "./credentials-signin-form";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log(session);

  if (session) redirect("/");

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <SignInForm />
    </div>
  );
}
