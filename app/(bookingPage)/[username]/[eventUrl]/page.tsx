import { Calendar } from "@/app/components/bookeFrom/Calendar";
import { RenderCalendar } from "@/app/components/bookeFrom/RenderCalendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { prisma } from "@/app/lib/prisma";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatDate } from "date-fns";

const getData = async (eventUrl: string, username: string) => {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      user: {
        username: username,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,
      user: {
        select: {
          image: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
          name: true,
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
};
const page = async ({
  params,
  searchParams,
}: {
  params: { username: string; eventUrl: string };
  searchParams: { date?: string };
}) => {
  const { username, eventUrl } = params;
  const data = await getData(eventUrl, username);
  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();
  return (
    <div className="min-h-screen w-screen flex items-center jusityf-center">
      <Card className="max-w-[1000px] w-full mx-auto">
        <CardHeader>
          <CardTitle>Booking Page</CardTitle>
          <CardDescription>
            This is the booking page for the event. You can customize it further
            based on your requirements.
          </CardDescription>
          <CardContent className="p-5 md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4">
            <div>
              <Image
                width={40}
                height={40}
                src={data.user?.image as string}
                alt="Profile image of user"
                className="rounded-full"
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.user?.name}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data.description}
              </p>
              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formatDate(selectedDate, "PPPP")}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} Minutes
                  </span>
                </p>
                <p className="flex items-center">
                  <VideoIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>
            <Separator className="h-full w-[1px]" orientation="vertical" />
            <RenderCalendar availability={data.user?.availability as any} />
            <Separator className="h-full w-[1px]" orientation="vertical" />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};
export default page;
