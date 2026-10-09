"use client";
import { IProduct } from "@/types/product";
import { useState } from "react";
import ProductCard from "../home/ProductCard";
import { Select, Label, ListBox } from "@heroui/react";

const CategoryCardList = ({ products }: { products: IProduct[] }) => {
  const [sortBy, setSortBy] = useState<
    "ডিফল্ট" | "দাম: কম থেকে বেশি" | "দাম: বেশি থেকে কম"
  >("ডিফল্ট");

  const sortProducts = (products: IProduct[]) => {
    const sortedProducts = [...products];
    if (sortBy === "ডিফল্ট") {
      return [...products];
    } else if (sortBy === "দাম: কম থেকে বেশি") {
      sortedProducts.sort((a, b) => a.today - b.today);
    } else {
      sortedProducts.sort((a, b) => b.today - a.today);
    }
    return sortedProducts;
  };

  const sortedProducts = sortProducts(products);
  const sortOptions = [
    { id: "ডিফল্ট", label: "ডিফল্ট" },
    { id: "দাম: কম থেকে বেশি", label: "দাম: কম থেকে বেশি" },
    { id: "দাম: বেশি থেকে কম", label: "দাম: বেশি থেকে কম" },
  ];

  return (
    <div>
      <section className="rounded-2xl flex justify-end  border border-base-300 bg-base-100 px-8 pt-3 mb-8">
        <div className="mt-2 mb-6 flex flex-col gap-1 justify-center sm:flex-row sm:gap-0 sm:items-center ">
          <Select
            className="w-full sm"
            value={sortBy}
            onChange={(value) => {
              if (value) {
                setSortBy(
                  value as "ডিফল্ট" | "দাম: কম থেকে বেশি" | "দাম: বেশি থেকে কম",
                );
              }
            }}
          >
            <div className="flex gap-2">
              <Label>সাজান</Label>

              <Select.Trigger className="rounded-lg border border-base-content/20 bg-base-100  w-[10rem]">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
            </div>

            <Select.Popover className="rounded-lg border border-base-200 bg-base-100">
              <ListBox items={sortOptions} selectionMode="single">
                {(item) => (
                  <ListBox.Item
                    id={item.id}
                    textValue={item.label}
                    className="rounded-md px-3 py-2 data-[selected] data-[selected]"
                  >
                    {item.label}
                  </ListBox.Item>
                )}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default CategoryCardList;
