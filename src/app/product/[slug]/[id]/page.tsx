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
    // Return minimal or default metadata if product not found
    return {
      title: "Not Found - CryptoDiary",
      description: "No product found with the given ID."
      // You could also skip returning anything, Next will fallback to RootLayout.
    }
  }

  // Construct dynamic title & description
  const title = `CryptoDiary | ${product.name}`
  const description = product?.description || "Explore this crypto product on CryptoDiary."
  const canonical = `${BASE_URL}/product/${slug}/${id}`
  // Provide openGraph, twitter, etc. to enhance social sharing
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/product/${slug}/${id}`,
      images: product?.logo_url ? [product.logo_url] : ["/default-og-image.jpg"],
      // Add other Open Graph fields as needed
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product?.logo_url ? [product.logo_url] : ["/default-og-image.jpg"],
    },
    alternates: {
      canonical,
    },
    // You can add more fields like icons, alternates, etc.
  }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string; slug: string }> }) {
  const { id } = await params;
  // const { slug } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    return notFound();  
  }

  console.log('product', product);
  // const jsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "Product",
  //   name: product.name,
  //   description: product.description,
  //   image: [product.logo_url], 
  //   brand: {
  //     "@type": "Brand",
  //     name: "CryptoDiary",
  //   },
  //   category: product.categories.join(', '),
  //   url: `${BASE_URL}/product/${slug}/${id}`,
  // };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    image: [product.logo_url, ...product.media_urls],
    applicationCategory: product.categories.join(', '), // e.g., "Crypto tools, Investing"
    operatingSystem: "Blockchain", // Indicates it's a crypto/blockchain tool
    url: product.product_url, // Link to actual product
    author: {
      "@type": "Organization",
      name: "CryptoDiary",
      url: BASE_URL, // Your site URL
      logo: `${BASE_URL}/favicon.png` // Your site logo
    },
    // datePublished: product.created_at, // Use the created_at field
    offers: {
      "@type": "Offer",
      price: "0", // Free to use
      priceCurrency: "USD", // Default currency
      availability: "https://schema.org/InStock"
    }
  };


  return <ProductDetailPage product={product} jsonLd={jsonLd} />;
}
