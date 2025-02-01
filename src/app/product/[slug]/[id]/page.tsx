import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/Product/ProductDetail";

interface ProductDetailProps {
  params: { id: string; slug: string };
}

// Function to fetch product details from API
async function fetchProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id, slug } = params;

  const product = await fetchProduct(id);

  if (!product) {
    return notFound(); // ✅ Show 404 page if product not found
  }
  console.log('here is the product details', product);

  return <ProductDetailPage product={product} />;
}
