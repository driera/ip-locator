import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchForm } from "./SearchForm";

describe("SearchForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the search form", () => {
    render(<SearchForm onSearch={jest.fn()} />);

    expect(
      screen.getByLabelText(/search for any ip address/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("should handle valid IP address submission", async () => {
    const user = userEvent.setup();
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByLabelText(/search for any ip address/i);
    await user.type(input, "192.168.1.1");
    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(mockOnSearch).toHaveBeenCalledWith("192.168.1.1");
  });

  it("should show error messagefor invalid IP address", async () => {
    const user = userEvent.setup();
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByLabelText(/search for any ip address/i);
    await user.type(input, "invalid-ip");
    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(
      screen.getByText(/please enter a valid ip address/i)
    ).toBeInTheDocument();
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
