// import { cache } from "react";

import { cache } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cryptodiary.fun";

/**
 * Fetch paginated event list
 */
export async function fetchEvents({ search, category, page }: { search?: string; category?: string; page?: number }) {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (category) queryParams.append("category", category);
  if (page) queryParams.append("page", String(page));

  const res = await fetch(`${BASE_URL}/api/events?${queryParams.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch events");

  return res.json();
}


/**
 * Fetch total number of events (cached for performance)
 */
export const fetchTotalEvents = cache(async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/events/stats`, {
    });

    if (!res.ok) throw new Error("Failed to fetch total events");

    const data = await res.json();
    return data.totalEvents;
  } catch (error) {
    console.error("❌ Error fetching total events:", error);
    return 0; // Return 0 as fallback
  }
});

