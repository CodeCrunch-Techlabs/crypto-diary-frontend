// tests/components/BackButton.test.tsx
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BackButton from "../../src/components/Button/BackButton";

// Create a mock for router.back
const mockBack = vi.fn();

// Mock the next/navigation module to return the mockBack function
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe("BackButton component", () => {
  it("renders with correct text", () => {
    render(<BackButton />);
    const button = screen.getByRole("button", { name: /back to products/i });
    expect(button).toBeInTheDocument();
  });

  it("calls router.back when clicked", async () => {
    const user = userEvent.setup();
    render(<BackButton />);
    const button = screen.getByRole("button", { name: /back to products/i });
    await user.click(button);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
