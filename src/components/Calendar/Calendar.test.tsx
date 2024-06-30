import { render, screen } from "@testing-library/react";
import Calendar from ".";

test("renders days of week and monthly holidays correctly", async () => {
  const holidays = [
    {
      date: "2024-05-27",
      localName: "Memorial Day",
      name: "Memorial Day",
      countryCode: "US",
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: ["Public"],
    },
    {
      date: "2024-06-19",
      localName: "Juneteenth National Independence Day",
      name: "Juneteenth National Independence Day",
      countryCode: "US",
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: ["Public"],
    },
  ];
  render(<Calendar holidays={holidays} selectedMonth="June" />);
  const sevenDays = await screen.findAllByTestId("day-of-week-display");
  expect(sevenDays).toHaveLength(7);
  const juneHoliday = screen.queryByText(/Juneteenth/);
  expect(juneHoliday).toBeInTheDocument();
  const mayHoliday = screen.queryByText(/Memorial Day/);
  expect(mayHoliday).toBeNull();
  const errorText = screen.queryByText(/Error/);
  expect(errorText).toBeNull();
});

test("renders previous and next month correctly", async () => {
  const holidays = [
    {
      date: "2024-05-27",
      localName: "Memorial Day",
      name: "Memorial Day",
      countryCode: "US",
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: ["Public"],
    },
  ];
  render(<Calendar holidays={holidays} selectedMonth="May" />);
  const countThirty = await screen.findAllByText(/30/);
  expect(countThirty).toHaveLength(2);
  const countOne = await screen.findAllByText(/1/);
  expect(countOne).toHaveLength(14);
});

test("does not render next month's holidays", () => {
  const holidays = [
    {
      date: "2024-07-04",
      localName: "Independence Day",
      name: "Independence Day",
      countryCode: "US",
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: ["Public"],
    },
  ];
  render(<Calendar holidays={holidays} selectedMonth="June" />);
  const julyHoliday = screen.queryByText(/Independence Day/);
  expect(julyHoliday).toBeNull();
});

test("styles day and holiday display correctly", async () => {
  const holidays = [
    {
      date: "2024-05-27",
      localName: "Memorial Day",
      name: "Memorial Day",
      countryCode: "US",
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: ["Public"],
    },
    {
      date: "2024-05-01",
      localName: "Día del Trabajo",
      name: "Labor Day",
      countryCode: "MX",
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: ["Public"],
    },
  ];
  render(<Calendar holidays={holidays} selectedMonth="May" />);
  const monthDays = await screen.findAllByTestId("day-display");
  expect(monthDays[2]).toHaveStyle(`background-color: #d3d3d3`);
  expect(monthDays[3]).toHaveStyle(`background-color: #a6d1f8`);
  expect(monthDays[33]).toHaveStyle(`background-color: #a6d1f8`);
  expect(monthDays[34]).toHaveStyle(`background-color: #d3d3d3`);
  const holidayDays = await screen.findAllByTestId("holiday-display");
  expect(holidayDays).toHaveLength(2);
  expect(holidayDays[0]).toHaveStyle(`background-color: blue`);
  expect(holidayDays[1]).toHaveStyle(`background-color: red`);
});

test("displays errors correctly", () => {
  render(
    <Calendar holidays={null} selectedMonth="June" errorMsg="Error text" />
  );
  const errorText = screen.queryByText(/Error text/);
  expect(errorText).toBeInTheDocument();
});
