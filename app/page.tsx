 import { Suspense } from "react";
// import Navbar from "./components/Navbar/Navbar";
// import PriceTicker from "@/app/components/PriceTicker/PriceTicker";    
import { getCategories, getProducts } from "@/app/lib/api";
import Navbar from "./components/navbar/navbar";
import PriceTicker from "./components/navbar/priceticker";
import MarketCard from "./components/heroSection/hero";
import PriceIncreaseList from "./components/PriceIncrease/PriceIncreaseList";
import PriceDecreaseList from "./components/PriceDicrease/PriceDecreaseList";
import AllProductList from "./components/AllProducts/AllProductList";

async function MarketHeader() {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <>
       
      <MarketCard />
      <PriceIncreaseList products={products} />
      <PriceDecreaseList products={products} />
      <AllProductList products={products} />  
    </>
  );
}

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MarketHeader />
      </Suspense>

      <main>
        
      </main>
    </>
  );
}