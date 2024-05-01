import React, { useState } from 'react';
import styled from 'styled-components';
import { MonthDropdown, Calendar } from './components';
import { MONTH_ARRAY } from "./constants";

const Container = styled.div`
  margin: 32px;
`;

const CURRENT_DATE = new Date();
const CURRENT_MONTH_IDX = CURRENT_DATE.getMonth();
const CURRENT_MONTH = MONTH_ARRAY[CURRENT_MONTH_IDX]

function App() {
  const [selectedMonth, setSelectedMonth] = useState<string>(CURRENT_MONTH)

  return (
    <Container>
      <MonthDropdown
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <Calendar selectedMonth={selectedMonth} />
    </Container>
  );
}

export default App;
