import { notFound } from "next/navigation";
import { prisma } from "../lib/prisma";
import { getUserSession } from "../lib/action";
import { EmptyState } from "../components/EmptyState";

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
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
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title={"You have no Event Types"}
          description={
            "You can create your first event type by clicking the button below"
          }
          buttonText={"Add event type"}
          href="/dashboard/create-new-event-type"
        />
      ) : (
        <p>Data</p>
      )}
    </>
  );
};

export default page;
