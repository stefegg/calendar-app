import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { DateAttr, Holiday } from "../constants";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export const getMonthDayCount = (year: number, month: string): number => {
  return dayjs(`${year}-${month}-01`).daysInMonth();
};

export const currentMonthDisplay = (
  year: number,
  month: string
): DateAttr[] => {
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
  const firstDayOfTheMonthWeekday = getDayIndex(currentMonthDays[0].dateString);
  const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday;

  const previousMonthLastMondayDayOfMonth = dayjs(
    currentMonthDays[0].dateString
  )
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, idx) => {
    return {
      dateString: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + idx
        }`
      ).format("YYYY-MM-DD"),
      dayNumber: previousMonthLastMondayDayOfMonth + idx,
      isCurrentMonth: false,
      isPreviousMonth: true,
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
  const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((_, idx) => {
    return {
      dateString: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${idx + 1}`
      ).format("YYYY-MM-DD"),
      dayNumber: idx + 1,
      isCurrentMonth: false,
      isNextMonth: true,
    };
  });
};

// find what day of the week a date is on 0 is Sunday
export const getDayIndex = (
  dateString: string | number | dayjs.Dayjs | Date | null | undefined
): number => {
  return dayjs(dateString).weekday();
};

export function updateHolidays(
  dateAttrs: DateAttr[],
  holidays: Holiday[]
): DateAttr[] {
  dateAttrs.forEach((dateAttr) => {
    if (dateAttr.isCurrentMonth) {
      const matchingHolidays = holidays.filter(
        (holiday) => holiday.date === dateAttr.dateString
      );
      if (matchingHolidays) {
        return {
          ...dateAttr,
          isHoliday: true,
          holiday: [...matchingHolidays],
        };
      }
    }
  });
  return dateAttrs;
}
