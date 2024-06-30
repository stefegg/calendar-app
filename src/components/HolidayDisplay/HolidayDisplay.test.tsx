import { render, screen } from "@testing-library/react";
import HolidayDisplay from ".";

test("renders US holidays correctly", () => {
  render(<HolidayDisplay countryCode="US" holidayName="Flag Day" />);
  const showHoliday = screen.queryByText("Flag Day");
  expect(showHoliday).toBeInTheDocument();
  expect(showHoliday).toHaveStyle(`background-color: red`);
});

test("renders Mexican holidays correctly", () => {
  render(<HolidayDisplay countryCode="MX" holidayName="Viernes Santo" />);
  const showHoliday = screen.queryByText("Viernes Santo");
  expect(showHoliday).toBeInTheDocument();
  expect(showHoliday).toHaveStyle(`background-color: blue`);
});
