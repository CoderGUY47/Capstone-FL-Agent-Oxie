"use client";

import Link from "next/link";
import { FiMoreVertical, FiChevronDown } from "react-icons/fi";
import { BiCrown } from "react-icons/bi";
import { PiUserCircleDuotone } from "react-icons/pi";
import { HiSparkles } from "react-icons/hi2";

interface TopbarProps {
  title?: string;
}

export default function Topbar({ title = "New conversation" }: TopbarProps) {
  return (
    <header className="h-14 w-full px-5 flex items-center justify-between border-none bg-[#0d0f17]/90 shrink-0 select-none z-10 text-xs">
      {/* Left: Chat Title with Dropdown Arrow */}
      <div className="flex items-center gap-2 text-white font-semibold cursor-pointer group">
        <h1 className="text-xs font-semibold text-white group-hover:text-indigo-400 transition-colors truncate max-w-xs sm:max-w-md">
          {title}
        </h1>
        <FiChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors shrink-0" />
      </div>

      {/* Center: Empty Space */}
      <div className="flex-1" />

      {/* Right: Free plan · Upgrade Pill, AI Assistant Pill, User Profile & Options Menu */}
      <div className="flex items-center gap-2.5">
        {/* Free plan · Upgrade Pill (border-none) */}
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-medium text-white cursor-pointer transition-colors border-none backdrop-blur-md shadow-sm">
          <BiCrown className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-white">Free plan</span>
          <span className="text-slate-400">·</span>
          <span className="text-indigo-400 font-semibold hover:underline">Upgrade</span>
        </div>

        {/* AI Assistant Pill (border-none) */}
        <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border-none backdrop-blur-md text-xs font-medium text-indigo-400 cursor-pointer hover:bg-white/20 transition-colors">
          <HiSparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-white">AI Assistant</span>
        </div>

        {/* User Account Link (border-none) */}
        <Link
          href="/login"
          title="User Account"
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border-none backdrop-blur-md flex items-center justify-center text-white transition-colors no-underline shadow-sm"
        >
          <PiUserCircleDuotone className="w-5.5 h-5.5 text-white" />
        </Link>

        {/* Options Menu Button (border-none) */}
        <button
          type="button"
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 border-none backdrop-blur-md transition-colors outline-none cursor-pointer"
          title="More options"
        >
          <FiMoreVertical className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
