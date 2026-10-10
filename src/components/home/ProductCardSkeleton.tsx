
export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-base-200 bg-base-100 p-4">
      {/* Product information */}
      <div className="flex items-center gap-3">
        <div className="size-20 shrink-0 rounded-xl bg-base-200" />

        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-5 w-3/4 rounded bg-base-300" />
          <div className="h-4 w-1/2 rounded bg-base-200" />
        </div>
      </div>

      <div className="my-4 border-t border-base-200" />

      {/* Price information */}
      <div className="flex items-end justify-between gap-2">
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-base-200" />
          <div className="h-6 w-24 rounded bg-base-300" />
        </div>

        <div className="h-6 w-16 rounded-full bg-base-200" />
      </div>
    </div>
  );
}

