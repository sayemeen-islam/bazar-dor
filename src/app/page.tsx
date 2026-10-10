import { Suspense } from "react";
import AllProducts from "@/components/home/AllProducts";
import Banner from "@/components/home/Banner";
import PriceDown from "@/components/home/PriceDown";
import PriceUp from "@/components/home/PriceUp";
import ProductSectionSkeleton from "@/components/home/ProductSectionSkeleton";
import AllProductsSkeleton from "@/components/home/AllProductsSkeleton";

export default function Home() {
  return (
    <div>
      <Banner></Banner>

      <Suspense fallback={<ProductSectionSkeleton />}>
        <PriceUp></PriceUp>
      </Suspense>

      <Suspense fallback={<ProductSectionSkeleton />}>
        <PriceDown></PriceDown>
      </Suspense>

      <Suspense fallback={<AllProductsSkeleton />}>
        <AllProducts></AllProducts>
      </Suspense>
    </div>
  );
}
   