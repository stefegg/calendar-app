export const BASE_URL = "https://date.nager.at/api/v3/publicholidays/2024";

export interface Holiday {
  counties: string[] | null;
  countryCode: string;
  date: string;
  fixed: boolean;
  global: boolean;
  launchYear: string | null;
  name: string;
  localName: string;
  types: string[];
}

export interface DateAttr {
  dateString: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  holiday?: Holiday[];
}

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const MONTH_ARRAY: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
