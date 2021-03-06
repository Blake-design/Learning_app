import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { GET_THEME, QUERY_ME, QUERY_USERS } from "./utils/queries";

const mocks = [
  {
    request: {
      query: QUERY_ME,
    },
    result: {
      data: {
        me: {
          _id: "test",
          name: "test",
          username: "test",
          email: "test",
          avatar: "test",
          bio: "test",
          friends: [
            {
              _id: "test",
              username: "test",
              avatar: "test",
            },
          ],
          settings: {
            _id: "test",
            theme: "test",
            showActive: true,
            shareEmail: true,
          },
        },
      },
    },
  },
  {
    request: {
      query: QUERY_USERS,
    },
    result: {
      data: {
        users: {
          username: "username",
          active: "true",
        },
      },
    },
  },
  {
    request: {
      query: GET_THEME,
    },
    result: {
      data: {
        theme: "light",
      },
    },
  },
];

test("renders", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MockedProvider>
  );

  expect(screen.getByText("loading...")).toBeInTheDocument();
});
