import React, { createRef } from "react";
import { getDay, getMonth, getDate, getYear, getTime } from "date-fns";
import { dayDetails, dayDetailsReturnType, month_Details } from "../Types";

// DatePicker Component stuff
export const inputRef = createRef() as React.MutableRefObject<HTMLInputElement>;

// Date component stuff
export const daysMap: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const monthMap: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getDayDetails = (args: dayDetails): dayDetailsReturnType => {
  let date = args.index - args.firstDay;
  let day = args.index % 7;
  let prevMonth = args.month - 1;
  let prevYear = args.year;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }
  let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
  let _date =
    (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
  let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  let timestamp = getTime(new Date(args.year, args.month, _date));
  return {
    date: _date,
    day,
    month,
    timestamp,
    dayString: daysMap[day],
  };
};

export const getDateStringFromTimestamp = (timestamp: number): string => {
  let dateObject = new Date(timestamp);
  let month = getMonth(dateObject) + 1;
  let date = getDate(dateObject);
  return (
    getYear(dateObject) +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (date < 10 ? "0" + date : date)
  );
};

export const getMonthDetails: month_Details["getMonth_Details"] = (
  year: number,
  month: number
): dayDetailsReturnType[] => {
  let firstDay = getDay(new Date(year, month));
  let numberOfDays = getNumberOfDays(year, month);
  let monthArray = [];
  let rows = 6;
  let currentDay = null;
  let index = 0;
  let cols = 7;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      currentDay = getDayDetails({
        index,
        numberOfDays,
        firstDay,
        year,
        month,
      });
      monthArray.push(currentDay);
      index++;
    }
  }
  return monthArray;
};

export const getNumberOfDays = (year: number, month: number): number => {
  return 40 - getDate(new Date(year, month, 40));
};
