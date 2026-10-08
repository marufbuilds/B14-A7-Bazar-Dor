 import { notFound } from "next/navigation";
import { getProduct } from "@/app/lib/api";

export const instant = false;
interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}
 

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;

  let product;

  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  const averagePrice =
    product.markets.length > 0
      ? Math.round(
          product.markets.reduce(
            (total, market) =>
              total + (market.min + market.max) / 2,
            0
          ) / product.markets.length
        )
      : product.today;

  const minPrice =
    product.markets.length > 0
      ? Math.min(...product.markets.map((market) => market.min))
      : product.today;

  const maxPrice =
    product.markets.length > 0
      ? Math.max(...product.markets.map((market) => market.max))
      : product.today;

  return (
    <main className="min-h-screen bg-[#f4f8f5] px-3 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-[1120px]">

        {/* Product Header */}
        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-4">

            {/* Product Info */}
            <div className="flex min-w-0 items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f1f6f2] sm:h-16 sm:w-16">
                <span className="text-3xl sm:text-4xl">
                  {product.image}
                </span>
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold text-gray-900 sm:text-2xl">
                  {product.nameBn}
                </h1>

                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                  {product.categoryNameBn} · {product.unit}
                </p>

                <p className="mt-1 hidden text-xs text-gray-400 sm:block">
                  বাজারদর ও বিভিন্ন বাজারের মূল্যের তুলনা
                </p>
              </div>
            </div>

            {/* Current Price */}
            <div className="shrink-0 rounded-xl bg-[#f1f6f2] px-4 py-3 text-right sm:px-6">
              <p className="text-[10px] font-medium text-gray-500 sm:text-xs">
                বর্তমান দাম
              </p>

              <p className="text-2xl font-bold text-gray-900 sm:text-3xl">
                ৳{product.today}
              </p>

              <p
                className={`text-[10px] font-semibold sm:text-xs ${
                  product.change.dir === "up"
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {product.change.dir === "up" ? "▲" : "▼"}{" "}
                {product.change.pct}%
              </p>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">

          <h2 className="text-sm font-bold text-gray-800 sm:text-base">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-3 grid grid-cols-3 gap-3">

            {/* Minimum */}
            <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
              <p className="text-[10px] text-gray-500 sm:text-xs">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-lg font-bold text-green-600 sm:text-xl">
                ৳{minPrice}
              </p>

              <p className="mt-1 text-[9px] text-gray-400 sm:text-[10px]">
                সবচেয়ে কম বাজারদর
              </p>
            </div>

            {/* Maximum */}
            <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
              <p className="text-[10px] text-gray-500 sm:text-xs">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-1 text-lg font-bold text-red-500 sm:text-xl">
                ৳{maxPrice}
              </p>

              <p className="mt-1 text-[9px] text-gray-400 sm:text-[10px]">
                সবচেয়ে বেশি বাজারদর
              </p>
            </div>

            {/* Average */}
            <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
              <p className="text-[10px] text-gray-500 sm:text-xs">
                গড় দাম
              </p>

              <p className="mt-1 text-lg font-bold text-green-600 sm:text-xl">
                ৳{averagePrice}
              </p>

              <p className="mt-1 text-[9px] text-gray-400 sm:text-[10px]">
                সব বাজারের গড় দাম
              </p>
            </div>

          </div>
        </section>

        {/* Market Price Table */}
        <section className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">

          <div className="p-4 sm:p-5">
            <h2 className="text-sm font-bold text-gray-800 sm:text-base">
              বাজারভিত্তিক আজকের দাম
            </h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-sm">

              <thead>
                <tr className="border-y border-gray-200 bg-[#f8faf8] text-left text-xs text-gray-500">
                  <th className="px-5 py-3 font-medium">
                    বাজার
                  </th>

                  <th className="px-5 py-3 font-medium">
                    বিভাগ
                  </th>

                  <th className="px-5 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>

                  <th className="px-5 py-3 text-right font-medium">
                    সর্বোচ্চ
                  </th>

                  <th className="px-5 py-3 text-right font-medium">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => {
                  const marketAverage = Math.round(
                    (market.min + market.max) / 2
                  );

                  return (
                    <tr
                      key={`${market.market}-${market.division}`}
                      className={`border-b border-gray-200 last:border-b-0 ${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-[#f3f7f4]"
                      }`}
                    >
                      <td className="px-5 py-2.5 font-medium text-gray-700">
                        {market.market}
                      </td>

                      <td className="px-5 py-2.5 text-gray-600">
                        {market.division}
                      </td>

                      <td className="px-5 py-2.5 text-right text-gray-700">
                        ৳{market.min}
                      </td>

                      <td className="px-5 py-2.5 text-right text-gray-700">
                        ৳{market.max}
                      </td>

                      <td className="px-5 py-2.5 text-right font-semibold text-gray-800">
                        ৳{marketAverage}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>

          {/* Mobile Market Cards */}
          <div className="divide-y divide-gray-200 md:hidden">
            {product.markets.map((market) => {
              const marketAverage = Math.round(
                (market.min + market.max) / 2
              );

              return (
                <div
                  key={`${market.market}-${market.division}`}
                  className="p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {market.market}
                      </h3>

                      <p className="mt-0.5 text-xs text-gray-400">
                        {market.division}
                      </p>
                    </div>

                    <p className="font-bold text-green-600">
                      ৳{marketAverage}
                    </p>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">

                    <div className="rounded-lg bg-gray-50 p-2">
                      <p className="text-[9px] text-gray-400">
                        সর্বনিম্ন
                      </p>

                      <p className="mt-1 text-xs font-semibold text-gray-700">
                        ৳{market.min}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-2">
                      <p className="text-[9px] text-gray-400">
                        সর্বোচ্চ
                      </p>

                      <p className="mt-1 text-xs font-semibold text-gray-700">
                        ৳{market.max}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-2">
                      <p className="text-[9px] text-gray-400">
                        গড়
                      </p>

                      <p className="mt-1 text-xs font-semibold text-green-600">
                        ৳{marketAverage}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </section>
      </div>
    </main>
  );
};

export default ProductPage;