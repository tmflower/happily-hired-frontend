import React from "react";
import userContext from "../src/Components/userContext";

const demoUser = {
  username: "testuser",
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
  applications: [34, 87, 102]
};

const UserProvider =
    ({ children, currentUser = demoUser }) => (
      <userContext.Provider value={{ currentUser }}>
        {children}
      </userContext.Provider>
);

export { UserProvider, demoUser };