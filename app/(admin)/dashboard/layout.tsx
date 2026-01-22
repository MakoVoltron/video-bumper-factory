import NavItem from "@/components/ui/NavItem";
import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="w-full flex">
      <div className="bg-gray-900/50 w-[180px] h-screen flex justify-start p-3">
        <div className="mt-20 w-full space-y-2">
          <NavItem href="/dashboard" label="Add new"></NavItem>
          <NavItem href="/dashboard/templates" label="Templates"></NavItem>
        </div>
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
