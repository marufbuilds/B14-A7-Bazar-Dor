 
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";

import CategoryProductList from "./CategoryProductList";
import {
  getCategory,
  getProductsByCategory,
} from "@/app/lib/api";
import { auth } from "@/app/lib/auth";
import { toast } from "sonner";

export const instant = false;

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { id } = await params;

 const session = await auth.api.getSession({
  headers: await headers(),
});

if (!session) {
  const redirectTo = `/category/${id}`;
  const message = "Please sign in first to view this category.";

  redirect(
    `/sign-in?redirectTo=${encodeURIComponent(redirectTo)}&message=${encodeURIComponent(message)}`
        
  );
 
}

  let category;
  let products;

  try {
    [category, products] = await Promise.all([
      getCategory(id),
      getProductsByCategory(id),
    ]);
  } catch {
    notFound();
  }

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50/80">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-sm text-gray-500"
        >
          <Link
            href="/"
            className="transition hover:text-green-700"
          >
            Home
          </Link>

          <span aria-hidden="true">/</span>

          <span className="font-medium text-gray-900">
            {category.nameBn}
          </span>
        </nav>

        {/* Category Header */}
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-green-100/60 blur-2xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-4xl">
                {category.icon}
              </div>

              <div>
                <p className="mb-1 text-sm font-medium text-green-700">
                  Explore market prices
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {category.nameBn}
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Compare today&apose;s prices and find the products
                  you need.
                </p>
              </div>
            </div>

            <div className="w-fit rounded-xl bg-green-50 px-5 py-3">
              <p className="text-2xl font-bold text-green-800">
                {products.length}
              </p>

              <p className="text-xs font-medium text-green-700">
                Available products
              </p>
            </div>
          </div>
        </section>

        {/* Product Section */}
        <section>
          {products.length === 0 ? (
            <>
              <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  Products in this category
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Browse products and check their latest listed prices.
                </p>
              </div>

              <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                <div className="mb-4 text-5xl">
                  {category.icon}
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  No products found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  There are no products in this category right now.
                </p>

                <Link
                  href="/"
                  className="mt-5 inline-flex items-center justify-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  Explore other categories
                </Link>
              </div>
            </>
          ) : (
            <CategoryProductList
              products={products}
              isAuthenticated={Boolean(session)}
            />
          )}
        </section>

        {/* Footer Note */}
         
      </div>
    </main>
  );
}