"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
    title: string;
    placeholder: string;
    mode: "all" | "product" | "event";  
}

const SearchBar: React.FC<SearchBarProps> = ({ title, placeholder, mode }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get("search") || "";
    const [input, setInput] = useState(initialSearch);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setInput(initialSearch);
    }, [initialSearch]);

    const handleSearch = () => {
      const currentSearch = searchParams.get("search") || "";
      if (input.trim() === currentSearch) return;

      if (!input.trim()) return;

        const params = new URLSearchParams();
        params.set("search", input.trim());

        startTransition(() => {
            if (mode === "all") {
                // Search both product and event  
                router.push(`/?${params.toString()}`);
            } else if (mode === "product") {
                router.push(`/product?${params.toString()}`);
            } else if (mode === "event") {
                router.push(`/event?${params.toString()}`);
            }
        });
    };
 
    return (
        <div className="w-full max-w-3xl mx-auto space-y-4">
          <p className="text-center font-mono text-4xl md:text-3xl text-gray-900 dark:text-green-400 leading-tight mb-8">
            {title}
          </p>
      
          <div className="relative">
            <input
              type="text"
              placeholder={placeholder}
              className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-green-400/30 rounded-lg focus:outline-none focus:border-gray-400 dark:focus:border-green-400 pr-24 text-gray-900 dark:text-green-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
      
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {mode !== "all" && (
                <span className="px-2 py-1 text-xs sm:text-sm text-gray-900 dark:text-green-400 border border-gray-300 dark:border-green-400/30 rounded-md whitespace-nowrap">
                  {mode === "product" ? "Product" : "Event"}
                </span>
              )}
      
              <button
                onClick={handleSearch}
                className="p-1 text-gray-900 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-green-400/10 rounded"
              >
                {isPending ? (
                  <div className="w-5 h-5 border-2 border-transparent border-t-green-400 border-r-green-400 rounded-full animate-spin"></div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      );
      

};


export default SearchBar;
