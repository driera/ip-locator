import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorBoundary } from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it("should render children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render error UI when child throws", () => {
    const ThrowingComponent = () => {
      throw new Error("Test error");
    };

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    const alert = screen.getByRole("alert");
    expect(
      within(alert).getByRole("heading", { name: /something went wrong/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("should provide retry functionality", async () => {
    const user = userEvent.setup();
    const ThrowingComponent = () => {
      throw new Error("Test error");
    };

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    const mockReload = jest.fn();
    Object.defineProperty(window, "location", {
      value: { reload: mockReload },
      writable: true
    });

    await user.click(screen.getByText("Try again"));

    expect(mockReload).toHaveBeenCalled();
  });
});
