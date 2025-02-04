"use client"

import { useEffect, useState } from "react";
import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Hero: React.FC<{ totalProducts: number }> = ({ totalProducts }) => {
 
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const initialSearch = searchParams.get("search") || ""; // Read search from URL
    const [input, setInput] = useState(initialSearch);
    const [isPending, startTransition] = useTransition();

    // ✅ Sync input field with URL on page load or navigation
    useEffect(() => {
        setInput(initialSearch);
    }, [initialSearch]);

    const handleSearch = () => {
        if (input.trim() === "") return; // Prevent empty searches
    
        // Get the current search value from the URL
        const currentSearchQuery = searchParams.get("search") || "";
    
        // ✅ Prevent searching if input is the same as the existing query
        if (input.trim().toLowerCase() === currentSearchQuery.trim().toLowerCase()) {
            return;
        }
    
        const params = new URLSearchParams(searchParams);
        params.set("search", input);
        params.delete("page"); 
    
        startTransition(() => {
            router.push(`/?${params.toString()}`);
        });
    };

    const filterButtons = [
        { label: "All", emoji: "🟢" },
        { label: "Products", emoji: "📦" },
        { label: "Web3 events", emoji: "🎉" },
        { label: "Investors", emoji: "💼" },
        { label: "Newsletters", emoji: "📰" },
        { label: "Crypto Clubs", emoji: "⭐" },
        { label: "Incubators", emoji: "🚀" },
    ];

    const stats = [
        { label: "Total Products", value: totalProducts.toString() },
        { label: "Upcoming Events", value: "435" },
        { label: "Investors", value: "474" },
        { label: "Incubators", value: "123" },
    ];

    return (
        <section className="flex flex-col items-center px-4 py-16 space-y-12">
            {/* Hero Text */}
            <div className="text-center space-y-6 max-w-3xl">
                <h1 className="text-4xl md:text-3xl font-mono text-gray-900 dark:text-green-400 leading-tight">
                    A hub to track crypto fans, builders, and investors&apos;s contributions.
                </h1>
            </div>

            {/* Search Box */}
            <div className="w-full max-w-3xl">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Ask AI which Web3 products you want to explore!"
                        className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-green-400/30 rounded-lg focus:outline-none focus:border-gray-400 dark:focus:border-green-400 pr-24 text-gray-900 dark:text-green-400"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Search on Enter key
                    />

                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <span className="px-2 py-1 text-xs text-gray-900 dark:text-green-400 border border-gray-300 dark:border-green-400/30 rounded-md">
                            Product
                        </span>

                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            className="p-1 text-gray-900 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-green-400/10 rounded">
                                {isPending ? (
              // Spinner while loading
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

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
                {filterButtons.map((button) => (
                    <button
                        key={button.label}
                        className="px-4 py-2 text-sm text-gray-900 dark:text-green-400 border rounded-md transition-colors flex items-center gap-2"
                    >
                        <span>{button.emoji}</span>
                        {button.label}
                    </button>
                ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-4xl mt-12">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="p-4 border rounded-md text-center hover:bg-gray-100 dark:hover:bg-green-400/10 transition-colors"
                    >
                        <p className="text-sm text-gray-500 dark:text-green-400/70 uppercase">
                            {stat.label}
                        </p>
                        <p className="text-2xl font-mono text-gray-900 dark:text-green-400">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Hero;
