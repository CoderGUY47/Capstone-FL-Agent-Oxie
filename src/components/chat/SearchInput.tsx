"use client";

import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search chats..."
        className="w-full h-10 pl-4 pr-10 bg-white/10 hover:bg-white/15 focus:bg-white/15 border border-white/15 text-xs text-white placeholder-slate-400 rounded-full outline-none backdrop-blur-md transition-all duration-200"
      />
      <FiSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6366f1] pointer-events-none" />
    </div>
  );
}
