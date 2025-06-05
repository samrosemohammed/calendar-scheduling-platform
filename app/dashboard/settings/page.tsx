import { SettingCards } from "@/app/components/SettingsCard";
import { getUserSession } from "@/app/lib/action";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
};
const page = async () => {
  const session = await getUserSession();
  const data = await getData(session?.user?.id as string);
  return (
    <SettingCards
      fullName={data?.name as string}
      email={data?.email as string}
      profileImage={data?.image as string}
    />
  );
};
export default page;
