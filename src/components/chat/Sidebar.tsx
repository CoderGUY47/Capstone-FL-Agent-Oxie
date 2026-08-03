"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiPlus,
  FiLogIn
} from "react-icons/fi";
import { PiUserCircleDuotone } from "react-icons/pi";
import { GrCompare } from "react-icons/gr";
import { MdOutlineMarkChatUnread } from "react-icons/md";
import SearchInput from "./SearchInput";
import ChatList from "./ChatList";
import UpgradeCard from "./UpgradeCard";

interface SidebarProps {
  activeChatId: string;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

export default function Sidebar({ activeChatId, onSelectChat, onNewChat }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`h-full bg-[#0D0705]/95 backdrop-blur-2xl border-r border-white/[0.08] flex flex-col p-3.5 shrink-0 select-none transition-all duration-300 z-20 ${
        isCollapsed ? "w-16 items-center p-2" : "w-[320px]"
      }`}
    >
      {/* ── Top Header: Real Web Logo + Title + Collapse Toggle ── */}
      <div className="flex items-center justify-between pb-3.5 w-full">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 font-extrabold text-lg text-[#FDFBF7] tracking-tight">
            <Image
              src="/images/oxie.png"
              alt="Oxie Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain drop-shadow-[0_0_12px_rgba(255,122,24,0.4)]"
              priority
            />
            <span>Oxie</span>
          </div>
        ) : (
          <Image
            src="/images/oxie.png"
            alt="Oxie Logo"
            width={36}
            height={36}
            className="w-9 h-9 object-contain drop-shadow-[0_0_12px_rgba(255,122,24,0.4)] my-1"
            priority
          />
        )}

        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#A79B94] hover:text-[#FDFBF7] hover:bg-white/[0.06] transition-all cursor-pointer outline-none border border-white/[0.06]"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <GrCompare className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── + New Chat Primary Rounded-Full Button ── */}
      {!isCollapsed ? (
        <button
          type="button"
          onClick={onNewChat}
          className="w-full h-11 mb-3.5 rounded-full bg-gradient-to-r from-[#FF7A18] to-[#FF9B47] text-white font-semibold text-xs flex items-center justify-between px-5 shadow-xl shadow-[#FF7A18]/25 border border-white/20 hover:brightness-110 transition-all cursor-pointer outline-none"
        >
          <div className="flex items-center gap-2">
            <MdOutlineMarkChatUnread className="w-4.5 h-4.5" />
            <span>New Chat</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px] font-mono text-white/90 border border-white/10">
            ⌘ K
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onNewChat}
          className="w-10 h-10 mb-3.5 rounded-full bg-gradient-to-r from-[#FF7A18] to-[#FF9B47] text-white flex items-center justify-center shadow-lg shadow-[#FF7A18]/30 border border-white/20 cursor-pointer outline-none"
          title="New Chat"
        >
          <FiPlus className="w-5 h-5" />
        </button>
      )}

      {/* ── Search Input ── */}
      {!isCollapsed && (
        <div className="mb-3.5">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>
      )}

      {/* ── Chat List ── */}
      {!isCollapsed && (
        <ChatList activeId={activeChatId} onSelect={onSelectChat} searchQuery={searchQuery} />
      )}

      {/* ── Bottom Section: UpgradeCard & User Profile Card ── */}
      <div className="pt-3 border-t border-white/[0.08] mt-auto flex flex-col gap-2.5 w-full">
        {!isCollapsed ? (
          <>
            {/* Upgrade Card (div rounded-md) */}
            <UpgradeCard />

            {/* User Profile Card (div rounded-md with rounded-full login button) */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-md border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <PiUserCircleDuotone className="w-8 h-8 text-[#FDFBF7] shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-semibold text-[#FDFBF7] truncate">
                    New User
                  </span>
                  <span className="text-[11px] text-[#A79B94]">
                    Free plan
                  </span>
                </div>
              </div>

              {/* Login Button (rounded-full) */}
              <Link
                href="/login"
                className="px-3.5 py-1 text-[11.5px] font-semibold bg-[#FF7A18] hover:bg-[#FF9B47] text-white rounded-full border border-white/20 transition-colors no-underline flex items-center gap-1.5 shrink-0 shadow-md shadow-[#FF7A18]/20"
                title="Log in to your account"
              >
                <FiLogIn className="w-3.5 h-3.5" />
                <span>Log in</span>
              </Link>
            </div>
          </>
        ) : (
          <Link
            href="/login"
            title="New User - Log in"
            className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center cursor-pointer transition-colors no-underline text-[#FDFBF7]"
          >
            <PiUserCircleDuotone className="w-7 h-7" />
          </Link>
        )}
      </div>
    </aside>
  );
}
