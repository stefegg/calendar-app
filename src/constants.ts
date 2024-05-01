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
  "Feburary",
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

export const DAYS_IN_MONTH: { [key: string]: number } = {
  January: 31,
  Feburary: 29,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};
