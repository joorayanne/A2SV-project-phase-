import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import BookmarksPage from "./page";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockBookmarks = [
  {
    eventID: "123",
    title: "Frontend Developer",
    opType: "Full-time",
    location: "Remote",
    orgName: "Tech Corp",
    logoUrl: "/logo.png",
  },
];

describe("BookmarksPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows login modal if no token", () => {
    render(<BookmarksPage />);
    expect(
      screen.getByText(/You must be logged in to view your bookmarks./i)
    ).toBeInTheDocument();
  });

  it("renders bookmarks when authenticated", async () => {
    localStorage.setItem("token", "test-token");
    mockedAxios.get.mockResolvedValueOnce({ data: { data: mockBookmarks } });

    render(<BookmarksPage />);

    await waitFor(() => {
      expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    });
  });

  it("removes bookmark when delete clicked", async () => {
    localStorage.setItem("token", "test-token");
    mockedAxios.get.mockResolvedValueOnce({ data: { data: mockBookmarks } });
    mockedAxios.delete.mockResolvedValueOnce({});

    render(<BookmarksPage />);

    await waitFor(() => {
      expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTitle(/Remove bookmark/i));
    await waitFor(() => expect(mockedAxios.delete).toHaveBeenCalled());
  });
});
