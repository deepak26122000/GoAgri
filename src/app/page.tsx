import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <main className="flex-1 bg-gradient-to-b from-green-50/80 via-white to-white dark:from-green-950/20 dark:via-black dark:to-black">
      <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300">
            🌾 Farm to Table
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            Fresh Agriculture Products
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Sourced directly from local farms — organic, premium quality
            produce delivered fresh to your doorstep.
          </p>
        </div>

        {/* Product listing */}
        <div className="mt-14">
          <ProductGrid />
        </div>
      </section>
    </main>
  );
}
