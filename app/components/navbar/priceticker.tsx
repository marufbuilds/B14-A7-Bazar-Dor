 import type { Product } from "@/app/types/bazardor";
//  import "./globals.css";

interface PriceTickerProps {
  products: Product[];
}

export function TickerItems({ products }: { products: Product[] }) {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm"
        >
          <span className="font-medium text-gray-700">
            {product.nameBn}
          </span>

          <span className="font-semibold text-gray-900">
            ৳{product.today}/{product.unit}
          </span>

          <span
            className={
              product.change.dir === "up"
                ? "font-semibold text-green-600"
                : "font-semibold text-red-600"
            }
          >
            {product.change.dir === "up" ? "▲" : "▼"}{" "}
            {product.change.pct}%
          </span>

          <span className="text-gray-300">•</span>
        </div>
      ))}
    </div>
  );
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products.length) return null;

  return (
    <div className="w-full overflow-hidden border-b border-gray-200 bg-gray-50">
      <div className="flex w-max animate-ticker py-3">
        {/* First copy */}
        <TickerItems products={products} />

        {/* Second copy */}
        <TickerItems products={products} />
      </div>
    </div>
  );
}