import React from "react";
import { render } from "@testing-library/react";
import JobCard from "./JobCard";
import { UserProvider, demoUser } from "../../../testUtils";
import { MemoryRouter } from "react-router-dom";


it("matches snapshot", function () {
  let item = { title: "Boss", salary: 9999999, equity: 100 };

  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <JobCard item={item} userDetails={demoUser}/>
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});