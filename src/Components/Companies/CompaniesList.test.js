import React from "react";
import { render } from "@testing-library/react";
import CompaniesList from "./CompaniesList";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
  const { asFragment } = render(<MemoryRouter><CompaniesList /></MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
});