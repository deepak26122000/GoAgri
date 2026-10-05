"use client";

import { useEffect, useState } from "react";
import { getProducts, type Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

type Status = "loading" | "success" | "error";

const GRID_CLASS =
  "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4";

/**
 * Fetches the product catalogue on mount and renders it in a responsive grid
 * (1 col mobile / 2 cols tablet / 4 cols desktop), handling the loading,
 * error and empty states along the way.
 */
export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  // `reloadKey` re-runs the fetch effect when the user retries.
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const data = await getProducts(controller.signal);
        if (controller.signal.aborted) return;
        setProducts(data);
        setStatus("success");
      } catch (err) {
        if (controller.signal.aborted || (err as Error).name === "AbortError")
          return;
        setError(
          err instanceof Error ? err.message : "Something went wrong.",
        );
        setStatus("error");
      }
    })();

    return () => controller.abort();
  }, [reloadKey]);

  const retry = () => {
    setStatus("loading");
    setError(null);
    setReloadKey((k) => k + 1);
  };

  if (status === "loading") {
    return (
      <div className={GRID_CLASS} aria-busy="true" aria-label="Loading products">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-red-200 bg-red-50/60 px-6 py-16 text-center dark:border-red-900/50 dark:bg-red-950/20">
        <span className="text-4xl" role="img" aria-label="warning">
          ⚠️
        </span>
        <div>
          <p className="text-lg font-semibold text-red-700 dark:text-red-400">
            Couldn&apos;t load products
          </p>
          <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/70">
            {error}
          </p>
        </div>
        <button
          type="button"
          onClick={retry}
          className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-green-200 bg-green-50/60 px-6 py-16 text-center dark:border-green-900/50 dark:bg-green-950/20">
        <span className="text-4xl" role="img" aria-label="seedling">
          🌱
        </span>
        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          No products available yet
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Check back soon — fresh produce is on its way.
        </p>
      </div>
    );
  }

  const handleBuy = (product: Product) => {
    // Placeholder for future cart functionality.
    console.log("Buy Now clicked:", product);
  };

  return (
    <div className={GRID_CLASS}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onBuy={handleBuy}
        />
      ))}
    </div>
  );
}
