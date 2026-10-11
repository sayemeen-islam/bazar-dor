
import baseUrl from "@/services/baseUrl";
import { IProduct } from "@/types/product";
import ProductCard from "./ProductCard";

const PriceDown = async () => {
  const res = await fetch(`${baseUrl}/products`);
  const data: IProduct[] = await res.json();

  const priceDownData = data
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct);

  return (
    <section className="mx-auto mb-10 w-full max-w-6xl px-4 sm:mb-12 lg:mb-15">
      {/* Section heading */}
      <div className="mb-4 flex items-center gap-2 sm:mb-5">
        <span className="text-green-700">▼</span>
        <h2 className="text-xl font-bold sm:text-2xl">
          আজ দাম কমেছে
        </h2>
      </div>

      {/* Responsive product grid */}
      <div className="grid grid-cols-1 gap-3 min-[450px]:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {priceDownData.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PriceDown;
