import React from "react";
import { render } from "@testing-library/react";
import JobsList from "./JobsList";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function() {
  render(<MemoryRouter><JobsList /></MemoryRouter>);
});

it("matches snapshot", function () {
    const { asFragment } = render(<MemoryRouter><JobsList /></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
  });