 import Link from "next/link";
import type { Product } from "@/app/types/bazardor";

interface PriceIncreaseCardProps {
  product: Product;
}

const PriceIncreaseCard = ({ product }: PriceIncreaseCardProps) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/10"
    >
      {/* Soft Background Glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-100/70 blur-2xl transition-transform duration-500 group-hover:scale-150" />

      {/* Product */}
      <div className="relative flex items-center gap-4 p-4">
        {/* Product Icon */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-50 text-4xl transition-transform duration-300 group-hover:scale-105">
          {product.image}
        </div>

        {/* Product Information */}
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            {product.categoryNameBn}
          </p>

          <h3 className="truncate text-base font-bold text-gray-900">
            {product.nameBn}
          </h3>

          <div className="mt-1 flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ৳{product.today}
            </span>

            <span className="text-xs text-gray-400">
              / {product.unit}
            </span>
          </div>
        </div>

        {/* Percentage */}
        <div className="shrink-0 self-start">
          <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
            ↑ {product.change.pct}%
          </span>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2.5">
        <span className="text-xs text-gray-400">
          Today&apos;s price
        </span>

        <span className="text-xs font-semibold text-green-600 transition-transform duration-300 group-hover:translate-x-1">
          View details →
        </span>
      </div>
    </Link>
  );
};

export default PriceIncreaseCard;