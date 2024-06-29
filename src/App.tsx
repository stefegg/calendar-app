import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MonthDropdown, Calendar } from "./components";
import { MONTH_ARRAY, Holiday } from "./constants";
import { getHolidays } from "./api";

const Container = styled.div`
  margin: 32px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const CURRENT_DATE = new Date();
const CURRENT_MONTH_IDX = CURRENT_DATE.getMonth();
const CURRENT_MONTH = MONTH_ARRAY[CURRENT_MONTH_IDX];

function App() {
  const [selectedMonth, setSelectedMonth] = useState<string>(CURRENT_MONTH);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [holidays, setHolidays] = useState<Holiday[] | null>(null);

  useEffect(() => {
    const holidayCall = async (codeOne: string, codeTwo: string) => {
      const holidaySetOne = await getHolidays(codeOne);
      const holidaySetTwo = await getHolidays(codeTwo);
      if (Array.isArray(holidaySetOne) && Array.isArray(holidaySetTwo)) {
        setHolidays(holidaySetOne.concat(holidaySetTwo));
      } else setErrorMsg("Error fetching holidays");
    };
    holidayCall("US", "MX");
  }, []);
  return (
    <Container>
      <Flex>
        <MonthDropdown
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <b>2024</b>
      </Flex>
      <Calendar
        selectedMonth={selectedMonth}
        holidays={holidays}
        errorMsg={errorMsg}
      />
    </Container>
  );
}

export default App;
