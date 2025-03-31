// src/components/Home/HomeProductList.tsx
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/utils/interface";
import { generateSlug } from "@/utils/generateSlug";

interface HomeProductListProps {
    products: Product[];
}

const HomeProductList: React.FC<HomeProductListProps> = ({ products }) => {
    if (products.length === 0) {
        return (
            <section className="px-6 py-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-green-400">
                        No products found
                    </h2>
                </div>
            </section>
        );
    }

    return (
        <section className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-green-400">
                    Latest Products
                </h2>
                <Link
                    href="/product"
                    className="text-sm px-3 py-1 border border-green-500 rounded hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                >
                    View All Products
                </Link>
            </div>
            <div className="space-y-4 overflow-x-auto sm:overflow-x-visible">
                <div className="grid min-w-[900px] sm:min-w-0 grid-cols-[2fr_4fr_2fr] text-sm text-gray-500 dark:text-green-400 px-6 border-b border-gray-300 dark:border-green-400 pb-2">
                    <span>Name</span>
                    <span>Description</span>
                    <span>Category</span>
                </div>

                {products.map((product) => {
                    const slug = generateSlug(product.name);
                    return (
                        <Link
                            key={product.id}
                            href={`/product/${slug}/${product.id}`}
                            className="grid min-w-[900px] sm:min-w-0 grid-cols-[2fr_4fr_2fr] px-6 py-3 items-center border rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-green-400/5 gap-4"
                        >
                            <div className="flex items-center space-x-4">
                                <Image
                                    src={product.logo_url}
                                    alt={`${product.name} logo`}
                                    width={16}
                                    height={16}
                                    className="w-8 h-8 object-contain flex-shrink-0"
                                    loading="lazy"
                                />
                                <span className="font-medium text-xs sm:text-sm break-words">{product.name}</span>
                            </div>
                            <span className="text-xs sm:text-sm">{product.tagline}</span>
                            <span className="text-xs sm:text-sm">
                                {product.categories.map((c) => c).join(', ')}
                            </span>
                        </Link>
                    );
                })}
            </div>

            {/* <div className="mt-4">
        <Link
          href="/product"
          className="text-sm text-green-500 hover:underline dark:text-green-300"
        >
          View All Products →
        </Link>
      </div> */}
        </section>
    );
};

export default HomeProductList;
