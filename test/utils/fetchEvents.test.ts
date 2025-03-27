import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
// import { fetchEvents } from '@/utils/eventApi';
import { fetchEvents } from '../../src/utils/eventApi';

// Save original fetch to restore after tests
const originalFetch = global.fetch;

// Set the environment variable (if needed)
process.env.NEXT_PUBLIC_SITE_URL = "https://cryptodiary.fun";

beforeEach(() => {
  // Replace global.fetch with a mock before each test.
  global.fetch = vi.fn();
});

afterAll(() => {
  // Restore the original fetch after all tests.
  global.fetch = originalFetch;
});

describe("fetchEvents", () => {
  it("forms the correct URL with no parameters", async () => {
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true, events: [] }),
    });

    await fetchEvents({});
    expect(global.fetch).toHaveBeenCalledWith(
      "https://cryptodiary.fun/api/events?",
      { cache: "no-store" }
    );
  });

  it("forms the correct URL with search parameter", async () => {
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true, events: [] }),
    });

    await fetchEvents({ search: "foo" });
    expect(global.fetch).toHaveBeenCalledWith(
      "https://cryptodiary.fun/api/events?search=foo",
      { cache: "no-store" }
    );
  });

  it("forms the correct URL with category parameter", async () => {
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true, events: [] }),
    });

    await fetchEvents({ category: "bar" });
    expect(global.fetch).toHaveBeenCalledWith(
      "https://cryptodiary.fun/api/events?category=bar",
      { cache: "no-store" }
    );
  });

  it("forms the correct URL with page parameter", async () => {
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true, events: [] }),
    });

    await fetchEvents({ page: 3 });
    expect(global.fetch).toHaveBeenCalledWith(
      "https://cryptodiary.fun/api/events?page=3",
      { cache: "no-store" }
    );
  });

  it("forms the correct URL with multiple parameters", async () => {
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true, events: [] }),
    });

    await fetchEvents({ search: "foo", category: "bar", page: 2 });
    const urlCalled = (global.fetch as vi.Mock).mock.calls[0][0];
    expect(urlCalled).toContain("search=foo");
    expect(urlCalled).toContain("category=bar");
    expect(urlCalled).toContain("page=2");
    expect(urlCalled).toContain("https://cryptodiary.fun/api/events?");
    // Additionally, the options should include cache: "no-store"
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://cryptodiary.fun/api/events?"),
      { cache: "no-store" }
    );
  });

  it("returns JSON data when the response is OK", async () => {
    const mockData = { success: true, events: [{ id: 1, title: "Event 1" }] };
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });

    const result = await fetchEvents({ search: "foo" });
    expect(result).toEqual(mockData);
  });

  it("throws an error when the response is not OK", async () => {
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({ error: "Server Error" }),
    });

    await expect(fetchEvents({})).rejects.toThrow("Failed to fetch events");
  });
});
