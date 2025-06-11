import { EmptyState } from "@/app/components/EmptyState";
import { GeneralButton } from "@/app/components/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { cancelEventAction, getUserSession } from "@/app/lib/action";
import { nylas } from "@/app/lib/nylas";
import { prisma } from "@/app/lib/prisma";
import { formatDate, fromUnixTime } from "date-fns";
import { Video } from "lucide-react";

const getData = async (userId: string) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  });
  if (!userData) {
    throw new Error("User not found");
  }
  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });
  return data;
};
const page = async () => {
  const session = await getUserSession();
  const data = await getData(session?.user?.id as string);

  return (
    <>
      {!data.data.length ? (
        <EmptyState
          title="No Meeting Founds"
          description="You don't have any meetings yet."
          buttonText="Create a New Event Type"
          href="/dashboard/create-new-event-type"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              See upcoming meetings and manage your bookings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => (
              <form key={item.id} action={cancelEventAction}>
                <input name="eventId" type="hidden" value={item.id} />
                <div className="grid grid-cols-3 justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {formatDate(
                        // @ts-ignore
                        fromUnixTime(item.when.startTime),
                        "EEE, dd MMM"
                      )}
                    </p>
                    <p>
                      {/* @ts-ignore */}
                      {formatDate(fromUnixTime(item.when.startTime), "hh:mm a")}
                      {" - "}
                      {/* @ts-ignore */}
                      {formatDate(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>
                    <div className="flex items-center mt-1">
                      <Video className="size-4 mr-2 text-primary" />
                      <a
                        className="text-xs text-primary underline underline-offset-4"
                        // @ts-ignore
                        href={item.conferencing.details.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Join Meeting"
                      >
                        Join Meeting
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      You and {item.participants[0].name}
                    </p>
                  </div>
                  <GeneralButton
                    variant={"destructive"}
                    buttonText="Cancel Event"
                    loadingText="Loading"
                    className="ml-auto w-fit flex"
                  />
                </div>
                <Separator className="my-3" />
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};
export default page;
