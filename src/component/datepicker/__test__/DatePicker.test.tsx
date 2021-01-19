import React from "react";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { DatePicker } from "./../Datepicker";

describe("DatePicker testing", () => {
  it("DatePicker Container display toggle", () => {
    const { getByTestId, queryByTestId, debug } = render(
      <DatePicker onChange={() => {}} />
    );
    const showDatepickerInput = getByTestId("showDatepickerInput");
    user.click(showDatepickerInput);

    const container = queryByTestId("container");
    expect(container).toBeInTheDocument();
    // debug();
    const calendar = getByTestId("calendar");
    user.click(calendar);
    expect(container).not.toBeInTheDocument();
    debug();
  });
});
