import { Prisma } from "@/app/generated/prisma";
import { nylas } from "@/app/lib/nylas";
import { prisma } from "@/app/lib/prisma";
import {
  addMinutes,
  format,
  formatDate,
  fromUnixTime,
  isAfter,
  isBefore,
  parse,
} from "date-fns";
import Link from "next/link";
import { GetFreeBusyResponse, NylasResponse } from "nylas";
import { Button } from "../ui/button";

interface TimeTableProps {
  selectedDate: Date;
  userName: string;
  duration: number;
}
const getData = async (userName: string, selectedDate: Date) => {
  const currentDay = formatDate(selectedDate, "EEEE").toUpperCase();
  const startofDay = new Date(selectedDate);
  startofDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);
  const data = await prisma.availability.findFirst({
    where: {
      day: currentDay as Prisma.EnumDayFilter,
      user: { username: userName },
    },
    select: {
      fromTime: true,
      tillTime: true,
      id: true,
      user: {
        select: {
          grantEmail: true,
          grantId: true,
        },
      },
    },
  });
  const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier: data?.user?.grantId as string,
    requestBody: {
      startTime: Math.floor(startofDay.getTime() / 1000),
      endTime: Math.floor(endOfDay.getTime() / 1000),
      emails: [data?.user?.grantEmail as string],
    },
  });
  return { data, nylasCalendarData };
};

const calcualteAvailableTime = (
  date: string,
  dbAvailability: {
    fromTime: string | undefined;
    tillTime: string | undefined;
  },
  nylasData: NylasResponse<GetFreeBusyResponse[]>,
  duration: number
) => {
  const now = new Date();
  const availableFrom = parse(
    `${date} ${dbAvailability.fromTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );
  const availableTill = parse(
    `${date} ${dbAvailability.tillTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );
  //@ts-ignore
  const busySlots = nylasData.data[0].timeSlots.map((slot) => ({
    start: fromUnixTime(slot.startTime),
    end: fromUnixTime(slot.endTime),
  }));
  const allSlots = [];
  let currentSlot = availableFrom;
  while (isBefore(currentSlot, availableTill)) {
    allSlots.push(currentSlot);
    currentSlot = addMinutes(currentSlot, duration);
  }
  const freeSlots = allSlots.filter((slot) => {
    const slotEnd = addMinutes(slot, duration);

    return (
      isAfter(slot, now) &&
      !busySlots.some(
        (busy: { start: any; end: any }) =>
          (!isBefore(slot, busy.start) && !isBefore(slotEnd, busy.end)) ||
          (isBefore(slot, busy.start) && isAfter(slotEnd, busy.end)) ||
          (isBefore(slot, busy.start) && isAfter(slotEnd, busy.end))
      )
    );
  });
  return freeSlots.map((slot) => format(slot, "HH:mm"));
};
export const TimeTable = async ({
  selectedDate,
  userName,
  duration,
}: TimeTableProps) => {
  const { data, nylasCalendarData } = await getData(userName, selectedDate);
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const dbAvailability = {
    fromTime: data?.fromTime,
    tillTime: data?.tillTime,
  };
  const availableSlot = calcualteAvailableTime(
    formattedDate,
    dbAvailability,
    nylasCalendarData,
    duration
  );

  return (
    <div>
      <p className="text-base font-semibold">
        {formatDate(selectedDate, "EEE")}{" "}
        <span className="text-sm text-muted-foreground">
          {formatDate(selectedDate, "MMM. d")}
        </span>
      </p>
      <div className="mt-3 max-h-[350px] overflow-y-auto">
        {availableSlot.length > 0 ? (
          availableSlot.map((slot, index) => (
            <Link
              key={index}
              href={`?date=${format(selectedDate, "yyyy-MM-dd")}&time=${slot}`}
            >
              <Button variant={"outline"} className="w-full mb-2 ">
                {slot}
              </Button>
            </Link>
          ))
        ) : (
          <p>No time slot available</p>
        )}
      </div>
    </div>
  );
};
