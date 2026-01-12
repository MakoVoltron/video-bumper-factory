import SignUpForm from "./credentials-signup-form";

export default async function SignUpPage() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // if (session) {
  //   return redirect("/");
  // }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <SignUpForm />
    </div>
  );
}
