"use client";

import { Calendar } from "./Calendar";
import { today, getLocalTimeZone } from "@internationalized/date";

export const RenderCalendar = () => {
  return <Calendar minValue={today(getLocalTimeZone())} />;
};
