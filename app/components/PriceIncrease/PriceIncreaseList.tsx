 import type { Product } from "@/app/types/bazardor";
import PriceIncreaseCard from "./PriceIncreaseCard";
import Link from "next/link";
// import { Link } from "lucide-react";
// import { Link } from "lucide-react";

interface PriceIncreaseListProps {
  products: Product[];
}

const PriceIncreaseList = ({ products }: PriceIncreaseListProps) => {
  const topIncreases = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1120px] lg:min-h-[332px]">
        {/* Header */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />

              <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-600">
                Market Update
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Price Increases
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Products with the biggest price increases today.
            </p>
          </div>

          <Link
            href="/market"
            className="hidden items-center gap-1 text-sm font-semibold text-green-600 transition-colors hover:text-green-700 sm:flex"
          >
            View all
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Cards */}
        {topIncreases.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topIncreases.map((product) => (
              <PriceIncreaseCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-gray-300">
            <p className="text-sm text-gray-500">
              No price increases found today.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PriceIncreaseList;