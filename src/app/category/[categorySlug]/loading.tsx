
export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto my-8 mb-30">
      {/* Category header skeleton */}
      <section className="animate-pulse rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-8 mb-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="size-20 shrink-0 rounded-xl bg-base-300" />

          <div className="flex-1 space-y-3">
            <div className="h-8 w-48 rounded-lg bg-base-300" />
            <div className="h-4 w-64 max-w-full rounded-md bg-base-300" />
          </div>
        </div>
      </section>

      {/* Sorting skeleton */}
      <section className="animate-pulse rounded-2xl flex justify-end border border-base-300 bg-base-100 px-8 pt-3 mb-8">
        <div className="mt-2 mb-6 flex items-center gap-2">
          <div className="h-4 w-10 rounded-md bg-base-300" />
          <div className="h-10 w-40 rounded-lg bg-base-300" />
        </div>
      </section>

      {/* Product cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-base-200 bg-base-100 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="size-20 shrink-0 rounded-xl bg-base-200" />

              <div className="min-w-0 flex-1 space-y-3">
                <div className="h-5 w-3/4 rounded-md bg-base-300" />
                <div className="h-4 w-1/2 rounded-md bg-base-200" />
              </div>
            </div>

            <div className="my-4 border-t border-base-200" />

            <div className="flex items-end justify-between gap-2">
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-20 rounded-md bg-base-200" />
                <div className="h-6 w-28 max-w-full rounded-md bg-base-300" />
              </div>

              <div className="h-6 w-16 shrink-0 rounded-full bg-base-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}