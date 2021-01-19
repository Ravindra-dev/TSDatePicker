import {
  getNumberOfDays,
  getMonthDetails,
  getDateStringFromTimestamp,
  getDayDetails,
} from "./../Date";
// import '@testing-library/jest-dom/extend-expect';

describe("date component", () => {
  it("test for getDayDetails", () => {
    expect(
      getDayDetails({
        index: 0,
        numberOfDays: 28,
        firstDay: 1,
        year: 2021,
        month: 1,
      })
    ).toStrictEqual({
      date: 31,
      day: 0,
      dayString: "Sunday",
      month: -1,
      timestamp: 1614709800000,
    });
  });
  it("test for getDateStringFromTimestamp", () => {
    expect(getDateStringFromTimestamp(1609871400000)).toBe("2021-01-06");
  });
  it("test for getMonthDetails", () => {
    expect(getMonthDetails(2021, 1)).toBeTruthy();
  });
  it("test for getNumberOfDays", () => {
    expect(getNumberOfDays(2021, 1)).toBe(28);
  });
});
