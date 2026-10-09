import baseUrl from '@/services/baseUrl';
import { IProduct } from '@/types/product';
import React from 'react';
import ProductCard from './ProductCard';

const AllProducts = async () => {
  const res = await fetch(`${baseUrl}/products`);
  const data: IProduct[] = await res.json();
  console.log("from all products", data);
  return (
  <div id='সব-পণ্য' className='max-w-6xl mx-auto mb-25'>
    <h2 className='text-2xl font-bold mb-2'>
      সব পণ্য
    </h2>
    <p className='text-md text-base-content/60 mb-5'>মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
      <div className='grid grid-cols-3 gap-4'>
      {
        data.map(product=><ProductCard key={product.id} product={product}></ProductCard>)
      }
    </div>
  </div>
  );
};

export default AllProducts;