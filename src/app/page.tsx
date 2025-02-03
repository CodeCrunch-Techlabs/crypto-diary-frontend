export const dynamic = "force-dynamic"; // Ensures fresh data on each request
import Hero from "../components/Hero/HeroSection"
import ProductsTable from "@/components/Product/ProductTable";

async function fetchProducts({ search, category, page }: { search?: string; category?: string; page?: number }) {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (category) queryParams.append("category", category);
  if (page) queryParams.append("page", String(page));

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products?${queryParams.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export default async function Home({ searchParams }: { searchParams: { search?: string; category?: string; page?: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const search = searchParams.search || "";
  const category = searchParams.category || "";

  const productsData = await fetchProducts({ search, category, page });

  return (
    <main className="max-w-7xl mx-auto">
      <Hero />
      <ProductsTable productsData={productsData} searchParams={searchParams} />
    </main>
  )
}






 