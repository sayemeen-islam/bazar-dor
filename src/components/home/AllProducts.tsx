import baseUrl from "@/services/baseUrl";
import { IProduct } from "@/types/product";
import { toBanglaNumber } from "@/utils/number";
import ProductCard from "./ProductCard";

const AllProducts = async () => {
  const res = await fetch(`${baseUrl}/products`);
  const data: IProduct[] = await res.json();

  return (
    <section
  id="সব-পণ্য"
  className="mx-auto mb-10 w-full max-w-6xl px-4 sm:mb-12 lg:mb-15"
>
      <h2 className="mb-2 text-xl font-bold sm:text-2xl">সব পণ্য</h2>

      <p className="mb-4 text-sm text-base-content/60 sm:mb-5 sm:text-base">
        মোট {toBanglaNumber(data.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-3 min-[450px]:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
