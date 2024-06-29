import React, { useEffect, useState } from "react";
import { DAYS_OF_WEEK } from "../../constants";
import {
  currentMonthDisplay,
  prevMonthDisplay,
  nextMonthDisplay,
  updateHolidays,
} from "../../utils";
import { CalendarBody, CalendarHeader, HeaderCell, DayDisplay } from "./styles";
import { Holiday, DateAttr } from "../../constants";

interface Props {
  selectedMonth: string;
  holidays: Holiday[] | null;
  errorMsg?: string;
}

const Calendar = ({
  selectedMonth,
  holidays,
  errorMsg,
}: Props): JSX.Element => {
  const [calendarDisplay, setCalendarDisplay] = useState<DateAttr[] | null>(
    null
  );

  useEffect(() => {
    let currentMonthDays = currentMonthDisplay(2024, selectedMonth);
    if (holidays !== null) {
      currentMonthDays = updateHolidays(currentMonthDays, holidays);
    }
    const previousMonthDays = prevMonthDisplay(
      2024,
      selectedMonth,
      currentMonthDays
    );
    const nextMonthDays = nextMonthDisplay(
      2024,
      selectedMonth,
      currentMonthDays
    );
    setCalendarDisplay([
      ...previousMonthDays,
      ...currentMonthDays,
      ...nextMonthDays,
    ]);
  }, [holidays, selectedMonth]);

  console.log(calendarDisplay, "--------obj");
  return (
    <>
      <CalendarHeader>
        {DAYS_OF_WEEK.map((day, idx) => (
          <HeaderCell key={`${day}-${idx}`}>{day}</HeaderCell>
        ))}
      </CalendarHeader>
      <CalendarBody>
        {calendarDisplay &&
          calendarDisplay.map((day, idx) => (
            <DayDisplay
              key={`${day.dateString}-${idx}`}
              $currentMonth={day.isCurrentMonth}
            >
              {day.dayNumber}
              {/* {day.isHoliday ? <HolidayDisplay /> : null} */}
            </DayDisplay>
          ))}
      </CalendarBody>
    </>
  );
};

export default Calendar;
