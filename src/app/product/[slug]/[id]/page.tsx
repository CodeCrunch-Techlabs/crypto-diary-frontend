import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/Product/ProductDetail"; 
 
// Function to fetch product details from API
async function fetchProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`, {
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

  // Provide openGraph, twitter, etc. to enhance social sharing
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${slug}/${id}`,
      images: product?.imageUrl ? [product.imageUrl] : ["/default-og-image.jpg"],
      // Add other Open Graph fields as needed
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product?.imageUrl ? [product.imageUrl] : ["/default-og-image.jpg"],
    }
    // You can add more fields like icons, alternates, etc.
  }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string; slug: string }> }) {
  const { id } = await params;

  const product = await fetchProduct(id);

  if (!product) {
    return notFound();  
  }

  return <ProductDetailPage product={product} />;
}
