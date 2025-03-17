// export const metadata = {
//   title: "CryptoDiary | Crypto World Directory",
//   description: "Explore and track the activities and contributions of crypto enthusiasts, builders, and investors are documented.",
//   keywords: ["crypto", "diary", "crypto diary", "crypto enthusiast", "crypto builder", "crypto investor", "crypto products", "crypto directory", "blockchain projects", "crypto tracking", "web3 projects"],
//   alternates: {
//     canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://cryptodiary.fun",
//   },
// }

// export const dynamic = "force-dynamic"; // Ensures fresh data on each request
// import Hero from "../components/Hero/HeroSection"
// import ProductsTable from "@/components/Product/ProductTable";
// import { fetchProducts, fetchTotalProducts } from "@/utils/productApi"; 
 
// export default async function Home({searchParams}: {searchParams: Promise<{search: string, category: string, page: number}>}) { 
//   const {page, search, category} = await (searchParams); 
//   const productsData = await fetchProducts({ search, category, page });
//   const totalProducts = await fetchTotalProducts();

//   return (  
//     <div className="max-w-7xl mx-auto">
//       <Hero totalProducts={totalProducts} /> 
//       <ProductsTable productsData={productsData} searchParams={searchParams} />
//     </div>
//   )
// }


// src/app/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  // Automatically redirect to /product
  redirect("/product");
}
