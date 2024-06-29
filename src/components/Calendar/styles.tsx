import styled from "styled-components";

type DisplayDayProps = {
  $currentMonth: boolean;
};

export const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: black;
  grid-column-gap: 2px;
  border: 2px solid black;
  border-bottom: none;
`;

export const HeaderCell = styled.div`
  background-color: white;
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
  background-color: ${(props) => (props.$currentMonth ? "white" : "#d3d3d3")};
  color: ${(props) => (props.$currentMonth ? "black" : "white")};
  font-style: ${(props) => (props.$currentMonth ? "" : "italic")};
  opacity: ${(props) => (props.$currentMonth ? 1 : 0.5)};
  padding-top: 8px;
  padding-bottom: 4rem;
  font-size: 24px;
  padding-left: 8px;
  padding-right: 8px;
`;
