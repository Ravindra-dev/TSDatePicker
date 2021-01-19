// Date component types
export interface dayDetails {
  index: number;
  numberOfDays: number;
  firstDay: number;
  year: number;
  month: number;
}

export interface dayDetailsReturnType {
  date: number;
  day: number;
  month: number;
  timestamp: number;
  dayString: string;
}

export interface month_Details {
  getMonth_Details: (year: number, month: number) => dayDetailsReturnType[];
}

// DatePicker component types

export interface Props {
  onChange: (val: number) => void;
}

export interface dateData {
  year: number;
  month: number;
  date: number;
}

export type ActionType =
  | { type: "selectedDay"; value: number }
  | { type: "year"; value: number }
  | { type: "month"; value: number }
  | { type: "monthDetails"; value: dayDetailsReturnType[] };

export interface TSinitialState {
  todayTimestamp: number;
  year: number;
  minDate: number;
  maxDate: number;
  month: number;
  selectedDay: number;
  monthDetails: dayDetailsReturnType[];
}
