import ProductCardSkeleton from "./ProductCardSkeleton";

export default function AllProductsSkeleton() {
  return (
    <section id="সব-পণ্য" className="mx-auto mb-25 max-w-6xl animate-pulse">
      <div className="mb-2 h-7 w-32 rounded bg-base-300" />
      <div className="mb-5 h-4 w-48 rounded bg-base-200" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
