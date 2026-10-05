/**
 * Product domain types and the API client.
 *
 * Keeping the data contract and the fetching logic here means UI components
 * never talk to the network directly — they import `getProducts()` and render
 * whatever it returns.
 */

export interface Product {
  id: number;
  name: string;
  /** Price in Indian Rupees (whole number, e.g. 1200 -> ₹1,200). */
  price: number;
  image: string;
}

/** The dummy catalogue served by `GET /api/products`. */
export const PRODUCTS: Product[] = [
  // {
  //   id: 1,
  //   name: "Organic Rice",
  //   price: 1200,
  //   image:
  //     "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
  // },
  {
    id: 2,
    name: "Fresh Deepak",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Premium Wheat",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d3c2e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Golden Corn",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Farm Fresh Potatoes",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Green Apples",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Organic Carrots",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Pure Honey",
    price: 550,
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
  },
];

/**
 * Fetch the product catalogue from the backend endpoint.
 *
 * Uses the native `fetch` API with async/await. Throws on a non-OK response so
 * callers can surface an error state.
 */
export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch("/api/products", { signal });

  if (!res.ok) {
    throw new Error(`Failed to load products (status ${res.status})`);
  }

  return (await res.json()) as Product[];
}

/** Format a rupee amount as e.g. `₹1,200`. */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
