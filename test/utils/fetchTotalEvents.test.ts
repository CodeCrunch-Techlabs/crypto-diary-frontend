import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';

// Save the original fetch so we can restore it later.
const originalFetch = global.fetch;
process.env.NEXT_PUBLIC_SITE_URL = "https://cryptodiary.fun";

let fetchTotalEvents: typeof import('../../src/utils/eventApi').fetchTotalEvents;

describe('fetchTotalEvents', () => {
  beforeEach(async () => {
    // Reset modules so that the cached function is re-imported fresh.
    vi.resetModules();
    // Re-import fetchTotalEvents from our eventApi module.
    ({ fetchTotalEvents } = await import('../../src/utils/eventApi'));
    // Replace global.fetch with a mock.
    global.fetch = vi.fn();
  });

  afterAll(() => {
    // Restore the original fetch.
    global.fetch = originalFetch;
  });

  it('returns totalEvents when response is OK', async () => {
    const mockData = { totalEvents: 123 };
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });
    const total = await fetchTotalEvents();
    expect(total).toEqual(123);
  });

  it('returns 0 when response is not OK', async () => {
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({ error: "error" }),
    });
    const total = await fetchTotalEvents();
    expect(total).toEqual(0);
  });

  it('returns 0 when fetch throws an error', async () => {
    (global.fetch as vi.Mock).mockRejectedValue(new Error("Network error"));
    const total = await fetchTotalEvents();
    expect(total).toEqual(0);
  });
});
