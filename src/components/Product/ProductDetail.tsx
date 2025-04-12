
import React from "react";
import Image from "next/image";
import Breadcrumb from "../Breadcrumbs";

interface Product {
  name: string;
  tagline: string;
  description: string;
  categories: string[];
  product_url: string;
  logo_url: string;
  media_urls: string[];
}

interface JsonLd {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image: string[];
}


interface ProductDetailProps {
  product: Product;
  jsonLd: JsonLd;
}

const ProductDetailPage: React.FC<ProductDetailProps> = ({ product, jsonLd }) => {

  if (!product) {
    return (
      <section className="px-6 py-12 text-center">
        <p className="text-red-500">Product not found.</p>
      </section>
    );
  }

  return (
    <section className="px-6 max-w-7xl mx-auto">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

     <Breadcrumb links={[
        { name: "Product", url: "/product" }, 
        { name: product.name }
      ]} />
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row bg-white dark:bg-black border border-gray-200 shadow-lg rounded-lg overflow-hidden mt-10">
        {/* Logo Section */}
        <div className="p-6 flex justify-center items-center bg-gray-50 dark:bg-green-900/10">
          <Image
            width={42}
            height={42}
            src={product.logo_url}
            alt={`${product.name} logo`}
            title={`${product.name} logo`}
            className="w-32 h-32 object-contain border border-gray-300 dark:border-green-900/30 rounded-lg"
            loading="lazy"
            priority={false}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBLa6S3iMjAkL2Xqanh1hp8xzwGInOw4OPoc1gtdhV2k8nBFTG78yRGO3gfw+9etyLlTOWHNKcrvbYuzy5kNFU3ky2c0VzHYZMg3pzRbEseTnHSiiqkY0y0znNFFFSbH//Z"
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
              className="inline-block px-6 py-3 text-sm font-semibold text-black bg-green-500 dark:bg-green-400 hover:bg-green-600 dark:hover:bg-green-500 rounded-md shadow transition-colors color:black"
            >
              Website
            </a>
          </div>
        </div>
      </div>

      {/* Product Images */}

      {product.media_urls.length > 0 && (
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
                <Image
                  src={image}
                  alt={`Product image ${index + 1}`}
                  title={`Product image ${index + 1}`}
                  width={256}
                  height={256}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                  priority={false}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAASACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCK2lCkZNWH1WVC6Wtv5jIcF2PA/CsI3RQZHOO1Nj1ECVmBxu68Z/MGvXhGLXmcU+dzXY6KLWJHKx3MHlu3RlPH5VDdT7s4NY5u90odiM/TH6VO0+5c1lNJbbnXGPK9NjKFQzDoe9FFTLYyjuTW3TPerLE7aKKg6D//2Q=="
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetailPage;