
import baseUrl from "@/services/baseUrl";
import { IProduct } from "@/types/product";
import ProductCard from "./ProductCard";

const PriceUp = async () => {
  const res = await fetch(`${baseUrl}/products`);
  const data: IProduct[] = await res.json();

  const sortedData = data
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct);

  return (
    <section className="mx-auto mb-10 w-full max-w-6xl  px-4 sm:mb-12 md:mb-15">
      {/* Section heading */}
      <div className="mb-4 flex items-center gap-2 sm:mb-5">
        <span className="shrink-0 text-red-600">▲</span>
        <h2 className="text-lg font-bold min-[400px]:text-xl sm:text-2xl">
          আজ দাম বেড়েছে
        </h2>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-3 min-[450px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 ">
        {sortedData.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PriceUp;
