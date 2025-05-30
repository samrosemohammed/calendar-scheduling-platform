import { redirect } from "next/navigation";
import { auth } from "../lib/auth";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return <div>Hello</div>;
};

export default page;
