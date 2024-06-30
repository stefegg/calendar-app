import React from "react";
import { MONTH_ARRAY } from "../../constants";
import { Wrapper, Select, Title } from "./styles";

interface Props {
  selectedMonth: string;
  setSelectedMonth: (value: string) => void;
}

const CalendarHeader = ({ selectedMonth, setSelectedMonth }: Props) => {
  const handleChange = (e: any): void => setSelectedMonth(e.target.value);

  return (
    <Wrapper>
      <Title>
        <span style={{ color: "red", marginRight: "2px" }}>United States</span>&
        <span style={{ color: "blue", marginLeft: "2px", marginRight: "2px" }}>
          Mexico
        </span>
        Holiday Calendar
      </Title>
      <Select
        value={selectedMonth}
        onChange={handleChange}
        data-testid="select"
      >
        {MONTH_ARRAY.map((month, idx) => (
          <option value={month} key={`${month}-${idx}`}>
            {month}
          </option>
        ))}
      </Select>
      <div>2024</div>
    </Wrapper>
  );
};

export default CalendarHeader;
