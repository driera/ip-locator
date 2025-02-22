import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("Welcomes the user", async () => {
    render(<App />);
    expect(screen.getByText("Welcome to IP Locator")).toBeInTheDocument();
  });
});
