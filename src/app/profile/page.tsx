"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { FiEdit2, FiLogOut } from "react-icons/fi";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      redirect("/signin");
    }
  }, [isPending, user]);

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে!");
    window.location.replace("/signin");
  };

  if (isPending || !user) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-12">
        <div className="animate-pulse space-y-5">
          <div className="h-8 w-48 rounded-lg bg-base-300" />
          <div className="h-64 rounded-2xl bg-base-200" />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:py-14">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">আমার প্রোফাইল</h1>
        <p className="mt-2 text-base-content/60">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <section className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            {/* Profile image or initials placeholder */}
            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary text-2xl font-bold text-primary-content">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={`${user.name || "User"}'s profile picture`}
                  width={64}
                  height={64}
                  className="size-full object-cover"
                  unoptimized
                />
              ) : (
                user.name?.trim().charAt(0).toUpperCase() || "U"
              )}
            </div>

            <div className="min-w-0">
              <h2 className="break-words text-xl font-bold text-base-content">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="mt-1 break-all text-sm text-base-content/60">
                {user.email}
              </p>
            </div>
          </div>

          <Link href="/profile/update" className="btn btn-primary gap-2">
            <FiEdit2 size={18} />
            প্রোফাইল আপডেট
          </Link>
        </div>

        <div className="my-6 border-t border-base-300" />

        <div className="space-y-4">
          <div>
            <p className="text-sm text-base-content/60">নাম</p>
            <p className="mt-1 font-medium text-base-content">
              {user.name || "নাম দেওয়া হয়নি"}
            </p>
          </div>

          <div>
            <p className="text-sm text-base-content/60">ইমেইল</p>
            <p className="mt-1 break-all font-medium text-base-content">
              {user.email}
            </p>
          </div>
        </div>

        <div className="my-6 border-t border-base-300" />

        <button
          type="button"
          onClick={handleSignOut}
          className="btn btn-outline btn-error gap-2"
        >
          <FiLogOut size={18} />
          সাইন আউট
        </button>
      </section>
    </main>
  );
}
