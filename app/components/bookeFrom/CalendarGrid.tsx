import { useCalendarGrid, useLocale } from "react-aria";
import { CalendarState } from "@react-stately/calendar";
import { DateDuration, endOfMonth } from "@internationalized/date";
import { CalendarCell } from "./CalendarCell";
export const CalendarGrid = ({
  state,
  offset = {},
}: {
  state: CalendarState;
  offset?: DateDuration;
}) => {
  let { locale } = useLocale();
  const startDate = state.visibleRange.start.add(offset);
  const endDate = endOfMonth(startDate);
  let { gridProps, headerProps, weekDays, weeksInMonth } = useCalendarGrid(
    {
      startDate,
      endDate,
      weekdayStyle: "short",
    },
    state
  );

  return (
    <table {...gridProps} cellPadding={0} className="flex-1">
      <thead {...headerProps} className="text-sm font-medium">
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={i}
                    state={state}
                    date={date}
                    currentMonth={startDate}
                  />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
