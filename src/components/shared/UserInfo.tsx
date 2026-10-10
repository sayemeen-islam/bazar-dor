import { authClient, } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { LuUserRound } from "react-icons/lu";
import {Skeleton} from "@heroui/react";
import { DiVim } from "react-icons/di";

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();
  console.log({ session, isPending });

  
if (isPending) {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-11 w-11 shrink-0 rounded-lg" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-20 rounded-md" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
    </div>
  );
}

  const user = session?.user;
  console.log(user, "userinfo");
  const handleSignOut = async () => {
  const { error } = await authClient.signOut();

  if (error) {
    toast.error("লগআউট করা যায়নি।");
    return;
  }

  await authClient.getSession();

  toast.success("সফলভাবে লগআউট হয়েছে।");
};
  return (
    <div>
      {user ? (
        <div className="relative flex items-center ">
             <Link href={'/profile'} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-lg font-bold text-primary">
                {user?.name
                  ?.trim()
                  .split(/\s+/)
                  .map((part) => part.charAt(0).toUpperCase())
                  .slice(0, 2)
                  .join("")}
              </Link>
          <div className="dropdown dropdown-end">
            {/* Dropdown trigger */}
            <div
              tabIndex={0}
              role="button"
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition"
            >
           
              <span className="text-lg font-semibold text-base-content">
                {user?.name?.split(" ")[0]}
              </span>

              <IoIosArrowDown size={15} className="text-base-content/60" />
            </div>

            {/* Dropdown menu */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content z-50 mt-3 max-w-64 rounded-xl border border-base-300 bg-base-100 p-2 text-base-content shadow-lg"
            >
              {/* Account information */}
              <li className="pointer-events-none mb-2">
                <div className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-transparent">
                  {/* Square avatar */}

                  {/* Name and email */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-base-content">
                      {user?.name}
                    </p>

                    <p className="truncate text-xs opacity-60">{user?.email}</p>
                  </div>
                </div>
              </li>

              {/* Divider */}
              <li className="pointer-events-none my-1 border-t border-base-300" />

              {/* Profile */}
              <li>
                <Link
                  href="/profile"
                  className="gap-3 rounded-lg py-2.5 hover:bg-base-200 hover:text-primary"
                >
                  <LuUserRound size={17} />
                  <span>Profile</span>
                </Link>
              </li>

              {/* Logout */}
              <li>
                <button
                 
                  onClick={handleSignOut}
                  className="gap-3 rounded-lg py-2.5 text-error hover:bg-error/10 hover:text-error"
                >
                  <BiLogOut size={17} />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default UserInfo;



//  Duplicate collection slot "combo-box.inputGroup". Use a unique, namespaced name (e.g. "tabs.listContainer", "menu.popover").