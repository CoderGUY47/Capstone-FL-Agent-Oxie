import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-7 flex items-center justify-between">
      {/* Left: Brand Logo & Title */}
      <Link href="/" className="flex items-center gap-3 no-underline group">
        <Image
          src="/images/oxie.png"
          alt="Oxie AI Logo"
          width={48}
          height={48}
          className="w-12 h-12 object-contain"
          priority
        />
      </Link>

      {/* Right: Glass Contact Us Button */}
      <Link
        href="/chat"
        className="flex items-center justify-center px-7 py-2 rounded-full bg-white/10 border-0 backdrop-blur-2xl shadow-md text-sm sm:text-base font-bold text-white no-underline"
      >
        Get Started
      </Link>
    </header>
  );
}
