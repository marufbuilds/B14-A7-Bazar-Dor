import { Suspense } from "react";
import { getCategories, getProducts } from "@/app/lib/api";
import Navbar from "./navbar";
import PriceTicker from "./priceticker";
// import Footer from "../footer/footer";

async function MarketData() {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <>
      <Navbar categories={categories} />
      <PriceTicker products={products} />
      {/* <Footer /> */}
    </>
  );
}

export default function MarketHeader() {
  return (
    <Suspense fallback={<div className="h-20" />}>
      <MarketData />
    </Suspense>
  );
}