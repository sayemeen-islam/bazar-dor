"use client";

interface ErrorProps {
error: Error & { digest?: string };
reset: () => void;
}

export default function GlobalError({
error,
reset,
}: ErrorProps) {
return ( <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center"> <h2 className="text-2xl font-bold">
কিছু একটা সমস্যা হয়েছে! </h2>


  <p className="max-w-md text-base-content/70">
    দুঃখিত, পেজটি লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
  </p>

  <button
    onClick={reset}
    className="btn btn-primary"
  >
    আবার চেষ্টা করুন
  </button>
</div>


);
}
