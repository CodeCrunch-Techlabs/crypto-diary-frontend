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

export default async function ProductDetail({ params }: { params: Promise<{ id: string; slug: string }> }) {
  const { id } = await params;

  const product = await fetchProduct(id);

  if (!product) {
    return notFound();  
  }

  return <ProductDetailPage product={product} />;
}
