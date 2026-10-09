import AllProducts from "@/components/home/AllProducts";
import Banner from "@/components/home/Banner";
import PriceDown from "@/components/home/PriceDown";
import PriceUp from "@/components/home/PriceUp";
import Image from "next/image";

export default function Home() {
  return (
  <div className=" ">
    <Banner></Banner>
    <PriceUp></PriceUp>
    <PriceDown></PriceDown>
    <AllProducts></AllProducts>
  </div>
  );
}
