// tests/utils/productApi.test.ts
import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from "vitest";
import { fetchProducts } from "../../src/utils/productApi";


/**
 * We'll set a default for NEXT_PUBLIC_SITE_URL so the function
 * knows which base URL to use. You can also set this in a .env.test file
 * if you prefer, but for simplicity, we'll do it inline here.
 */
beforeAll(() => {
  process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
});

describe("fetchProducts", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    // Mock the global fetch before each test
    global.fetch = vi.fn();
  });

  afterAll(() => {
    // Restore original fetch
    global.fetch = originalFetch;
  });

  it("should form the correct URL with no parameters", async () => {
    // Mock a successful response
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true, products: [] }),
    });

    // Call the function with no arguments
    await fetchProducts({});

    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Check that fetch was called with the correct URL and cache option
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/products?",
      { cache: "no-store" }
    );
  });

  it("should append search param if provided", async () => {
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true, products: [] }),
    });

    // Call the function with a search query
    await fetchProducts({ search: "test-product" });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/products?search=test-product",
      { cache: "no-store" }
    );
  });

  it("should append page param if provided", async () => {
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true, products: [] }),
    });

    // Call the function with a page parameter
    await fetchProducts({ page: 3 });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/products?page=3",
      { cache: "no-store" }
    );
  });

  it("should append multiple params if provided (search + page + category)", async () => {
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true, products: [] }),
    });

    await fetchProducts({ search: "web3", category: "Events", page: 2 });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/products?search=web3&category=Events&page=2",
      { cache: "no-store" }
    );
  });

  it("should return JSON data if the response is OK", async () => {
    // Mock data to verify the JSON payload
    const mockData = { success: true, products: [{ id: 1, name: "Mock Product" }] };
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });

    const result = await fetchProducts({ search: "any" });
    expect(result).toEqual(mockData);
  });

  it("should throw an error if the response is not OK", async () => {
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({ error: "Some server error" }),
    });

    await expect(fetchProducts({})).rejects.toThrow("Failed to fetch products");
  });
});
