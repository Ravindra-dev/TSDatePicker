/** Your style of below or React.use-what-ever */
import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useReducer,
} from "react";
import {
  getDateStringFromTimestamp,
  getMonthDetails,
  monthMap,
  dayDetailsReturnType,
} from "./Date";
import PropTypes from "prop-types";

import "./DatePicker.css";
// import getYear from 'date-fns/getYear'

import { getYear, getMonth, getTime } from "date-fns";

interface Props {
  onChange: (val: number) => void;
}

interface dateData {
  year: number;
  month: number;
  date: number;
}

type ActionType =
  | { type: "selectedDay"; value: number }
  | { type: "year"; value: number }
  | { type: "month"; value: number }
  | { type: "monthDetails"; value: dayDetailsReturnType[] };

interface TSinitialState {
  todayTimestamp: number;
  year: number;
  minDate: number;
  maxDate: number;
  month: number;
  selectedDay: number;
  monthDetails: dayDetailsReturnType[];
}

const date: Date = new Date();
const oneDay: number = 60 * 60 * 24 * 1000;
const todayTimestamp: number =
  getTime(date) -
  (getTime(date) % oneDay) +
  date.getTimezoneOffset() * 1000 * 60;

const initialState = {
  todayTimestamp: todayTimestamp, // or todayTimestamp, for short
  year: getYear(date),
  minDate: getYear(date),
  maxDate: getYear(date),
  month: getMonth(date),
  selectedDay: todayTimestamp,
  monthDetails: getMonthDetails(getYear(date), getMonth(date)),
};

// Function component
export const DatePicker: React.FunctionComponent<Props> = ({ onChange }) => {
  const el = useRef<HTMLDivElement>(null);
  const inputRef = createRef() as React.MutableRefObject<HTMLInputElement>;
  const [state, dispatch] = useReducer(reducer, initialState);
  /** Maybe you could add this to initialState 🤷🏽‍♂️ */
  const [showDatePicker, setShowDatePicker] = useState(false);
  const addBackDrop = (e: any): void => {
    e.preventDefault();
    if (showDatePicker && el && !el.current?.contains(e.target)) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", addBackDrop);
    setDateToInput(state.selectedDay);

    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("click", addBackDrop);
    };
  }, [showDatePicker]);

  const setDateToInput = (timestamp: number): void => {
    const dateString = getDateStringFromTimestamp(timestamp);
    inputRef.current.value = dateString;
  };

  const isCurrentDay = (day: dayDetailsReturnType): boolean =>
    day.timestamp === todayTimestamp;
  const isSelectedDay = (day: dayDetailsReturnType): boolean =>
    day.timestamp === state.selectedDay;
  const getMonthStr = (month: number): string =>
    monthMap[Math.max(Math.min(11, month), 0)] || "Month";

  const onDateClick = (day: dayDetailsReturnType) => {
    dispatch({ type: "selectedDay", value: day.timestamp });
    setDateToInput(day.timestamp);

    /** Pass data to parent */
    onChange(day.timestamp);
  };

  const setYear = (offset: string): void => {
    const year = Number(offset);
    dispatch({ type: "year", value: year });
    dispatch({
      type: "monthDetails",
      value: getMonthDetails(year, state.month),
    });
  };

  const setMonth = (offset: number): void => {
    let year = state.year;
    let month = state.month + offset;
    if (month === -1) {
      month = 11;
      year--;
    } else if (month === 12) {
      month = 0;
      year++;
    }
    dispatch({ type: "year", value: year });
    dispatch({ type: "month", value: month });
    dispatch({ type: "monthDetails", value: getMonthDetails(year, month) });
  };

  const setDate = (dateData: dateData): void => {
    const selectedDay = new Date(
      dateData.year,
      dateData.month - 1,
      dateData.date
    ).getTime();
    dispatch({ type: "selectedDay", value: selectedDay });

    /** Pass data to parent */
    onChange(selectedDay);
  };

  const getDateFromDateString = (dateValue: string): dateData | null => {
    const dateData = dateValue.split("-").map((d) => parseInt(d, 10));

    if (dateData.length < 3) {
      return null;
    }

    const year = dateData[0];
    const month = dateData[1];
    const date = dateData[2];
    return { year, month, date };
  };

  const updateDateFromInput = (): void => {
    const dateValue = inputRef.current.value;
    const dateData = getDateFromDateString(dateValue);

    if (dateData !== null) {
      setDate(dateData);
      dispatch({ type: "year", value: dateData.year });
      dispatch({ type: "month", value: dateData.month - 1 });
      dispatch({
        type: "monthDetails",
        value: getMonthDetails(dateData.year, dateData.month - 1),
      });
    }
  };

  const daysMarkup = state.monthDetails.map(
    (day: dayDetailsReturnType, index: number) => (
      <div
        className={
          "c-day-container " +
          (day.month !== 0 ? " disabled" : "") +
          (isCurrentDay(day) ? " highlight" : "") +
          (isSelectedDay(day) ? " highlight-green" : "")
        }
        key={index}
      >
        <div className="cdc-day">
          <span onClick={() => onDateClick(day)}>{day.date}</span>
        </div>
      </div>
    )
  );

  const calendarMarkup: JSX.Element = (
    <div className="c-container">
      <div className="cc-head">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d, i) => (
          <div key={i} className="cch-name">
            {d}
          </div>
        ))}
      </div>
      <div className="cc-body">{daysMarkup}</div>
    </div>
  );

  // Creating Dropdown year

  const renderSelectOptions = (): JSX.Element[] => {
    const minYear = 1900;
    const maxYear = 2100;

    const options = [];
    for (let i = minYear; i <= maxYear; i++) {
      options.push(
        <option className="has-text-weight-bold" key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <div ref={el} className="MyDatePicker">
      <div className="mdp-input" onClick={() => setShowDatePicker(true)}>
        <input type="date" ref={inputRef} onChange={updateDateFromInput} />
      </div>
      {showDatePicker ? (
        <div className="mdp-container">
          <div className="mdpc-head">
            <div className="mdpch-button">
              <div className="mdpchb-inner" onClick={() => setMonth(-1)}>
                <span className="mdpchbi-left-arrow"></span>
              </div>
            </div>
            <div className="mdpch-container">
              <div className="mdpchc-year">{state.year}</div>
              <div className="mdpchc-month">{getMonthStr(state.month)}</div>
              <br></br>
              <div className="my-2 mx-5 select is-rounded is-small">
                <select
                  value={state.year}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setYear(e.target.value)
                  }
                >
                  {renderSelectOptions()}
                </select>
              </div>
            </div>
            <div className="mdpch-button">
              <div className="mdpchb-inner" onClick={() => setMonth(1)}>
                <span className="mdpchbi-right-arrow"></span>
              </div>
            </div>
          </div>
          <div className="mdpc-body" onClick={() => setShowDatePicker(false)}>
            {calendarMarkup}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
const reducer = (state: TSinitialState, action: ActionType): TSinitialState => {
  switch (action.type) {
    case "selectedDay":
      return { ...state, [`${action.type}`]: action.value };
    case "year":
      return { ...state, [`${action.type}`]: action.value };
    case "month":
      return { ...state, [`${action.type}`]: action.value };
    case "monthDetails":
      return { ...state, [`${action.type}`]: action.value };
    default:
      return state;
  }

  console.log(`Unknown key in state: ${action.type}`);
};

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
};
