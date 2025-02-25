// src/app/sitemap.ts
import { generateSlug } from "@/utils/generateSlug";
import { MetadataRoute } from "next";
import { fetchAllProductIds } from "@/utils/productApi";
interface Product {
    name: string;
    id: number;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cryptopay.com";

    const products = await fetchAllProductIds();


    const productPages = products.products && products.products.map((product: Product) => {
        const slug = generateSlug(product.name);

        const url = `${baseUrl}/product/${slug}/${product.id}`;

        const lastModified = new Date();
        const changeFrequency = "weekly" as const;
        const priority = 0.8;

        return { url, lastModified, changeFrequency, priority };
    });


    return productPages;
}
