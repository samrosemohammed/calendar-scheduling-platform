import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { string } from "zod";

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
    },
  });
  if (!data?.username) {
    return redirect("/onboarding");
  }
  return data;
};
const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const data = await getData(session.user?.id as string);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">Hello</div>
  );
};

export default page;
