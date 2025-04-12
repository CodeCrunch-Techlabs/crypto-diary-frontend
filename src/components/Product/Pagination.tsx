"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import NProgress from "nprogress"; 

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, basePath = "/product" }) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const pageNumber = Number(currentPage);

  const changePage = (page: number) => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    
    params.set("page", String(page)); 
    NProgress.start(); 
    router.push(`${basePath}/?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-6">
      <button onClick={() => changePage(1)} disabled={pageNumber === 1} className="p-2 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-green-400/10">
        <ChevronsLeft className="w-5 h-5" />
      </button>

      <button onClick={() => changePage(pageNumber - 1)} disabled={pageNumber === 1} className="p-2 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-green-400/10">
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span className="text-sm text-gray-600 dark:text-green-300">
        Page {pageNumber} of {totalPages}
      </span>

      <button onClick={() => changePage(pageNumber + 1)} disabled={pageNumber === totalPages} className="p-2 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-green-400/10">
        <ChevronRight className="w-5 h-5" />
      </button>

      <button onClick={() => changePage(totalPages)} disabled={pageNumber === totalPages} className="p-2 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-green-400/10">
        <ChevronsRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
