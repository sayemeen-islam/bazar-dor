import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import baseUrl from "@/services/baseUrl";
import Marquee from "@/components/shared/Marquee";
import Footer from "@/components/shared/Footer";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description:
    "শাকসবজি, চাল, মাছ, মাংস ও অন্যান্য নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজার দর ও সর্বশেষ মূল্য জানুন।",
};

const getCategories = async () => {
  const res = await fetch(`${baseUrl}/categories`);
  const data = await res.json();
  return data;
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const categories = await getCategories();
  return (
    <html
      lang="en"
      data-theme="mytheme"
      className={`${hindSiliguri.className} h-full antialiased bg-base-200 text-base-content`}
    >
      <body className="min-h-full flex flex-col ">
        <Navbar categories = {categories}></Navbar>
        <Marquee></Marquee>
        <main className="min-h-[65vh] ">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
