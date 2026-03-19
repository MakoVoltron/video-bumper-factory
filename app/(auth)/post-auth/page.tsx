import { auth } from "@/lib/auth";
import { toastParam } from "@/lib/constants";
import { prisma } from "@/lib/db/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const PostAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user && user.role === "ADMIN") {
    redirect("/dashboard");
  } else {
    redirect(`/?toast=${toastParam.signinSuccess}`);
  }
};

export default PostAuth;
