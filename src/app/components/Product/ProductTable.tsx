// "use client";

// import React, { useState, useMemo } from "react";
// import Link from "next/link";
// import { products } from "@/app/Const/products";
// import Pagination from "@/app/components/Product/Pagination";

// const ProductsTable: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm] = useState("");

//   const itemsPerPage = 10;

//   // Filtered and paginated products
//   const filteredProducts = useMemo(() => {
//     return products.filter(
//       (product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.blockchain.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm]);

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const currentProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Pagination handlers
//   const goToFirstPage = () => setCurrentPage(1);
//   const goToLastPage = () => setCurrentPage(totalPages);
//   const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
//   const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

//   return (
//     <section className="px-6 py-12">
//       {/* Header */}
// <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
//   <h2 className="text-2xl font-mono text-gray-900 dark:text-green-400">
//     Products
//   </h2>
//   <div className="flex items-center space-x-4">
//     <button className="px-4 py-2 text-sm text-gray-900 dark:text-green-400 border border-gray-300 dark:border-green-400/30 rounded-md hover:bg-gray-100 dark:hover:bg-green-400/10 transition-colors">
//       View All
//     </button>
//   </div>
// </div>

//       {/* Table */}
//       <div className="space-y-4 pb-8">
//         {/* Table Header */}
//         <div className="grid grid-cols-[1.5fr_3fr_1fr_1fr] text-sm text-gray-500 dark:text-green-400 px-6 border-b border-gray-300 dark:border-green-400 pb-2">
//           <span className="mb-2">Name</span>
//           <span className="mb-2">Description</span>
//           <span className="mb-2">Category</span>
//           <span className="mb-2">Blockchain</span>
//         </div>

//         {/* Table Rows or No Results */}
//         {currentProducts.length > 0 ? (
//           currentProducts.map((product, index) => (
//             <Link
//               key={index}
//               href={`/productDetail`} // Assuming `product.id` exists
//               className="grid grid-cols-[1.5fr_3fr_1fr_1fr] px-6 py-4 items-center border rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-green-400/5"
//             >
//               {/* Logo and Name */}
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={product.logo}
//                   alt={`${product.name} logo`}
//                   className="w-8 h-8 object-contain"
//                 />
//                 <span className="font-medium">{product.name}</span>
//               </div>

//               {/* Description */}
//               <span className="w-[92%] truncate text-ellipsis overflow-hidden whitespace-nowrap">
//                 {product.description}
//               </span>

//               {/* Category */}
//               <span>{product.category}</span>

//               {/* Blockchain */}
//               <span>{product.blockchain}</span>
//             </Link>
//           ))
//         ) : (
//           <div className="text-center py-6 text-gray-500 dark:text-green-300">
//             No products found
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onNext={nextPage}
//         onPrev={prevPage}
//         onFirst={goToFirstPage}
//         onLast={goToLastPage}
//       />
//     </section>
//   );
// };

// export default ProductsTable;

"use client";

import React from "react";
import Link from "next/link";
import { 
  // useRouter,
   useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  categories: string[];
  blockchain: string;
  logo_url: string;
}

interface ProductsTableProps {
  productsData: {
    success: boolean;
    currentPage: number;
    totalPages: number;
    products: Product[];
  };
}

const ProductsTable: React.FC<ProductsTableProps> = ({ productsData }) => {
  const { products, currentPage, totalPages } = productsData;
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // const router = useRouter();
  // const category = searchParams.get("category") || "";

  return (
    <section className="px-6 py-12">

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
          products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
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
          ))
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
