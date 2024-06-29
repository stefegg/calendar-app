import styled from "styled-components";

type DisplayDayProps = {
  $currentMonth: boolean;
};

export const WeekDaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: black;
  grid-column-gap: 2px;
  border: 2px solid black;
  border-bottom: none;
  border-radius: 4px 4px 0px 0px;
  overflow: hidden;
`;

export const HeaderCell = styled.div`
  background-color: #66b2b2;
  overflow-x: auto;
  padding: 8px;
`;

export const CalendarBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: black;
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  border: 2px solid black;
`;

export const DayDisplay = styled.div<DisplayDayProps>`
  background-color: ${(props) => (props.$currentMonth ? "#a6d1f8" : "#d3d3d3")};
  color: ${(props) => (props.$currentMonth ? "black" : "white")};
  font-style: ${(props) => (props.$currentMonth ? "" : "italic")};
  opacity: ${(props) => (props.$currentMonth ? 1 : 0.5)};
  padding-top: 8px;
  height: 8rem;
  font-size: 20px;
  padding-left: 8px;
  padding-right: 8px;
  overflow-y: auto;
`;

export const ErrorDisplay = styled.div`
  max-width: 100%;
  background-color: red;
  border: 2px solid black;
  border-bottom: none;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
