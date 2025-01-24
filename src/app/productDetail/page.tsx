import React from "react";
import Link from "next/link";

const ProductDetailPage: React.FC = () => {
  const product = {
    name: "Uniswap",
    tagline: "Decentralized trading protocol.",
    description:
      "Uniswap is a decentralized trading protocol that allows users to swap cryptocurrencies directly from their wallets without any middleman. Uniswap is a decentralized trading protocol that allows users to swap cryptocurrencies directly from their wallets without any middleman.",
    category: "DeFi",
    link: "https://uniswap.org",
    logo: "https://ph-files.imgix.net/3090d95b-e49a-497d-8a1c-38a2da573396.png",
    images: [
      "https://ph-files.imgix.net/23d8f967-c59a-4fd4-9c08-419cae5106c7.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=312&h=220&fit=max&frame=1&dpr=2",
      "https://ph-files.imgix.net/d01f5fc2-46c7-42e9-85fa-faec603c77a2.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=306&h=220&fit=max&frame=1&dpr=2",
      "https://ph-files.imgix.net/4ec9c72d-256a-43d8-9ac1-de8a63fe7364.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=308&h=220&fit=max&frame=1&dpr=2",
    ],
  };

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      {/* Back to Products Button */}
      <div className="mb-6">
        <Link href="/"
           className="inline-block px-4 py-2 text-sm font-semibold text-gray-900 dark:text-green-400 border border-gray-300 dark:border-green-400/30 rounded-md hover:bg-gray-100 dark:hover:bg-green-400/10 transition-colors">
            &larr; Back to Products
        </Link>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row bg-white dark:bg-black border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        {/* Logo Section */}
        <div className="p-6 flex justify-center items-center bg-gray-50 dark:bg-green-900/10">
          <img
            src={product.logo}
            alt={`${product.name} logo`}
            className="w-32 h-32 object-contain border border-gray-300 dark:border-green-900/30 rounded-lg"
          />
        </div>

        {/* Details Section */}
        <div className="flex-1 p-6 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-green-400">
            {product.name}
          </h1>
          <p className="text-lg text-gray-700 dark:text-green-300">
            {product.tagline}
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-green-400">
              About the Product
            </h2>
            <p className="text-gray-600 dark:text-green-300">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="px-3 py-1 text-sm border border-gray-300 rounded-lg bg-gray-100 dark:bg-green-900/10 text-gray-700 dark:text-green-300">
              {product.category}
            </span>
          </div>

          <div>
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-sm font-semibold text-white bg-green-500 dark:bg-green-400 hover:bg-green-600 dark:hover:bg-green-500 rounded-md shadow transition-colors"
            >
              Visit Product Website
            </a>
          </div>
        </div>
      </div>

      {/* Product Images */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-green-400">
          Product Images
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {product.images.map((image, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-green-900/30 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
