
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
      
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-5xl">
          🛒
        </div>

       
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-green-700">
          Error 404
        </p>

      
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

    
        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-500">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
          পেজটি সরানো হয়েছে অথবা ঠিকানাটি ভুল হতে পারে।
        </p>

         
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">←</span>
          হোম পেজে ফিরে যান
        </Link>

        
        <p className="mt-6 text-xs text-gray-400">
          BazarDor — আপনার নিত্যপণ্যের বাজারদর
        </p>
      </div>
    </main>
  );
}

