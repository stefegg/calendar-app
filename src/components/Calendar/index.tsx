import React, { useEffect, useState } from "react";
import { DAYS_OF_WEEK } from "../../constants";
import {
  currentMonthDisplay,
  prevMonthDisplay,
  nextMonthDisplay,
  updateHolidays,
} from "../../utils";
import {
  CalendarBody,
  WeekDaysHeader,
  HeaderCell,
  DayDisplay,
  ErrorDisplay,
} from "./styles";
import { Holiday, DateAttr } from "../../constants";
import { HolidayDisplay } from "../index";

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

  return (
    <>
      <WeekDaysHeader>
        {DAYS_OF_WEEK.map((day, idx) => (
          <HeaderCell key={`${day}-${idx}`}>{day}</HeaderCell>
        ))}
      </WeekDaysHeader>
      {errorMsg && <ErrorDisplay>{errorMsg}</ErrorDisplay>}
      <CalendarBody>
        {calendarDisplay &&
          calendarDisplay.map((day, idx) => (
            <DayDisplay
              key={`${day.dateString}-${idx}`}
              $currentMonth={day.isCurrentMonth}
            >
              {day.dayNumber}
              {day.holiday?.length
                ? day.holiday.map((day, idx) => (
                    <HolidayDisplay
                      key={`${idx}-${day.name}`}
                      holidayName={day.localName}
                      countryCode={day.countryCode}
                    />
                  ))
                : null}
            </DayDisplay>
          ))}
      </CalendarBody>
    </>
  );
};

export default Calendar;
