import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 py-8 max-w-5xl mx-auto my-auto select-none">
      {/* Floating Logo Badge */}
      <Image
        src="/images/oxie.png"
        alt="Oxie Logo"
        width={160}
        height={160}
        className="w-52 h-52 object-contain -mt-8 -mb-2"
        priority
      />

      {/* Hero Title Matching User Reference Image Exactly */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold text-[#faf9f6] tracking-tight leading-[1.05] mb-6 max-w-5xl">
        The fastest way <br />
        to{" "}
        <span className="font-[family-name:var(--font-cursive)] text-white font-normal text-[1.15em] px-1 inline-block align-baseline">
          Build
        </span>{" "}
        and{" "}
        <span className="font-[family-name:var(--font-cursive)] text-white font-normal text-[1.15em] px-1 inline-block align-baseline">
          Grow
        </span> <br />
        your{" "}
        <span className="bg-gradient-to-b from-indigo-300 via-indigo-500 to-indigo-600 bg-clip-text text-transparent font-extrabold">
          product.
        </span>
      </h1>

      {/* Hero Subtitle */}
      <p className="text-slate-300/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-10">
        Oxie AI helps teams turn ideas into polished products faster <br className="hidden sm:inline" />
        using AI-assisted workflows for design, automation, and launch.
      </p>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-5 flex-wrap">
        <Link
          href="/chat"
          className="flex items-center justify-center px-9 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-2xl shadow-lg text-sm sm:text-base font-bold text-white no-underline transition-all hover:scale-105"
        >
          Get Started
        </Link>
        <Link
          href="/chat"
          className="flex items-center justify-center px-9 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 border-none shadow-lg text-sm sm:text-base font-bold text-white no-underline transition-all hover:scale-105"
        >
          Learn More
        </Link>
      </div>
    </main>
  );
}
