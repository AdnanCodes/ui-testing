import { render, screen, waitFor } from "@testing-library/react";
import CardsMapper from "../CardsMapper";
import * as axios from "axios";

jest.mock("axios");

const mockData = [
  {
    rating: 0.8,
    publish_date: "2016-08-05",
    id: "1",
    body: "Mock Review 1",
    author: "Mock Author 1",
  },
  {
    rating: 0.8,
    publish_date: "2016-09-06",
    id: "2",
    body: "Mock Review 2",
    author: "Mock Author 2",
  },
  {
    rating: 0.8,
    publish_date: "2016-09-07",
    id: "3",
    body: "Mock Review 3",
    author: "Mock Author 4",
  },
];

describe("Card Mapper", () => {
  test("renders mock data", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: mockData })
    );
    render(<CardsMapper />);
    await waitFor(() => screen.getByText(/Mock Review 1/i));

    const mockReview = screen.getAllByText(/Mock Review/i);
    expect(mockReview).toHaveLength(3);
    const bodyText = screen.getByText(/Mock Review 2/i);
    expect(bodyText).toBeInTheDocument();
    const date = screen.getByText("Publish date: 07/09/2016");
    expect(date).toBeInTheDocument();
  });
  test("renders failed data state", async () => {
    axios.get.mockImplementation(() => Promise.reject({ status: 500 }));
    render(<CardsMapper />);
    await waitFor(() => screen.getByText(/Unable to retrieve Reviews/i));
    const errorMessage = screen.getByText(/Unable to retrieve Reviews/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
