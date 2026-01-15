import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AddTemplateForm from "./add-template-form";

export default async function AdminDashboard() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/");
  }

  console.log(session);

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  console.log(user);

  if (user && user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="h-screen w-full">
      <div className="p-4 space-y-4 px-28">
        <h2 className="text-xl">Dashboard</h2>
        <h3>Add New Template</h3>
        <AddTemplateForm />
      </div>
    </div>
  );
}
