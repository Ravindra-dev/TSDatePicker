import React from "react";
import "./App.css";
import { DatePicker } from "./component/datepicker/Datepicker";

function onChange(timestamp: number) {
  console.log(timestamp);
}

function App() {
  return (
    <div data-testid="datepicker">
      <DatePicker onChange={onChange} />
      {/* <DatePicker /> */}
    </div>
  );
}

export default App;
