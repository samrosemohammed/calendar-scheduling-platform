import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
import { getAuthUserSession } from "../lib/hooks";

const page = async () => {
  // check if the user is authenticated
  const session = await getAuthUserSession();

  return <div>Hello</div>;
};

export default page;
