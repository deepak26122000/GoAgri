"use client";

import Image from "next/image";
import { useState } from "react";
import { formatPrice, type Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  /** Stagger index used to offset the fade-in animation. */
  index?: number;
  onBuy: (product: Product) => void;
}

/**
 * A single product card: image, name, price and a Buy Now button.
 *
 * The image lazy-loads (default for remote `next/image`) and shows a soft
 * shimmer placeholder until it finishes decoding.
 */
export default function ProductCard({
  product,
  index = 0,
  onBuy,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      className="animate-fade-in group flex flex-col overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-green-900/10 dark:border-green-900/40 dark:bg-zinc-900"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Fixed 4:3 aspect ratio image with loading placeholder */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-green-50 dark:bg-zinc-800">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-green-100 to-green-50 dark:from-zinc-800 dark:to-zinc-700" />
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onLoad={() => setImageLoaded(true)}
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {product.name}
          </h3>
          <p className="mt-1 text-xl font-bold text-green-700 dark:text-green-400">
            {formatPrice(product.price)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onBuy(product)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-700 hover:shadow-md hover:shadow-green-600/30 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          Buy Now
        </button>
      </div>
    </article>
  );
}
