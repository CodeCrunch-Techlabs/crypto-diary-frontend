// app/(dashboard)/layout.tsx
import Hero from "@/components/Hero/HeroSection";
import { fetchTotalProducts } from "@/utils/productApi"; 
import { fetchTotalEvents } from "@/utils/eventApi";

export const dynamic = "force-dynamic";

/**
 * This layout wraps every route inside (dashboard)/... 
 * and places the Hero at the top of each page.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If you need the total products for the Hero, you can fetch it here:
  const totalProducts = await fetchTotalProducts();
  const totalEvents = await fetchTotalEvents();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero at the top */}
      <Hero totalProducts={totalProducts} totalEvents={totalEvents} />

      {/* Render the actual page content below the hero */}
      {children}
    </div>
  );
}
