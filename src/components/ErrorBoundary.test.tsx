import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  let consoleError: jest.SpyInstance;
  let consoleLog: jest.SpyInstance;

  beforeEach(() => {
    consoleError = jest.spyOn(console, "error").mockImplementation();
    consoleLog = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleError.mockRestore();
    consoleLog.mockRestore();
  });

  it("renders children when no error is thrown", () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole("heading", { name: /normal component/i })
    ).toBeInTheDocument();
  });

  it("renders error message when a child throws an error", async () => {
    render(
      <ErrorBoundary>
        <ComponentWithError />
        <NormalComponent />
      </ErrorBoundary>
    );

    await waitFor(() =>
      expect(screen.getByText("Something went wrong.")).toBeInTheDocument()
    );
    expect(console.error).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(Error("Test"), expect.anything());
    expect(
      screen.queryByRole("heading", { name: /normal component/i })
    ).not.toBeInTheDocument();
  });
});

const ComponentWithError = () => {
  throw new Error("Test");
};

const NormalComponent = () => {
  return <h1>Normal Component</h1>;
};
