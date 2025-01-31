export const dynamic = "force-dynamic"; // Ensures fresh data on each request

import ProductsTable from "@/app/components/Product/ProductTable";
import Hero from "../components/Hero/HeroSection";

export default async function ProductPage({ searchParams }: { searchParams: { search?: string; category?: string; page?: string } }) {
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    const limit = 10; // Set a default limit for pagination
    const category = searchParams.category || "";
    const search = searchParams.search || "";
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?page=${page}&limit=${limit}&category=${category}&search=${search}`,
        { cache: "no-store" } // Ensures fresh data for SSR
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
  
      const productsData = await response.json();
  
      return (
        <section className="px-6 py-12">
          {/* Hero Section */}
          <Hero />
  
          {/* Product Listing */}
          <ProductsTable productsData={productsData} />
        </section>
      );
    } catch (error) {
      console.error("Error fetching products:", error);
      return (
        <section className="px-6 py-12 text-center">
          <Hero />
          <p className="text-red-500">Failed to load products. Please try again later.</p>
        </section>
      );
    }
  }