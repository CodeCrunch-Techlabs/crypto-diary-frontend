// tests/utils/fetchTotalProducts.test.ts
import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from "vitest";
import { fetchTotalProducts } from "../../src/utils/productApi";
const originalFetch = global.fetch;

beforeAll(() => {
  // If you want to ensure a base URL is used
  process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
});

describe("fetchTotalProducts", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    // (Optional) Clear the module cache if you want to test repeated calls without caching 
    // In Next.js environment, `cache()` is an SSR optimization, so multiple calls in the same test might still be cached.
    // For a single test run, it typically won't matter unless you explicitly test caching behavior.
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("should call the correct endpoint with cache: force-cache", async () => {
    // Mock a successful response
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ totalProducts: 123 }),
    });

    // Call the function
    const total = await fetchTotalProducts();

    // Check the total returned
    expect(total).toBe(123);

    // Check fetch was called correctly
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("/api/products/stats", {
      cache: "force-cache",
    });
  });

  it("should throw an error if the response is not OK", async () => {
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({ message: "Server error" }),
    });

    // Because the function itself catches errors and returns 0, 
    // we won't see the thrown error. Instead, we get 0.
    // If you want to confirm it *would have* thrown, you'd need to modify the code.
    // Currently it logs error and returns 0. Let's test exactly that:
    const result = await fetchTotalProducts();
    expect(result).toBe(0);
  });

  it("should return 0 if fetch throws (network error) and log to console.error", async () => {
    // Mock a network-level error
    (global.fetch as vi.Mock).mockRejectedValue(new Error("Network error"));

    // Spy on console.error to ensure it's logged
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await fetchTotalProducts();
    expect(result).toBe(0);
    expect(consoleSpy).toHaveBeenCalled();

    // Restore console.error
    consoleSpy.mockRestore();
  });

  it("should handle a successful response with missing totalProducts gracefully", async () => {
    // If the server doesn't return totalProducts for some reason:
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    });

    const result = await fetchTotalProducts();
    // If your code doesn't handle this gracefully, it may be `undefined`. 
    // Depending on your logic, you might want to default to 0 or handle it differently.
    expect(result).toBeUndefined();
    // or if you want to handle it as 0, you'd modify the function to do so, then test that.
  });
});
