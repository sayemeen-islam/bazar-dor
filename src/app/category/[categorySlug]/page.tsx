import CategoryCardList from "@/components/category/CategoryCardList";
import ProductCard from "@/components/home/ProductCard";
import baseUrl from "@/services/baseUrl";
import { IProduct } from "@/types/product";
import { toBanglaNumber } from "@/utils/number";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) => {
  const { categorySlug } = await params;

  const res = await fetch(`${baseUrl}/products?category=${categorySlug}`);

  const data: IProduct[] = await res.json();
  const firstData = data[0];

  return (
    <div className="max-w-6xl mx-auto my-8 mb-30">
      <section className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-8 mb-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex size-20 shrink-0 items-center justify-center text-6xl">
            {firstData.categoryIcon}
          </div>

          <div className="min-w-0 ">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold sm:text-3xl">
                {firstData.categoryNameBn}
              </h1>
            </div>

            <p className="mt-2 text-[0.95rem] text-base-content/70">
              {toBanglaNumber(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </section>
      <CategoryCardList products={data}></CategoryCardList>
    </div>
  );
};

export default CategoryPage;
