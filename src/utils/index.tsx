import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { DateAttr, Holiday } from "../constants";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export const getMonthDayCount = (year: number, month: string): number => {
  return dayjs(`${year}-${month}-01`).daysInMonth();
};

// find what day of the week a date is on 0 is Sunday
export const getDayIndex = (
  dateString: string | number | dayjs.Dayjs | Date | null | undefined
): number => {
  return dayjs(dateString).weekday();
};

export const currentMonthDisplay = (
  year: number,
  month: string
): DateAttr[] => {
  // build current month array by mapping through array that is the length of the current month, build dayString and dayNumber by adding + 1 to index
  // flag isCurrentMonth true to differentiate style and holiday display
  return [...Array(getMonthDayCount(year, month))].map((_, idx) => {
    return {
      dateString: dayjs(`${year}-${month}-${idx + 1}`).format("YYYY-MM-DD"),
      dayNumber: idx + 1,
      isCurrentMonth: true,
    };
  });
};

export const prevMonthDisplay = (
  year: number,
  month: string,
  currentMonthDays: {
    dateString: string | number | dayjs.Dayjs | Date | null | undefined;
  }[]
): DateAttr[] => {
  // get index that represents the day of the week for first day of current month
  // if first day is Monday, index is 1, and we know 1 day will show from prev month
  const visibleNumberOfDays = getDayIndex(currentMonthDays[0].dateString);
  const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

  //First displayed day of previous month, will always start on Sunday if any are visible
  const lastSundayDayOfMonth = dayjs(currentMonthDays[0].dateString)
    .subtract(visibleNumberOfDays, "day")
    .date();
  // build prevMonth array by mapping through array that is length of number of visible days we require
  // dateString is built by adding + 1 to previousMonth.month() because .month() months are zero indexed ie. January is 0 and December is 11
  // day of datestring and dayNumber are calculated by adding index of visibleNumberOfDays to Sunday start point
  return [...Array(visibleNumberOfDays)].map((_, idx) => {
    return {
      dateString: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          lastSundayDayOfMonth + idx
        }`
      ).format("YYYY-MM-DD"),
      dayNumber: lastSundayDayOfMonth + idx,
      isCurrentMonth: false,
    };
  });
};

export const nextMonthDisplay = (
  year: number,
  month: string,
  currentMonthDays: string | any[]
): DateAttr[] => {
  const lastDayOfTheMonthWeekday = getDayIndex(
    `${year}-${month}-${currentMonthDays.length}`
  );
  const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
  //subtract last day of the month from 6 to determine visible number of days for next month
  const visibleNumberOfDays = 6 - lastDayOfTheMonthWeekday;
  // build nextMonth array by iterating over array that is length of number of visible days
  // build dateString and number of days by adding 1 to index
  return [...Array(visibleNumberOfDays)].map((_, idx) => {
    return {
      dateString: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${idx + 1}`
      ).format("YYYY-MM-DD"),
      dayNumber: idx + 1,
      isCurrentMonth: false,
    };
  });
};

export function updateHolidays(
  dateAttrs: DateAttr[],
  holidays: Holiday[]
): DateAttr[] {
  dateAttrs.map((dateAttr) => {
    if (dateAttr.isCurrentMonth) {
      // if a dateString matches a holiday's date, add to matchingHoliday array
      // cut out Optional holidays to avoid Texas only duplicates
      const matchingHolidays = holidays.filter(
        (holiday) =>
          holiday.date === dateAttr.dateString &&
          holiday.types[0] !== "Optional"
      );
      // if there was an array created, assign it as value of holiday key on a given date
      if (matchingHolidays.length) {
        dateAttr.holiday = matchingHolidays;
      }
    }
    return dateAttr;
  });
  return dateAttrs;
}
