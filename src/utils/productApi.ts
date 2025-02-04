import { cache } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

/**
 * Fetch paginated product list
 */
export async function fetchProducts({ search, category, page }: { search?: string; category?: string; page?: number }) {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (category) queryParams.append("category", category);
  if (page) queryParams.append("page", String(page));

  const res = await fetch(`${BASE_URL}/api/products?${queryParams.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

/**
 * Fetch total number of products (cached for performance)
 */
export const fetchTotalProducts = cache(async () => {
  console.log("🔥 Fetching total products from API..."); // Log API call

  try {
    const res = await fetch(`${BASE_URL}/api/products/stats`, {
      cache: "force-cache", // ✅ Cached response
    });

    if (!res.ok) throw new Error("Failed to fetch total product count");

    const data = await res.json();
    console.log("✅ Total products fetched:", data.totalProducts);
    return data.totalProducts;
  } catch (error) {
    console.error("❌ Error fetching total products:", error);
    return 0; // Return 0 as fallback
  }
});
