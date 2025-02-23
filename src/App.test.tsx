import { render, screen } from "@testing-library/react";
import App from "./App";
import { fetchMock } from "./services/__test_helpers__/fetch-mock";

describe("App", () => {
  it("Welcomes the user", async () => {
    fetchMock({ json: () => Promise.resolve({ ip: "0.0.0.0" }) });

    render(<App />);

    expect(screen.getByText("Welcome to IP Locator")).toBeInTheDocument();
    expect(await screen.findByText("Your IP Address")).toBeInTheDocument();
  });
});
