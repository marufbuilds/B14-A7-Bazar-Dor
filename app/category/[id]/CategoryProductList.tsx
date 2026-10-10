 
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import type { MouseEvent } from "react";
import type { Product } from "@/app/types/bazardor";

type SortOption = "default" | "low-to-high" | "high-to-low";

interface CategoryProductListProps {
  products: Product[];
  isAuthenticated: boolean;
}

export default function CategoryProductList({
  products,
  isAuthenticated,
}: CategoryProductListProps) {
  const [sort, setSort] = useState<SortOption>("default");
  const router = useRouter();

  // Sort products by today's price
  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-to-high") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "high-to-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  // Redirect unauthenticated users to sign-in
  const handleProductClick = (
    event: MouseEvent<HTMLAnchorElement>,
    productId: number
  ) => {
    if (isAuthenticated) return;

    event.preventDefault();

    const message = "Please log in first to view product details.";
    const redirectTo = `/product/${productId}`;

    toast.error(message);

    window.setTimeout(() => {
      router.push(
        `/sign-in?redirectTo=${encodeURIComponent(
          redirectTo
        )}&message=${encodeURIComponent(message)}`
      );
    }, 900);
  };

  return (
    <section>
      {/* Section Heading and Sorting */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Products in this category
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Browse products and compare today&apos;s prices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="product-sort"
            className="shrink-0 text-sm font-medium text-gray-600"
          >
            Sort by
          </label>

          <select
            id="product-sort"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:flex-none"
          >
            <option value="default">Default</option>
            <option value="low-to-high">
              Price: Low to High
            </option>
            <option value="high-to-low">
              Price: High to Low
            </option>
          </select>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              onClick={(event) =>
                handleProductClick(event, product.id)
              }
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-md hover:shadow-green-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              {/* Product Icon */}
              <div className="relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-green-50/70 p-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm transition duration-300 group-hover:scale-105">
                  <span className="text-4xl">
                    {product.categoryIcon}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-1 flex-col p-3">
                <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-gray-900 transition group-hover:text-green-800">
                  {product.nameBn}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Per {product.unit}
                </p>

                {/* Today's Price */}
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <p className="text-[11px] font-medium text-gray-500">
                    Today&apos;s listed price
                  </p>

                  <div className="mt-1 flex flex-wrap items-baseline gap-1.5">
                    <span className="text-xl font-bold tracking-tight text-gray-900">
                      ৳{product.today.toLocaleString("en-US")}
                    </span>

                    <span className="text-xs text-gray-500">
                      / {product.unit}
                    </span>
                  </div>
                </div>

                {/* Price Change */}
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
                  <span className="text-xs text-gray-500">
                    {isUp
                      ? "Increased from yesterday"
                      : "Decreased from yesterday"}
                  </span>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${
                      isUp
                        ? "bg-red-50 text-red-600 ring-red-100"
                        : "bg-green-50 text-green-600 ring-green-100"
                    }`}
                  >
                    {isUp ? "↑" : "↓"}{" "}
                    {Math.abs(product.change.pct)}%
                  </span>
                </div>

                {/* View Details */}
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3 mt-3">
                  
                  
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

