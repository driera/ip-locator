import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { fetchMock } from "./services/__test_helpers__/fetch-mock";
import userEvent from "@testing-library/user-event";
import { ipDataSample } from "./services/data-samples";

describe("App", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Welcomes the user", async () => {
    fetchMock({ json: () => Promise.resolve({ ip: "0.0.0.0" }) });

    render(<App />);

    expect(screen.getByText("Welcome to IP Locator")).toBeInTheDocument();
    expect(await screen.findByText("Your IP Address")).toBeInTheDocument();
  });

  it("Allows the user to search for an IP address", async () => {
    const user = userEvent.setup();
    const mockIPData = {
      ...ipDataSample,
      ip: "192.168.1.1"
    };
    fetchMock({
      ok: true,
      json: () => Promise.resolve(mockIPData)
    });

    render(<App />);

    const searchInput = screen.getByRole("textbox", {
      name: /Search for any IP address/i
    });
    await user.type(searchInput, "192.168.1.1");
    await user.keyboard("{enter}");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        "https://geo.ipify.org/api/v2/country,city?ipAddress=192.168.1.1"
      ),
      expect.anything()
    );
    expect(await screen.findByText("192.168.1.1")).toBeInTheDocument();
  });

  describe("Error handling", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("displays an error message when the API call fails", async () => {
      fetchMock({
        ok: false,
        status: 404,
        statusText: "NOT_FOUND",
        json: () => Promise.reject(new Error("Failed to fetch IP address"))
      });

      render(<App />);

      await waitFor(() =>
        expect(screen.getByRole("alert")).toHaveTextContent(
          "Failed to fetch your IP address"
        )
      );
    });
  });
});
