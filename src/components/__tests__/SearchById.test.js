import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import SearchbyId from "../SearchById";
import * as axios from "axios";

jest.mock("axios");

const mockData = {
  rating: 0.8,
  publish_date: "2016-09-07",
  id: "1",
  body: "Mock Review 1",
  author: "Mock Author 1",
};

describe("Search By ID", () => {
  test("renders a card for a valid id", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: mockData })
    );
    render(<SearchbyId />);
    const idInput = screen.getByRole("searchbox");
    fireEvent.change(idInput, { target: { value: "1" } });
    const searchButton = screen.getByText("Search");
    await waitFor(() => fireEvent.click(searchButton));
    await waitFor(() => screen.getByText(/Mock Review 1/i));
    const bodyText = screen.getByText(/Mock Review 1/i);
    expect(bodyText).toBeInTheDocument();
    const date = screen.getByText("Publish date: 07/09/2016");
    expect(date).toBeInTheDocument();
  });
  test("render failed state for invalid id or failed api response", async () => {
    axios.get.mockImplementation(() => Promise.reject({ status: 404 }));
    render(<SearchbyId />);
    const idInput = screen.getByRole("searchbox");
    fireEvent.change(idInput, { target: { value: "1" } });
    const searchButton = screen.getByText("Search");
    await waitFor(() => fireEvent.click(searchButton));

    const bodyText = screen.getByText(
      /No Review Found with that ID Or No Response from Server/i
    );
    expect(bodyText).toBeInTheDocument();
  });
});
