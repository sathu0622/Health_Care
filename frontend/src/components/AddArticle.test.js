import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import axiosMock from "axios-mock-adapter";
import AddArticle from "./AddArticle"; // Import your component

// Mock the axios library
const mockAxios = new axiosMock(axios);

// Mock the DoctorHeader component to avoid rendering it in tests
jest.mock("../component/DoctorHeader", () => () => (
  <div>Mock DoctorHeader</div>
));

describe("AddArticle component", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  test("renders the form correctly", () => {
    render(<AddArticle />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  test("handles successful form submission", async () => {
    mockAxios.onPost("http://localhost:5000/api/articles").reply(200);

    render(<AddArticle />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/image url/i), {
      target: { value: "http://example.com/image.jpg" },
    });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(
        screen.getByText(/article added successfully/i)
      ).toBeInTheDocument();
    });
  });

  test("handles failed form submission", async () => {
    mockAxios.onPost("http://localhost:5000/api/articles").reply(500);

    render(<AddArticle />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/image url/i), {
      target: { value: "http://example.com/image.jpg" },
    });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/failed to add article/i)).toBeInTheDocument();
    });
  });
});
