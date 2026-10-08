import type { Product } from "@/app/types/bazardor";
import AllProductCard from "./AllProductCard";

interface AllProductListProps {
  products: Product[];
}

export const AllProductList = ({ products }: AllProductListProps) => {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1120px]">

        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500" />

            <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
              Market
            </p>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            All Products
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Browse the latest prices of all available products.
          </p>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <AllProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-gray-300">
            <p className="text-sm text-gray-500">
              No products found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProductList;