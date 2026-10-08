 import type {
  Category,
  Product,
  CategoryDetails,
  ProductDetails,
} from "../types/bazardor";

const BASE_URL =
  "https://api.api-store.workers.dev/api/bazardor";

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

// Get products by category
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const response = await fetch(
    `${BASE_URL}/products?category=${category}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products by category");
  }

  return response.json();
}

// Get category details
export async function getCategory(
  slug: string
): Promise<CategoryDetails> {
  const response = await fetch(`${BASE_URL}/categories/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  return response.json();
}

// Get single product details
export async function getProduct(
  id: string
): Promise<ProductDetails> {
  const response = await fetch(
    `${BASE_URL}/products/${id}`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}