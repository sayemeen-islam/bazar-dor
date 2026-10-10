import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductSectionSkeleton() {
  return (
    <section className="mx-auto mb-15 max-w-6xl animate-pulse">
      {/* Section heading */}
      <div className="mb-5 flex items-center gap-2">
        <div className="size-5 rounded bg-base-300" />
        <div className="h-7 w-44 rounded bg-base-300" />
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
