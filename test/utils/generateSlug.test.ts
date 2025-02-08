// tests/utils/generateSlug.test.ts
import { describe, it, expect } from "vitest";
import { generateSlug } from "../../src/utils/generateSlug";

describe("generateSlug", () => {
  it("should replace spaces with dashes and convert to lowercase", () => {
    const input = "Hello World Product";
    const output = generateSlug(input);
    expect(output).toBe("hello-world-product");
  });

  it("should remove special characters", () => {
    const input = "React! + Next #13";
    const output = generateSlug(input);
    expect(output).toBe("react-next-13");
  });

  it("should remove leading/trailing hyphens if they exist", () => {
    const input = "---Hello---";
    const output = generateSlug(input);
    expect(output).toBe("hello");
  });

  it("should handle empty strings gracefully", () => {
    const input = "";
    const output = generateSlug(input);
    expect(output).toBe("");
  });
});
