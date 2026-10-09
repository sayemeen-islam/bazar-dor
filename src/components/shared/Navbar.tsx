"use client";
import { Avatar } from "@heroui/react";
import logo from "@/assets/logo-icon.png";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface INavbarProps {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}
const Navbar = ({ categories }: { categories: INavbarProps[] }) => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
   const pathname = usePathname();
  return (
    <div className="bg-base-100">
      
        <div className="flex justify-between items-center max-w-6xl mx-auto  py-3 ">
          {/* Left */}
          <div className="flex items-center gap-3">
         <Link href={'/'}>   <Avatar className="w-12 h-12 rounded-lg bg-accent ">
              <Avatar.Image
                alt="Bazar Dor Logo"
                src={logo.src}
                className="w-1/2 h-1/2 object-contain mx-auto  mt-3"
              />
            </Avatar></Link>

            <div className="leading-tight"><Link href={'/'}>  
              <h2 className="text-lg font-bold text-base-content">বাজার দর</h2></Link>

              <p className="text-xs text-base-content/60 mt-1">{date}</p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/signin">
              <button className="btn btn-sm btn-ghost text-sm font-medium">
                সাইন ইন
              </button>
            </Link>

            <Link href="/signup">
              <button className="btn btn-primary btn-sm px-4 text-sm font-medium">
                সাইন আপ
              </button>
            </Link>
          </div>
        </div>
    

      {/* categories */}
      <div className="border border-base-200 ">
        <div className="max-w-6xl mx-auto  py-2 flex gap-8 pl-2">
          {categories.map((category) => (
          <Link  href={`/category/${category.slug}`}  key={category.id} className={`flex items-center gap-1 ${pathname === `/category/${category.slug}` ? 'btn btn-primary btn-sm rounded-lg': 'btn btn-ghost btn-sm rounded-lg'}`} >
              <span >{category.icon}</span>
              <p >{category.nameBn}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
