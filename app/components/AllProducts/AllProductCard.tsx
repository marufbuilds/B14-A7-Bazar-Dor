import Link from "next/link";
import type { Product } from "@/app/types/bazardor";

interface AllProductCardProps {
  product: Product;
}

const AllProductCard = ({ product }: AllProductCardProps) => {
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Top Accent */}
      <div
        className={`absolute left-0 top-0 h-1 w-full ${
          isDown
            ? "bg-gradient-to-r from-red-500 to-orange-400"
            : "bg-gradient-to-r from-green-500 to-emerald-400"
        }`}
      />

      {/* Main Content */}
      <div className="relative flex items-center gap-4 p-4">
        {/* Product Icon */}
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl ${
            isDown ? "bg-red-50" : "bg-green-50"
          }`}
        >
          {product.image}
        </div>

        {/* Product Information */}
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs font-medium text-gray-400">
            {product.category}
          </p>

          <h3 className="truncate text-base font-bold text-gray-900">
            {product.nameBn}
          </h3>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-lg font-extrabold text-gray-900">
              ৳{product.today}
            </span>

            <span className="text-xs text-gray-500">
              / {product.unit}
            </span>
          </div>
        </div>

        {/* Price Change */}
        <div
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
            isDown
              ? "bg-red-50 text-red-600 ring-1 ring-red-100"
              : "bg-green-50 text-green-600 ring-1 ring-green-100"
          }`}
        >
          {isDown ? "↓" : "↑"} {Math.abs(product.change.pct)}%
        </div>
      </div>

      {/* Bottom Action */}
      <div className="relative flex items-center justify-between border-t border-gray-100 px-4 py-3">
        <span className="text-xs font-medium text-gray-400">
          Today&apos;s price
        </span>

        <span
          className={`flex items-center gap-1 text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1 ${
            isDown ? "text-red-600" : "text-green-600"
          }`}
        >
          View details
          <span>→</span>
        </span>
      </div>
    </Link>
  );
};

export default AllProductCard;