import React from "react";
import Link from "next/link";
import Pagination from "./Pagination";
import { generateSlug } from "@/utils/generateSlug";
import { Product } from "@/utils/interface";
import ScrollToTop from "@/utils/ScrollToTop";

interface ProductsTableProps {
  productsData: {
    success: boolean;
    currentPage: number;
    totalPages: number;
    products: Product[];
  };
  searchParams: { search?: string; page?: string }; 
}

const ProductsTable: React.FC<ProductsTableProps> = ({ productsData, searchParams }) => {
  const { products, currentPage, totalPages } = productsData;
  const searchQuery = searchParams.search || ""; 

  return (
    <section className="px-6 py-12">

      <ScrollToTop trigger={`${searchQuery}-${currentPage}`} />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-mono text-gray-900 dark:text-green-400">
          {/* Products */}
          {searchQuery ? `Results for "${searchQuery}"` : "All Products"}

        </h2>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-sm text-gray-900 dark:text-green-400 border border-gray-300 dark:border-green-400/30 rounded-md hover:bg-gray-100 dark:hover:bg-green-400/10 transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="space-y-4 pb-8">
        {/* Table Header */}
        <div className="grid grid-cols-[1.5fr_3.5fr_1.5fr] text-sm text-gray-500 dark:text-green-400 px-6 border-b border-gray-300 dark:border-green-400 pb-2">
          <span>Name</span>
          <span>Description</span>
          <span>Category</span>
        </div>

        {/* Table Rows */}
        {products.length > 0 ? (
          products.map((product) => {
            const slug = generateSlug(product.name); // Generate slug dynamically
            return (
            <Link
              key={product.id}
              href={`/product/${slug}/${product.id}`} // ✅ SEO-friendly URL
              className="grid grid-cols-[1.5fr_3.5fr_1.5fr] px-6 py-4 items-center border rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-green-400/5"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.logo_url}
                  alt={`${product.name} logo`}
                  className="w-8 h-8 object-contain"
                />
                <span className="font-medium">{product.name}</span>
              </div>
              <span className="w-[92%] truncate text-ellipsis overflow-hidden whitespace-nowrap">
                {product.tagline}
              </span>

              <span className="truncate overflow-hidden whitespace-nowrap">{product.categories.map((category: string) => category).join(', ')}</span>
            </Link>
            )
          })
        ) : (
          <div className="text-center py-6 text-gray-500 dark:text-green-300">
            No products found
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
};

export default ProductsTable;
