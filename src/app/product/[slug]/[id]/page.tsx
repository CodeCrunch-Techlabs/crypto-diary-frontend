import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/Product/ProductDetail"; 
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cryptodiary.fun";
 
// Function to fetch product details from API
async function fetchProduct(id: string) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export async function generateMetadata({ params }: { params : Promise<{ id: string; slug: string }> }) {
  const { id } = await params
  const { slug } = await params
  const product = await fetchProduct(id)

  if (!product) {
    return {
      title: "Not Found - CryptoDiary",
      description: "No product found with the given ID."
    }
  }

  // Construct dynamic title & description
  const title = `CryptoDiary | ${product.name}`
  const description = product?.description || "Explore this crypto product on CryptoDiary."
  const canonical = `${BASE_URL}/product/${slug}/${id}`
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/product/${slug}/${id}`,
      images: [
        {
          url: product?.logo_url ? product.logo_url : "/favicon.png",
          width: 1200,
          height: 630,
          alt: product?.name || "CryptoDiary",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product?.logo_url ? [product.logo_url] : ["/images/default-og-image.png"],
    },
    alternates: {
      canonical,
    },
  }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string; slug: string }> }) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    return notFound();  
  }
 
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    image: [product.logo_url, ...product.media_urls],
    applicationCategory: product.categories.join(', '),  
    operatingSystem: "Blockchain", 
    url: product.product_url, 
    author: {
      "@type": "Organization",
      name: "CryptoDiary",
      url: BASE_URL, 
      logo: `${BASE_URL}/favicon.png` 
    },
    offers: {
      "@type": "Offer",
      price: "0", 
      priceCurrency: "USD", // Default currency
      availability: "https://schema.org/InStock"
    }
  };


  return <ProductDetailPage product={product} jsonLd={jsonLd} />;
}
