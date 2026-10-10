export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl animate-pulse py-8 mb-20 lg:py-12">
      {/* Breadcrumb skeleton */}
      <div className="mb-8 flex items-center gap-3">
        <div className="h-3 w-3 rounded bg-base-300" />
        <div className="h-4 w-24 rounded bg-base-300" />
        <div className="h-3 w-3 rounded bg-base-300" />
        <div className="h-4 w-32 rounded bg-base-300" />
      </div>

      {/* Product overview */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="size-20 shrink-0 rounded-2xl bg-base-300" />

          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-7 w-40 rounded bg-base-300" />
            <div className="h-4 w-48 rounded bg-base-200" />
            <div className="h-4 w-64 max-w-full rounded bg-base-200" />
          </div>

          <div className="space-y-3 rounded-xl bg-base-200 p-4">
            <div className="mx-auto h-4 w-20 rounded bg-base-300" />
            <div className="mx-auto h-9 w-28 rounded bg-base-300" />
            <div className="mx-auto h-4 w-24 rounded bg-base-300" />
            <div className="mx-auto h-4 w-16 rounded bg-base-300" />
          </div>
        </div>
      </section>

      {/* Price summary and market table */}
      <div className="mt-10 rounded-2xl border border-base-300 bg-base-100 px-5 pt-4 pb-10 sm:px-8">
        <section className="mt-8">
          <div className="mb-4 h-6 w-44 rounded bg-base-300" />

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="space-y-3 rounded-2xl border border-base-300 p-5"
              >
                <div className="h-4 w-24 rounded bg-base-200" />
                <div className="h-8 w-32 rounded bg-base-300" />
                <div className="h-4 w-36 max-w-full rounded bg-base-200" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 h-6 w-52 rounded bg-base-300" />

          <div className="overflow-hidden rounded-2xl border border-base-200">
            {/* Table header */}
            <div className="grid grid-cols-5 gap-4 bg-base-200 p-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="h-4 rounded bg-base-300" />
              ))}
            </div>

            {/* Table rows */}
            {[1, 2, 3, 4].map((row) => (
              <div
                key={row}
                className="grid grid-cols-5 gap-4 border-t border-base-200 p-4"
              >
                {[1, 2, 3, 4, 5].map((cell) => (
                  <div key={cell} className="h-4 rounded bg-base-200" />
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
