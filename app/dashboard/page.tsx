import { redirect } from "next/navigation";
import { auth } from "../lib/auth";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">Hello</div>
  );
};

export default page;
