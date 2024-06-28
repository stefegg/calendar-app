import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export const getNumberOfDaysInMonth = (year: any, month: any) => {
  return dayjs(`${year}-${month}-01`).daysInMonth();
};

export const createDaysForCurrentMonth = (year: number, month: string) => {
  return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => {
    return {
      dateString: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: true,
    };
  });
};

export const createDaysForPreviousMonth = (
  year: number,
  month: string,
  currentMonthDays: {
    dateString: string | number | dayjs.Dayjs | Date | null | undefined;
  }[]
) => {
  const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].dateString);
  const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday;

  const previousMonthLastMondayDayOfMonth = dayjs(
    currentMonthDays[0].dateString
  )
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
    return {
      dateString: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + index
        }`
      ).format("YYYY-MM-DD"),
      dayOfMonth: previousMonthLastMondayDayOfMonth + index,
      isCurrentMonth: false,
      isPreviousMonth: true,
    };
  });
};

export const createDaysForNextMonth = (
  year: number,
  month: string,
  currentMonthDays: string | any[]
) => {
  const lastDayOfTheMonthWeekday = getWeekday(
    `${year}-${month}-${currentMonthDays.length}`
  );
  const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
  const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      dateString: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: false,
      isNextMonth: true,
    };
  });
};

// sunday === 0, saturday === 6
export const getWeekday = (
  dateString: string | number | dayjs.Dayjs | Date | null | undefined
) => {
  return dayjs(dateString).weekday();
};

export const isWeekendDay = (dateString: any) => {
  return [6, 0].includes(getWeekday(dateString));
};
