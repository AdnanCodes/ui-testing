import { render, screen, waitFor } from "@testing-library/react";

import App from "./App";
import * as axios from "axios";

jest.mock("axios");

const mockData = [
  {
    rating: 0.8,
    publish_date: "2016-08-05T:25:47.642350Z",
    id: "1",
    body: "Mock Review 1",
    author: "Mock Author 1",
  },
  {
    rating: 0.8,
    publish_date: "2016-09-06T23:25:47.642350Z",
    id: "2",
    body: "Mock Review 2",
    author: "Mock Author 2",
  },
  {
    rating: 0.8,
    publish_date: "2016-09-07T23:25:47.642350Z",
    id: "3",
    body: "Mock Review 3",
    author: "Mock Author 4",
  },
];

describe("Main App", () => {
  test("renders main the title and see mock data", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: mockData })
    );
    render(<App />);

    await waitFor(() => screen.getByText(/Check out some of the Reviews/i));
    const mainTitle = screen.getByText(/Check out some of the Reviews/i);
    expect(mainTitle).toBeInTheDocument();
    const mockReview = screen.getAllByText(/Mock Review/i);
    expect(mockReview).toHaveLength(3);
  });
});
