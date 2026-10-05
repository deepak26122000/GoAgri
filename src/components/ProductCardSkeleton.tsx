/**
 * Placeholder card shown in the grid while products are loading. Mirrors the
 * shape of {@link ProductCard} to avoid layout shift when data arrives.
 */
export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm dark:border-green-900/40 dark:bg-zinc-900">
      <div className="aspect-[4/3] w-full animate-pulse bg-green-100 dark:bg-zinc-800" />
      <div className="flex flex-col gap-4 p-5">
        <div className="space-y-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-green-100 dark:bg-zinc-800" />
          <div className="h-6 w-1/3 animate-pulse rounded bg-green-100 dark:bg-zinc-800" />
        </div>
        <div className="h-10 w-full animate-pulse rounded-full bg-green-100 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
