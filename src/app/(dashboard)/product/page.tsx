export const metadata = {
    title: "CryptoDiary | Crypto World Directory",
    description: "Explore and track the activities and contributions of crypto enthusiasts, builders, and investors are documented.",
    keywords: ["crypto", "diary", "crypto diary", "crypto enthusiast", "crypto builder", "crypto investor", "crypto products", "crypto directory", "blockchain projects", "crypto tracking", "web3 projects"],
    alternates: {
      canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://cryptodiary.fun",
    },
  }
  
  export const dynamic = "force-dynamic"; // Ensures fresh data on each request
  import ProductsTable from "@/components/Product/ProductTable";
  import { fetchProducts} from "@/utils/productApi"; 
   
  export default async function ProductPage({searchParams}: {searchParams: Promise<{search: string, category: string, page: number}>}) { 
    const {page, search, category} = await (searchParams); 
    const productsData = await fetchProducts({ search, category, page });
  
    return (  
      <div className="max-w-7xl mx-auto">
        <ProductsTable productsData={productsData} searchParams={searchParams} />
      </div>
    )
  }
  