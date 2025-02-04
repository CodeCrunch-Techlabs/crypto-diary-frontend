export const dynamic = "force-dynamic"; // Ensures fresh data on each request
import Hero from "../components/Hero/HeroSection"
import ProductsTable from "@/components/Product/ProductTable";
import { fetchProducts, fetchTotalProducts } from "@/utils/productApi";


export default async function Home({ searchParams }: { searchParams: { search?: string; category?: string; page?: string } }) {

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const search = searchParams.search || "";
  const category = searchParams.category || "";

  const productsData = await fetchProducts({ search, category, page });
  const totalProducts = await fetchTotalProducts();

  return (
    <main className="max-w-7xl mx-auto">
      <Hero totalProducts={totalProducts} />

      <ProductsTable productsData={productsData} searchParams={searchParams} />
    </main>
  )
}
