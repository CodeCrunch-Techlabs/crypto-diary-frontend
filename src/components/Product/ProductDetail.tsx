import React from "react";
import BackButton from "../Button/BackButton";

interface Product {
  name: string;
  tagline: string;
  description: string;
  categories: string[];
  product_url: string;
  logo_url: string;
  media_urls: string[];
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetailPage: React.FC<ProductDetailProps> = ({ product }) => {

  if (!product) {
    return (
      <section className="px-6 py-12 text-center">
        <p className="text-red-500">Product not found.</p>
      </section>
    );
  }

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      {/* Back to Products Button */}
      <div className="mb-6">
        <BackButton />
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row bg-white dark:bg-black border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        {/* Logo Section */}
        <div className="p-6 flex justify-center items-center bg-gray-50 dark:bg-green-900/10">
          <img
            src={product.logo_url}
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
            {product.categories.map((category: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg bg-gray-100 dark:bg-green-900/10 text-gray-700 dark:text-green-300"
              >
                {category}
              </span>
            ))}
          </div>

          <div>
            <a
              href={product.product_url}
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
          {product.media_urls.map((image, index) => (
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
