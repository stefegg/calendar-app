import React from "react";
import { DAYS_OF_WEEK } from "../../constants";
import {
  createDaysForCurrentMonth,
  createDaysForPreviousMonth,
  createDaysForNextMonth,
} from "../../utils";
import { CalendarBody, CalendarHeader, HeaderCell, DayDisplay } from "./styles";

interface Props {
  selectedMonth: string;
}

const Calendar = ({ selectedMonth }: Props): JSX.Element => {
  let currentMonthDays = createDaysForCurrentMonth(2024, selectedMonth);
  let previousMonthDays = createDaysForPreviousMonth(
    2024,
    selectedMonth,
    currentMonthDays
  );
  let nextMonthDays = createDaysForNextMonth(
    2024,
    selectedMonth,
    currentMonthDays
  );
  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ];

  console.log(calendarGridDayObjects, "--------obj");
  return (
    <>
      <CalendarHeader>
        {DAYS_OF_WEEK.map((day, idx) => (
          <HeaderCell key={`${day}-${idx}`}>{day}</HeaderCell>
        ))}
      </CalendarHeader>
      <CalendarBody>
        {calendarGridDayObjects.map((day, idx) => (
          <DayDisplay
            key={`${day.dateString}-${idx}`}
            $currentMonth={day.isCurrentMonth}
          >
            {day.dayOfMonth}
          </DayDisplay>
        ))}
      </CalendarBody>
    </>
  );
};

export default Calendar;
