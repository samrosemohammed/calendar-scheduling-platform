import { useRef } from "react";
import { mergeProps, useCalendarCell, useFocusRing } from "react-aria";
import { CalendarState } from "@react-stately/calendar";
import {
  CalendarDate,
  isToday,
  getLocalTimeZone,
} from "@internationalized/date";
import { cn } from "@/app/lib/utils";
export const CalendarCell = ({
  state,
  date,
  isUnavailable,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
  isUnavailable?: boolean;
}) => {
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isDateToday = isToday(date, getLocalTimeZone());
  const finallyIsDisabled = isDisabled || isUnavailable;
  return (
    <td
      {...cellProps}
      className={`p-y-0.5 px-0.5 relative ${isFocusVisible ? "z-10" : "z-0"}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        className="size-10 sm:size-12 outline-none group rounded-md"
        ref={ref}
        hidden={isOutsideVisibleRange}
      >
        <div
          className={cn(
            "size-full rounded-sm flex items-center justify-center text-sm font-semibold",
            isSelected ? "bg-primary text-white" : "",
            finallyIsDisabled ? "text-muted-foreground cursor-not-allowed" : "",
            !isSelected && !finallyIsDisabled ? "bg-secondary" : ""
          )}
        >
          {formattedDate}
          {isDateToday && (
            <div
              className={cn(
                "absolute bottom-3 left-1/2 transform -translate-x-1/5 translate-y-1/2 size-1.5 bg-primary rounded-full",
                isSelected && "bg-white"
              )}
            />
          )}
        </div>
      </div>
    </td>
  );
};
