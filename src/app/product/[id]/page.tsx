import baseUrl from "@/services/baseUrl";
import { IProduct } from "@/types/product";
import { toBanglaNumber } from "@/utils/number";
import { translateUnit } from "@/utils/translations";
import { FaChevronRight } from "react-icons/fa";

// interface ProductDetailsProps {
//   product: IProduct;
// }

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const res = await fetch(`${baseUrl}/products/${id}`);
  const data: IProduct = await res.json();

  const allMinimumPrices = data?.markets.map((market) => market.min);
  const allMaximumPrices = data?.markets.map((market) => market.max);

  const minPrice = Math.min(...allMinimumPrices);
  const maxPrice = Math.max(...allMaximumPrices);

  const changeText =
    data?.change.dir === "up"
      ? `▲ ${toBanglaNumber(data?.change.pct)}%`
      : data?.change.dir === "down"
        ? `▼ ${String(toBanglaNumber(data?.change.pct)).slice(1)}%`
        : `— ${toBanglaNumber(data.change.pct)}%`;

  const changeColor =
    data?.change.dir === "up"
      ? "text-red-600 "
      : data?.change.dir === "down"
        ? "text-green-700 "
        : "text-base-content/60 ";

  // Average of each market's midpoint.
  const averagePrice = Math.round(
    data?.markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0,
    ) / data?.markets.length,
  );

  return (
    <main className="mx-auto max-w-6xl py-8  lg:py-12">
      <div className="flex gap-2 pb-8  items-center text-sm">
        <FaChevronRight size={10}/>
        <span>{data.categoryNameBn}</span>
        <FaChevronRight size={10}/>
        <span>{data.nameBn}</span>
      </div>
      {/* Product overview */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
            {data.image}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold sm:text-3xl">{data.nameBn}</h1>
            </div>
            <p className=" flex flex-wrap gap-2 text-base-content/70">
              প্রতি {translateUnit(data.unit)} · {data.categoryNameBn}
            </p>
            <p className="mt-2 text-[0.95rem] text-base-content">
              গতকালের তুলনায় আজ দাম{" "}
              <span className="font-bold">
                {data.change.dir === "up" ? "বেড়েছে" : "কমেছে"}
              </span>{" "}
              ·{" "}
              {(data.change.dir === "up" &&
                `${toBanglaNumber(data.today - data.yesterday)}`) ||
                (data.change.dir === "down" &&
                  `${toBanglaNumber(data.yesterday - data.today)}`)}{" "}
              টাকা
            </p>
          </div>

          <div className="rounded-xl bg-base-200 p-4 text-center">
            <p className="text-sm text-base-content/60">আজকের দাম</p>
            <p className=" text-3xl font-bold">{toBanglaNumber(data.today)}</p>
            <p className=" text-sm text-base-content/60">
              টাকা/{translateUnit(data.unit)}
            </p>
            <span className={`${changeColor} text-sm`}>{changeText}</span>
          </div>
        </div>
      </section>

      <div className="rounded-2xl bg-base-100 border border-base-300 pt-4 pb-10 px-8 mt-10">
        {/* Price summary */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl/normal font-bold">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              {
                label: "সর্বনিম্ন দাম",
                price: minPrice,
                color: "text-success",
                market: "সবচেয়ে কম দামের বাজার",
              },
              {
                label: "সর্বোচ্চ দাম",
                price: maxPrice,
                color: "text-error",
                market: "সবচেয়ে বেশি দামের বাজার",
              },
              {
                label: "গড় দাম",
                price: averagePrice,
                color: "text-success",
                market: "প্রতি কেজি-এর হিসাবে",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-base-300 bg-base-100 p-5"
              >
                <p className="text-sm text-base-content">{item.label}</p>

                <p className={`text-2xl font-bold ${item.color}`}>
                  {toBanglaNumber(item.price)}{" "}
                  <span className="text-sm font-medium">টাকা</span>
                </p>

                <p className="mt-1 text-sm text-base-content">{item.market}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Market-wise prices table */}
        <section className="mt-10 ">
          <div className="mb-5 ">
            <h2 className="text-xl/normal font-bold ">
              বাজারভিত্তিক আজকের দাম
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-base-200 bg-base-100">
            <table className="table table-zebra w-full min-w-[650px]">
              <thead>
                <tr className="bg-base-200 text-base-content">
                  <th className="whitespace-nowrap">বাজার</th>
                  <th className="whitespace-nowrap">বিভাগ</th>
                  <th className="whitespace-nowrap text-right">সর্বনিম্ন</th>
                  <th className="whitespace-nowrap text-right">সর্বাধিক</th>
                  <th className="whitespace-nowrap text-right">গড়</th>
                </tr>
              </thead>

              <tbody className="text-[14px]">
                {data.markets.map((market) => {
                  const average = (market.min + market.max) / 2;

                  return (
                    <tr
                      key={`${market.division}-${market.market}`}
                      className="hover:bg-base-200/60"
                    >
                      <td className="whitespace-nowrap font-medium">
                        {market.market}
                      </td>

                      <td className="whitespace-nowrap font-normal text-base-content/70">
                        {market.division}
                      </td>

                      <td className="whitespace-nowrap text-right font-normal ">
                        {toBanglaNumber(market.min)} টাকা
                      </td>

                      <td className="whitespace-nowrap text-right font-normal ">
                        {toBanglaNumber(market.max)} টাকা
                      </td>

                      <td className="whitespace-nowrap text-right font-normal">
                        {toBanglaNumber(average)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};
export default ProductDetailsPage;
