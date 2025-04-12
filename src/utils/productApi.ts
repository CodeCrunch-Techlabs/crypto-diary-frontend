import { cache } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cryptodiary.fun";

/**
 * Fetch paginated product list
 */
export async function fetchProducts({ search, category, page }: { search?: string; category?: string; page?: number }) {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (category) queryParams.append("category", category);
  if (page) queryParams.append("page", String(page));

  const res = await fetch(`${BASE_URL}/api/products?${queryParams.toString()}`, {
    next: {
      revalidate: 60
    }
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export const fetchAllProductIds = cache(async () => {
  const res = await fetch(`${BASE_URL}/api/products/ids`, {
    next: {
      revalidate: 60
    }
  });

  if (!res.ok) throw new Error("Failed to fetch product IDs");

  return res.json();
});

/**
 * Fetch total number of products (cached for performance)
 */
export const fetchTotalProducts = cache(async () => {

  try {
    const res = await fetch(`${BASE_URL}/api/products/stats`, {
    });

    if (!res.ok) throw new Error("Failed to fetch total product count");

    const data = await res.json();
    return data.totalProducts;
  } catch (error) {
    console.error("❌ Error fetching total products:", error);
    return 0; // Return 0 as fallback
  }
});
