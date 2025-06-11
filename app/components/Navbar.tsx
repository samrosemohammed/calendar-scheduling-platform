import Link from "next/link";
import { AuthDialog } from "./AuthDialog";
import { ThemeToggle } from "../dashboard/(components)/ThemeToggle";

export const NavBar = () => {
  return (
    <div className="flex items-center justify-between py-5">
      <Link className="text-xl font-bold" href={"/"}>
        Cal<span className="text-blue-500">Scheduler</span>
      </Link>
      <div className="hidden md:flex md:justify-end md:space-x-4">
        <ThemeToggle />
        <AuthDialog />
      </div>
    </div>
  );
};
