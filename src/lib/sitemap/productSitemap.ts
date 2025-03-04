import { generateSlug } from "@/utils/generateSlug";
import { generateSitemapFile } from "./utils";
import { fetchAllProductIds } from "@/utils/productApi";

interface Product {
    name: string;
    id: number;
}
// src/lib/sitemap/productSitemap.ts
export async function generateProductSitemap() {
    const products = await fetchAllProductIds();
    
    const urls = products.products.map((product: Product) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${generateSlug(product.name)}/${product.id}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8
    }));
  
    await generateSitemapFile(urls, 'sitemap-products.xml');
  }