"use client";

import { useRouter } from "next/navigation";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()} // Navigate to the previous page
      className="inline-block px-4 py-2 text-sm font-semibold text-gray-900 dark:text-green-400 border border-gray-300 dark:border-green-400/30 rounded-md hover:bg-gray-100 dark:hover:bg-green-400/10 transition-colors"
    >
      &larr; Back to Products
    </button>
  );
};

export default BackButton;
