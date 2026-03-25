import { signOut } from "@/lib/actions/auth";
import Button from "../ui/Button";
import Link from "next/link";

const AdminNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 py-3 px-10 bg-purple-900 w-full text-center flex justify-between items-center">
      <div>YOU ARE LOGGED IN AS ADMIN</div>
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <button className="text-purple-900 text-sm font-bold bg-purple-600 hover:bg-purple-700 transition-all duration-300 px-3 py-1 cursor-pointer rounded-full">
            Dashboard
          </button>
        </Link>
        <form action={signOut}>
          <Button text="Logout" size="sm" />
        </form>
      </div>
    </div>
  );
};

export default AdminNavbar;
