import React from "react";
import { render } from "@testing-library/react";
import CompanyDetail from "./CompanyDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";

it("renders without crashing", function () {
  render(
      <MemoryRouter>
          <CompanyDetail />
      </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter initialEntries={["/company/starbucks"]}>
            <Routes>
                <Route path="/companies/:company" element={<CompanyDetail />}></Route>
            </Routes>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});