"use client";

import { FiArrowDown } from "react-icons/fi";

interface JumpToLatestProps {
  onClick: () => void;
}

export default function JumpToLatest({ onClick }: JumpToLatestProps) {
  return (
    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20">
      <button
        id="jump-to-latest-btn"
        onClick={onClick}
        aria-label="Jump to latest message"
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6366f1]/80 hover:bg-[#6366f1] border border-white/20 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-colors cursor-pointer outline-none"
      >
        <FiArrowDown className="w-3.5 h-3.5 text-white" />
        <span>Jump to latest</span>
      </button>
    </div>
  );
}
