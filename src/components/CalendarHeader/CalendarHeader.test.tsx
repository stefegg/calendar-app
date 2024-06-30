import { render, screen, fireEvent } from "@testing-library/react";
import CalendarHeader from ".";

test("displays selected month correctly", async () => {
  const setSelectedMonth = jest.fn();
  render(
    <CalendarHeader selectedMonth="June" setSelectedMonth={setSelectedMonth} />
  );
  const displayMonth = await screen.findByTestId("select");
  expect(displayMonth).toHaveTextContent(/June/);
  fireEvent.click(screen.getByText(/May/));
  expect(displayMonth).toHaveTextContent(/May/);
});
