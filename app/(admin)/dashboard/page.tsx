import Input from "@/components/ui/Input";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
    <div className="h-screen w-full px-28">
      <div className="p-4 space-y-4">
        <h2 className="text-xl">Dashboard</h2>
        <h3>Add New Template</h3>
        <form>
          <div className="grid grid-cols-12 gap-2">
            <Input name="templateName" placeholder="Template name" cols="12" />
            <Input name="poster" placeholder="Poster" type="file" cols="6" />
            <Input
              name="preview"
              placeholder="Video Preview"
              type="file"
              cols="6"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
