"use client";
import { useCalendar, useLocale } from "react-aria";
import { useCalendarState } from "react-stately";
import { createCalendar } from "@internationalized/date";
import { CalendarProps, DateValue } from "@react-types/calendar";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";

export const Calendar = (
  props: CalendarProps<DateValue> & {
    isDateUnavailable?: (date: DateValue) => boolean;
  }
) => {
  const { locale } = useLocale();
  let state = useCalendarState({
    createCalendar,
    ...props,
    visibleDuration: { months: 1 },
    locale,
  });
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );
  return (
    <div {...calendarProps} className="inline-block">
      <CalendarHeader
        state={state}
        calenderProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <div className="flex gap-8">
        <CalendarGrid
          isDateUnavailable={props.isDateUnavailable}
          state={state}
        />
      </div>
    </div>
  );
};
