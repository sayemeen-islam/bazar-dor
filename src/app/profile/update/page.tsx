"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

import { FiArrowLeft, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending || !user) {
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-4 py-12">
        <div className="animate-pulse space-y-5">
          <div className="h-8 w-48 rounded-lg bg-base-300" />
          <div className="h-72 rounded-2xl bg-base-200" />
        </div>
      </main>
    );
  }

  const handleUpdateProfile = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUserData = Object.fromEntries(formData.entries()) as {
      image: string;
      name: string;
    };

    try {
      const { error } = await authClient.updateUser({
        ...newUserData,
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      window.location.replace("/profile");
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10 sm:py-14">
      <Link
        href="/profile"
        className="mb-6 inline-flex items-center gap-2 text-sm text-base-content/70 transition hover:text-primary"
      >
        <FiArrowLeft size={18} />
        প্রোফাইলে ফিরে যান
      </Link>

      <section className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-base-content sm:text-3xl">
          প্রোফাইল আপডেট করুন
        </h1>

        <p className="mt-2 text-sm text-base-content/60">
          আপনার অ্যাকাউন্টের তথ্য পরিবর্তন করুন।
        </p>

        {/* Current profile image and account information */}
        <div className="my-7 flex items-center gap-4">
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
            <p className="break-words font-bold text-base-content">
              {user.name || "ব্যবহারকারী"}
            </p>
            <p className="break-all text-sm text-base-content/60">
              {user.email}
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-base-content"
            >
              আপনার নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="আপনার নাম লিখুন"
              className="input input-bordered w-full border border-border"
              maxLength={100}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full gap-2 sm:w-auto"
          >
            <FiSave size={18} />
            আপডেট
          </button>
        </form>
      </section>
    </main>
  );
}
