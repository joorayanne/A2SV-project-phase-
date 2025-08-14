import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import JobCard from "./JobCard";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

interface Job {
  id: string;
  title: string;
  orgName: string;
  location?: string[];
  description?: string;
  categories?: string[];
}



const mockJob = {
  id: "123",
  title: "Frontend Developer",
  orgName: "Tech Corp",
  location: ["Remote"],
  description: "Build amazing web apps.",
  categories: ["Engineering"],
};

describe("JobCard", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders job details correctly", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/toggle bookmark/i)).toBeInTheDocument();
  });

  it("shows login modal if not authenticated when bookmarking", () => {
    render(<JobCard job={mockJob} />);
    fireEvent.click(screen.getByLabelText(/toggle bookmark/i));
    expect(
      screen.getByText(/You must be logged in to bookmark this job./i)
    ).toBeInTheDocument();
  });

  it("toggles bookmark when authenticated", async () => {
    localStorage.setItem("token", "test-token");

    mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } });
    mockedAxios.post.mockResolvedValueOnce({});
    mockedAxios.delete.mockResolvedValueOnce({});

    render(<JobCard job={mockJob} />);

    const button = screen.getByLabelText(/toggle bookmark/i);

    // Bookmark
    fireEvent.click(button);
    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalled());

    // Unbookmark
    fireEvent.click(button);
    await waitFor(() => expect(mockedAxios.delete).toHaveBeenCalled());
  });
});
