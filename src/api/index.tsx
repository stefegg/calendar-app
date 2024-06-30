import { BASE_URL, Holiday } from "../constants";

export async function getHolidays(country: string): Promise<Holiday[]> {
  try {
    const res = await fetch(`${BASE_URL}/${country}`);
    return res.json();
  } catch (error) {
    throw new Error();
  }
}
