import styled from "styled-components";

type Props = {
  $countryCode: string;
};

export const Wrapper = styled.div<Props>`
  background-color: ${(props) =>
    props.$countryCode === "US" ? "red" : "blue"};
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  margin-top: 2px;
  color: white;
  overflow-x: auto;
`;
