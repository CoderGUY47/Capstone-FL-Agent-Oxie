import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function Hero() {
  return (
    <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-0 py-4 w-[80%] mx-auto my-auto">
      {/* Floating Intelligence Glass Badge */}
        <Image
          src="/images/oxie.png"
          alt="Oxie Text"
          width={180}
          height={180}
          className="w-72 h-72 object-contain -mt-6"
        />

      {/* Hero Title */}
      <h1 className="max-w-5xl text-6xl sm:text-7xl md:text-8xl font-bold text-white tracking-tight leading-[1.02] mb-4">
        The fastest way to Build and Grow your product.
      </h1>

      {/* Hero Subtitle */}
      <p className="text-white text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-medium leading-relaxed mb-10">
        Oxie AI helps teams turn ideas into polished products faster using
        AI-assisted workflows for design, automation, and launch.
      </p>

      {/* Glassmorphism Action Buttons */}
      <div className="flex items-center justify-center gap-5 flex-wrap">
      <Link
        href="/chat"
        className="flex items-center justify-center px-9 py-3.5 rounded-full bg-white/10 border-0 backdrop-blur-5xl shadow-md text-sm sm:text-base font-bold text-white no-underline"
      >
        Get Started
      </Link>
      <Link
        href="/chat"
        className="flex items-center justify-center px-9 py-3.5 rounded-full bg-indigo-600 border-0 backdrop-blur-5xl shadow-md text-sm sm:text-base font-bold text-white no-underline"
      >
        Learn More
      </Link>
      </div>
    </main>
  );
}
