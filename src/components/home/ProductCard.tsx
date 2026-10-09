import { IProduct } from "@/types/product";
import { toBanglaNumber } from "@/utils/number";
import { translateUnit } from "@/utils/translations";
import Link from "next/link";



export default function ProductCard({ product }: {product:IProduct}) {
  const { id, nameBn, image, unit, today, change } = product;

  const changeText =
    change.dir === "up"
      ? `▲ ${toBanglaNumber(change.pct)}%`
      : change.dir === "down"
        ? `▼ ${String(toBanglaNumber(change.pct)).slice(1)}%`
        : `— ${toBanglaNumber(change.pct)}%`;

  const changeColor =
    change.dir === "up"
      ? "text-red-600 bg-red-100"
      : change.dir === "down"
        ? "text-green-700 bg-green-100"
        : "text-base-content/60 bg-base-200";

  return (
    <Link
      href={`/product/${id}`}
      className="group block rounded-2xl border border-base-200 bg-base-100 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"

    >
      {/* Product information */}
      <div className="flex items-center gap-3">
        {/* Product emoji */}
        <div
          className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-base-200 transition-colors group-hover:bg-primary/10"

        >
          <span className="text-4xl" role="img" aria-label={nameBn}>
            {image}
          </span>
        </div>

        {/* Name and unit */}
        <div className="min-w-0 flex-1">
          <h3
            className="line-clamp-2 text-base font-bold leading-snug text-base-content transition-colors group-hover:text-primary"

          >
            {nameBn}
          </h3>

          <p className="mt-2 text-sm text-base-content/60">
            প্রতি {translateUnit(unit)}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-base-200" />

      {/* Price section */}
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm text-base-content/60">আজকের দাম</p>

          <p className="mt-1 text-xl font-bold tracking-tight text-base-content">
            {toBanglaNumber(today)}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold
                      ${changeColor}`}
        >
          {changeText}
        </span>
      </div>
    </Link>
  );
}
