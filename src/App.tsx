import React from "react";
import "./App.css";
import { DatePicker } from "./component/Datepicker";

function onChange(timestamp: number) {
  console.log(timestamp);
}

function App() {
  return (
    <>
      <DatePicker onChange={onChange} />
      {/* <DatePicker /> */}
    </>
  );
}

export default App;
