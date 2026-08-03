"use client";

import Image from "next/image";
import { BiMoon } from "react-icons/bi";

export default function ThinkingIndicator() {
  return (
    <div
      className="flex gap-2.5 w-full max-w-3xl mx-auto items-start my-3"
      aria-label="Oxie is thinking"
      aria-live="polite"
    >
      {/* Oxie Avatar */}
      <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shrink-0 mt-0.5 select-none shadow-md p-1">
        <Image
          src="/images/oxie.png"
          alt="Oxie AI"
          width={20}
          height={20}
          className="w-5 h-5 object-contain"
          priority
        />
      </div>

      {/* Thinking Indigo Glass Card */}
      <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-md bg-white/10 border border-white/15 backdrop-blur-md shadow-lg">
        <BiMoon className="w-3.5 h-3.5 text-[#6366f1] animate-pulse" />
        <span className="text-xs text-white font-medium">
          Oxie is thinking…
        </span>
      </div>
    </div>
  );
}
