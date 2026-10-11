"use client";

import { Avatar } from "@heroui/react";
import logo from "@/assets/logo-icon.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserInfo from "./UserInfo";

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
    <header className="sticky top-0 z-50 w-full bg-base-100">
      {/* Logo, title, date and user */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between  gap-2 py-2 sm:py-3">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-2 min-[400px]:gap-3">
          <Link href="/" className="shrink-0">
            <Avatar className="h-10 w-10 shrink-0 rounded-lg bg-accent sm:h-12 sm:w-12">
              <Avatar.Image
                alt="Bazar Dor Logo"
                src={logo.src}
                className="mx-auto mt-3 h-1/2 w-1/2 object-contain"
              />
            </Avatar>
          </Link>

          <div className="min-w-0 leading-tight">
            <Link href="/">
              <h2 className="text-base font-bold text-base-content min-[400px]:text-lg">
                বাজার দর
              </h2>
            </Link>

            <p className="mt-1 text-[10px] text-base-content/60 min-[400px]:text-xs">
              {date}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>

      {/* Categories */}
      <nav className="border-y border-base-200">
        <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto py-3 sm:gap-6">
          <div className="scrollbar-hide flex items-center gap-1.5  whitespace-nowrap py-2 min-[400px]:gap-2 sm:gap-4 lg:gap-6">
            {categories.map((category) => {
              const isActive = pathname === `/category/${category.slug}`;

              return (
                <Link
                  href={`/category/${category.slug}`}
                  key={category.id}
                  aria-current={isActive ? "page" : undefined}
                  className={`btn btn-sm h-8 min-h-8 shrink-0 rounded-lg px-2 text-xs min-[400px]:px-3 min-[400px]:text-sm ${
                    isActive ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.nameBn}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
