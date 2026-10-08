 
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/bazar-hero.png";

const MarketCard = () => {
  return (
    <Link
      href="/market"
      className="group relative block overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-white via-green-50/40 to-emerald-50/70 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-green-200 hover:shadow-2xl hover:shadow-green-900/10"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none mb-5 absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-200/30 blur-3xl transition-transform duration-700 group-hover:scale-125" />

      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-emerald-200/20 blur-3xl" />

      {/* Content */}
      <div className="relative flex min-h-[260px] flex-col justify-between gap-8 px-6 py-7 sm:px-8 sm:py-8 md:min-h-[280px] md:flex-row md:items-center lg:px-10">
        {/* Left Content */}
        <div className="max-w-2xl">
          {/* Date Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200/70 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-green-700 shadow-sm backdrop-blur-sm sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
            Saturday, October 10, 2026
          </div>

          {/* Heading */}
          <h2 className="max-w-xl text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Today&apos;s Market Prices{" "}
            <span className="text-green-600">at a Glance</span>
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
            Check the latest prices of rice, lentils, oil, vegetables, fish,
            meat, eggs, and fruits — all in one simple place.
          </p>

          {/* CTA */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition-all duration-300 group-hover:bg-green-700 group-hover:shadow-green-600/30">
            View All Prices

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative mx-auto flex w-full justify-center md:mx-0 md:w-auto md:justify-end">
          {/* Image Glow */}
          <div className="absolute inset-0 rounded-full bg-green-300/20 blur-2xl transition-all duration-500 group-hover:bg-green-300/30" />

          <Image
            src={logo}
            alt="Market illustration"
            width={190}
            height={190}
            priority
            className="relative w-36 object-contain transition-transform duration-500 group-hover:scale-110 sm:w-40 md:w-44 lg:w-48"
          />
        </div>
      </div>
    </Link>
  );
};

export default MarketCard;
 

 