"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Define the search context
interface SearchContextType {
  search: string;
  category: string;
  loading: boolean;
  products: any[];
  currentPage: number;
  totalPages: number;
  setSearch: (query: string) => void;
}

// Create context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Provider component
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract values from URL
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialPage = Number(searchParams.get("page") || 1);

  // States for search query, category, and loading
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch products
  const fetchProducts = async (searchQuery: string, page = 1) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append("search", searchQuery);
      if (category) queryParams.append("category", category);
      queryParams.append("page", page.toString());

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5003/api";
      console.log("Fetching from:", `${backendUrl}/products?${queryParams.toString()}`);

      const res = await fetch(`${backendUrl}/products?${queryParams.toString()}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  // Handle search input change
  const handleSearch = (query: string) => {
    // Prevent unnecessary API calls if the query hasn't changed
    if (query === search) return;
  
    setSearch(query);
    router.push(`/?search=${query}`);
    fetchProducts(query);
  };
  
  // Fetch products on page load & when URL changes
  useEffect(() => {
    fetchProducts(search, currentPage);
  }, [search, currentPage, category]);

  return (
    <SearchContext.Provider value={{ search, category, loading, products, currentPage, totalPages, setSearch: handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook for using search context
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
