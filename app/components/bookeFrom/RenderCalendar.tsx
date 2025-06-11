"use client";

import { Calendar } from "./Calendar";
import {
  today,
  getLocalTimeZone,
  parseDate,
  CalendarDate,
} from "@internationalized/date";
import { DateValue } from "@react-types/calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface RenderCalendarProps {
  availability: {
    day: string;
    isActive: boolean;
  }[];
}
export const RenderCalendar = ({ availability }: RenderCalendarProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [date, setDate] = useState(() => {
    const dateParams = searchParams.get("date");
    return dateParams ? parseDate(dateParams) : today(getLocalTimeZone());
  });

  useEffect(() => {
    const dateParams = searchParams.get("date");
    if (dateParams) {
      setDate(parseDate(dateParams));
    }
  }, [searchParams]);
  const handleDateChange = (date: DateValue) => {
    setDate(date as CalendarDate);
    const url = new URL(window.location.href);
    url.searchParams.set("date", date.toString());
    router.push(url.toString());
  };
  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
    const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return !availability[adjustedIndex]?.isActive;
  };
  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
      value={date}
      onChange={handleDateChange}
    />
  );
};
