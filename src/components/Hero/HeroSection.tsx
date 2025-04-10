"use client";

import { useRouter } from "next/navigation";
import SearchBar from "../Common/SearchBar"; 
import NProgress from "nprogress";


const Hero: React.FC<{ totalProducts: number; totalEvents: number }> = ({ totalProducts, totalEvents }) => {
  const router = useRouter();

  const filterButtons = [
    { label: "Products", emoji: "📦", path: "/product" },
    { label: "Web3 events", emoji: "🎉", path: "/event" },
    { label: "Investors", emoji: "💼", path: "/investor" },
    { label: "Newsletters", emoji: "📰", path: "/newsletter" },
    { label: "Crypto Clubs", emoji: "⭐", path: "/club" },
    { label: "Incubators", emoji: "🚀", path: "/incubator" },
  ];

  const stats = [
    { label: "Total Products", value: totalProducts.toString() },
    { label: "Upcoming Events", value: totalEvents.toString() },
    { label: "Investors", value: "474" },
    { label: "Incubators", value: "123" },
  ];

  const handleNavigation = (path: string) => {

    console.log("Navigating to:", path);
    NProgress.start(); 
    router.push(path); 
  };
  

  return (
    <section className="flex flex-col items-center px-4 py-16 space-y-12">

      {/* Reusable SearchBar */}
      <SearchBar title="A hub to track crypto fans, builders, and investors&apos;s contributions." placeholder="Ask AI what you want to explore from the crypto world!" mode="all" />

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {filterButtons.map((button) => (
          <button
            key={button.label}
            onClick={() => handleNavigation(button.path)}
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
            <p className="text-sm text-gray-500 dark:text-green-400/70 uppercase">{stat.label}</p>
            <p className="text-2xl font-mono text-gray-900 dark:text-green-400">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
