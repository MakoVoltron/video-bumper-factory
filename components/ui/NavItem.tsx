"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children?: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      prefetch={true}
      className={`text-white text-sm border-2 border-purple-900 w-full block rounded-xl p-2 ${pathname === href && "bg-purple-900/40"}`}
    >
      {children}
      {label}
    </Link>
  );
};

export default NavItem;
