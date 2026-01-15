import { signOut } from "@/lib/actions/auth";
import Button from "../ui/Button";

const AdminNavbar = () => {
  return (
    <div className="fixed top-0 left-0 z-50 py-3 px-10 bg-purple-900 w-full text-center flex justify-between items-center">
      <div>YOU ARE LOGGED IN AS ADMIN</div>
      <div>
        <form action={signOut}>
          <Button text="Logout" size="sm" />
        </form>
      </div>
    </div>
  );
};

export default AdminNavbar;
