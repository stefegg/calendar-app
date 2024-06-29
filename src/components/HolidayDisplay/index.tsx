import { Wrapper } from "./styles";

interface Props {
  holidayName: string;
  countryCode: string;
}

const HolidayDisplay = ({ holidayName, countryCode }: Props): JSX.Element => {
  return <Wrapper $countryCode={countryCode}>{holidayName}</Wrapper>;
};

export default HolidayDisplay;
