"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  searchProducts: (term: string) => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchProducts = async (term: string) => {
    if (!term.trim()) return;

    setLoading(true);
    setSearchTerm(term);

    const params = new URLSearchParams();
    params.set("search", term);

    // Update the URL & trigger re-fetch
    router.push(`/?${params.toString()}`);

    // Wait for Next.js data fetching to complete before setting loading to false
    setLoading(false);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, loading, searchProducts }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for easy usage
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
