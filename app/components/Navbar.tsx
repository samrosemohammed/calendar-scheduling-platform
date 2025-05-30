import Link from "next/link";
import { AuthDialog } from "./AuthDialog";

export const NavBar = () => {
  return (
    <div className="flex items-center justify-between py-5">
      <Link className="text-xl font-bold" href={"/"}>
        Cal<span className="text-blue-500">Scheduler</span>
      </Link>
      <AuthDialog />
    </div>
  );
};
