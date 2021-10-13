import { render, screen } from "@testing-library/react";
import SingleCard from "../SingleCard";

const mockData = {
  rating: 0.8,
  publish_date: "2016-09-05",
  id: "1",
  body: "Mock Review 1",
  author: "Mock Author 1",
};

const partiallyValidMockData = {
  rating: 0.8,
  publish_date: "2016-09-05",
  id: "1",
  body: "Mock Review 2",
};

describe("Single Card", () => {
  test("renders a valid single card", () => {
    const { rating, publish_date, body, author } = mockData;
    render(
      <SingleCard
        rating={rating}
        publishDate={publish_date}
        body={body}
        author={author}
      />
    );

    const bodyText = screen.getByText(/Mock Review 1/i);
    expect(bodyText).toBeInTheDocument();
    const authorText = screen.getByText(/Mock Author 1/i);
    expect(authorText).toBeInTheDocument();
    const date = screen.getByText("Publish date: 05/09/2016");
    expect(date).toBeInTheDocument();
  });

  test("renders a partially valid single card", () => {
    const { rating, publish_date, body, author } = partiallyValidMockData;
    render(
      <SingleCard
        rating={rating}
        publishDate={publish_date}
        body={body}
        author={author}
      />
    );

    const bodyText = screen.getByText(/Mock Review 2/i);
    expect(bodyText).toBeInTheDocument();
    const authorText = screen.getByText(/Unknown Author/i);
    expect(authorText).toBeInTheDocument();
    const date = screen.getByText("Publish date: 05/09/2016");
    expect(date).toBeInTheDocument();
  });

  test("renders a single card without any data", () => {
    render(<SingleCard />);

    const bodyText = screen.getByText(/No Rating Available/i);
    expect(bodyText).toBeInTheDocument();
    const authorText = screen.getByText(/Unknown Author/i);
    expect(authorText).toBeInTheDocument();
    const date = screen.getByText("Publish date: No Date available");
    expect(date).toBeInTheDocument();
  });
});
