import { redirect } from "next/navigation";
import { NavBar } from "./components/Navbar";
import { getAuthUserSession } from "./lib/hooks";

export default async function Home() {
  const session = await getAuthUserSession();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <NavBar />
    </div>
  );
}
