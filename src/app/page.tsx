export const dynamic = 'force-dynamic';
import Hero from "@/components/Hero/HeroSection";
import LandingProductList from "@/components/Home/LandingProductList";
import LandingEventList from "@/components/Home/LandingEventList";
import { fetchProducts, fetchTotalProducts } from "@/utils/productApi";
import { fetchEvents, fetchTotalEvents } from "@/utils/eventApi";

export default async function Home({searchParams}: {searchParams: Promise<{search: string, page: number}>}) {
  const {page, search} = await (searchParams); 
  const productsData = await fetchProducts({ search, page });
  const eventsData = await fetchEvents({ search, page });
  const totalProducts = await fetchTotalProducts();
  const totalEvents = await fetchTotalEvents();

  return (
    <main className="max-w-7xl mx-auto">
      <Hero totalProducts={totalProducts} totalEvents={totalEvents} />
      <LandingProductList products={productsData.products.slice(0, 10)} />
      <LandingEventList events={eventsData.events.slice(0, 10)} />
    </main>
  );
}
