import React from "react";
import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <CompanyCard
            handle="sbux"
            name="Starbucks"
            description="We brew coffee."
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});