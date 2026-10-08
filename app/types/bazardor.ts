export interface Category {
  id: string;
  nameBn: string;
  icon: string;
}

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
};

export interface CategoryDetails {
  id: string;
  name: string;
  icon: string;
  description?: string;
  products?: Product[];
}

export interface MarketPrice {
  bazar: string;
  price: number;
}

export interface ProductDetails extends Product {
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  marketPrices: MarketPrice[];
}