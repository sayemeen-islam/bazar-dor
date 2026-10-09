import baseUrl from '@/services/baseUrl';
import { IProduct } from '@/types/product';
import React from 'react';
import ProductCard from './ProductCard';

const PriceDown = async () => {
  const res = await fetch(`${baseUrl}/products`);
  const data: IProduct[] = await res.json();
  console.log("from all products", data);
  const priceUpData = data.filter((d) => d.change.dir === "down");
  const sortedData = priceUpData.sort((a, b) => a.change.pct - b.change.pct);

  return (
    <div className="max-w-6xl mx-auto mb-15">
      <div className="flex items-center gap-2 mb-5 font-bold">
        {" "}
        <span className="text-green-700">▼</span>{" "}
        <h2 className="text-2xl  ">আজ দাম কমেছে</h2>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {sortedData.slice(0,6).map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};


export default PriceDown;