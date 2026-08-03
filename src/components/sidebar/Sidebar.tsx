"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiPlus,
  FiSearch,
  FiLogIn
} from "react-icons/fi";
import { LuFolderOpen } from "react-icons/lu";
import { TbAdjustmentsDown } from "react-icons/tb";
import { PiCompassToolBold } from "react-icons/pi";
import { FaLaptopCode } from "react-icons/fa";
import { MdOutlineDraw, MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { BiGhost, BiCrown } from "react-icons/bi";
import { GrCompare } from "react-icons/gr";
import { VscRepoPinned } from "react-icons/vsc";
import ConversationItem, { Conversation } from "./ConversationItem";
import SearchInput from "@/components/chat/SearchInput";
import { cn } from "@/lib/utils";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  onClearAll: () => void;
  onTogglePin?: (id: string) => void;
}

export default function Sidebar({
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  onClearAll,
  onTogglePin,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [activeNav, setActiveNav] = useState("chats");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const q = searchQuery.toLowerCase();
    return conversations.filter((c) => c.title.toLowerCase().includes(q));
  }, [conversations, searchQuery]);

  const { starred, recents } = useMemo(() => {
    const starred: Conversation[] = [];
    const recents: Conversation[] = [];

    filteredConversations.forEach((c) => {
      if (c.pinned) {
        starred.push(c);
      } else {
        recents.push(c);
      }
    });

    return { starred, recents };
  }, [filteredConversations]);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={cn(
        "h-full bg-[#0d0f17] border-r border-white/10 flex flex-col p-3.5 shrink-0 select-none z-20 transition-all duration-300 shadow-2xl",
        isCollapsed ? "w-16 items-center" : "w-76 sm:w-80"
      )}
    >
      {/* ── Top Header: Logo + Search + Compare Toggle ── */}
      <div className={cn("flex items-center justify-between pb-3 px-1 w-full", isCollapsed && "flex-col gap-3 px-0")}>
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 font-extrabold text-lg text-white">
            <Image src="/images/oxie.png" alt="Oxie Logo" width={34} height={34} className="w-8.5 h-8.5 object-contain" priority />
            <span className="text-white text-base tracking-tight font-extrabold">Oxie</span>
          </div>
        ) : (
          <Image src="/images/oxie.png" alt="Oxie Logo" width={34} height={34} className="w-8.5 h-8.5 object-contain my-1 shrink-0" priority />
        )}

        <div className={cn("flex items-center gap-1.5", isCollapsed && "flex-col gap-1.5")}>
          {!isCollapsed && (
            <button
              type="button"
              className="p-1.5 rounded-md flex items-center justify-center text-indigo-400 hover:text-white bg-white/5 hover:bg-white/10 border-none transition-transform hover:scale-110 cursor-pointer outline-none"
              title="Search chats"
              onClick={() => setShowSearchInput((v) => !v)}
            >
              <FiSearch className="w-4.5 h-4.5 text-indigo-400" />
            </button>
          )}

          <button
            type="button"
            onClick={toggleSidebar}
            className="p-1.5 rounded-md flex items-center justify-center text-indigo-400 hover:text-white bg-white/5 hover:bg-white/10 border-none transition-transform hover:scale-110 cursor-pointer outline-none"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <GrCompare className="w-4.5 h-4.5 text-indigo-400" />
          </button>
        </div>
      </div>

      {/* Optional Search Input Field */}
      {!isCollapsed && showSearchInput && (
        <div className="px-1 pb-2 w-full">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>
      )}

      {/* ── Main Navigation List (Vibrant Indigo Glass CTA + Glassmorphic Items) ── */}
      <div className={cn("flex flex-col space-y-2 mb-1 w-full", isCollapsed && "items-center")}>
        {/* Vibrant Indigo Glass + New Chat Button */}
        <button
          type="button"
          onClick={onNewChat}
          title="New chat"
          className={cn(
            "bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-md border-none transition-all cursor-pointer outline-none mb-2 flex items-center justify-center gap-2",
            isCollapsed ? "w-10 h-10 p-0" : "w-full h-9.5 px-4 text-xs"
          )}
        >
          <FiPlus className="w-4.5 h-4.5 text-white" />
          {!isCollapsed && <span className="text-xs font-bold text-white tracking-wide">New chat</span>}
        </button>

        {/* Navigation Items with Indigo Highlights */}
        {[
          { id: "chats", label: "Chats", icon: MdOutlineMarkUnreadChatAlt },
          { id: "projects", label: "Projects", icon: LuFolderOpen },
          { id: "artifacts", label: "Artifacts", icon: PiCompassToolBold },
        ].map((nav) => {
          const Icon = nav.icon;
          const isActive = activeNav === nav.id;
          return (
            <button
              key={nav.id}
              type="button"
              onClick={() => setActiveNav(nav.id)}
              title={isCollapsed ? nav.label : undefined}
              className={cn(
                "rounded-md text-xs flex items-center transition-all cursor-pointer border-none shrink-0 group",
                isCollapsed
                  ? "w-10 h-10 justify-center p-0"
                  : "w-full h-9 px-4 gap-3 text-left",
                isActive
                  ? "bg-indigo-500/30 text-white font-bold"
                  : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-medium"
              )}
            >
              <Icon className={cn("w-4.5 h-4.5 transition-transform duration-200 group-hover:scale-110", isActive ? "text-indigo-400" : "text-white/60 group-hover:text-indigo-300")} />
              {!isCollapsed && (
                <span className={cn("text-xs transition-colors", isActive ? "text-indigo-400 font-bold" : "text-white/60 group-hover:text-white")}>
                  {nav.label}
                </span>
              )}
            </button>
          );
        })}

        {/* Code Item with Upgrade Pill */}
        <button
          type="button"
          onClick={() => setActiveNav("code")}
          title={isCollapsed ? "Code" : undefined}
          className={cn(
            "rounded-md text-xs flex items-center transition-all cursor-pointer border-none shrink-0 group",
            isCollapsed
              ? "w-10 h-10 justify-center p-0"
              : "w-full h-9 px-4 justify-between",
            activeNav === "code"
              ? "bg-indigo-500/30 text-white font-bold"
              : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-medium"
          )}
        >
          <div className="flex items-center gap-3">
            <FaLaptopCode className={cn("w-4.5 h-4.5 transition-transform duration-200 group-hover:scale-110", activeNav === "code" ? "text-indigo-400" : "text-white/60 group-hover:text-indigo-300")} />
            {!isCollapsed && (
              <span className={cn("text-xs transition-colors", activeNav === "code" ? "text-indigo-400 font-bold" : "text-white/60 group-hover:text-white")}>
                Code
              </span>
            )}
          </div>
          {!isCollapsed && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-600/20 border-none text-indigo-400 flex items-center gap-1">
              <BiCrown className="w-3.5 h-3.5 text-indigo-400" />
              Upgrade
            </span>
          )}
        </button>

        {/* Customize Item */}
        <button
          type="button"
          onClick={() => setActiveNav("customize")}
          title={isCollapsed ? "Customize" : undefined}
          className={cn(
            "rounded-md text-xs flex items-center transition-all cursor-pointer border-none shrink-0 group",
            isCollapsed
              ? "w-10 h-10 justify-center p-0"
              : "w-full h-9 px-4 gap-3 text-left",
            activeNav === "customize"
              ? "bg-indigo-500/30 text-white font-bold"
              : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-medium"
          )}
        >
          <BiGhost className={cn("w-4.5 h-4.5 transition-transform duration-200 group-hover:scale-110", activeNav === "customize" ? "text-indigo-400" : "text-white/60 group-hover:text-indigo-300")} />
          {!isCollapsed && (
            <span className={cn("text-xs transition-colors", activeNav === "customize" ? "text-indigo-400 font-bold" : "text-white/60 group-hover:text-white")}>
              Customize
            </span>
          )}
        </button>
      </div>

      {/* ── Products Section ── */}
      {!isCollapsed && (
        <div className="px-4 py-1 text-[10.5px] font-extrabold text-indigo-400 uppercase tracking-wider w-full">
          Products
        </div>
      )}
      <div className={cn("flex flex-col gap-2 mb-2 w-full", isCollapsed && "items-center")}>
        <button
          type="button"
          title={isCollapsed ? "Design Studio" : undefined}
          className={cn(
            "rounded-md text-xs font-medium text-white/60 bg-white/5 hover:bg-white/10 border-none flex items-center transition-all appearance-none outline-none shrink-0 group",
            isCollapsed
              ? "w-10 h-10 justify-center p-0"
              : "w-full h-9 px-4 gap-3 text-left"
          )}
        >
          <MdOutlineDraw className="w-4.5 h-4.5 text-indigo-400 group-hover:text-white transition-transform duration-200 group-hover:scale-110" />
          {!isCollapsed && <span className="text-xs">Design Studio</span>}
        </button>
      </div>

      {/* ── Starred Pinned Section ── */}
      {!isCollapsed && (
        <div className="flex items-center gap-1.5 px-4 py-1 text-[10.5px] font-extrabold text-indigo-400 uppercase tracking-wider w-full">
          <VscRepoPinned className="w-4 h-4 text-indigo-400" />
          <span>All Pinned Chats</span>
        </div>
      )}
      <div className={cn("flex flex-col gap-0.5 overflow-y-auto max-h-28 pr-1 mb-2 w-full", isCollapsed && "items-center pr-0")}>
        {starred.length === 0 ? (
          !isCollapsed && (
            <p className="text-[11px] text-white/50 px-4 py-0.5 italic">
              No starred chats
            </p>
          )
        ) : (
          starred.map((c) => (
            <ConversationItem
              key={c.id}
              id={c.id}
              title={c.title}
              isActive={c.id === activeConversationId}
              isPinned={c.pinned}
              isCollapsed={isCollapsed}
              onSelect={onSelectConversation}
              onDelete={onDeleteConversation}
              onRename={onRenameConversation}
              onTogglePin={onTogglePin}
            />
          ))
        )}
      </div>

      {/* ── Recents Section Header ── */}
      {!isCollapsed && (
        <div className="flex items-center justify-between px-4 py-1 text-[10.5px] font-extrabold text-indigo-400 uppercase tracking-wider w-full">
          <span>Recents</span>
          {conversations.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              title="Clear all recents"
              className="text-white/60 hover:text-white border-none bg-transparent cursor-pointer p-0.5 outline-none transition-transform hover:scale-110"
            >
              <TbAdjustmentsDown className="w-4 h-4 text-indigo-400 hover:text-white" />
            </button>
          )}
        </div>
      )}

      {/* Recents Conversations List */}
      <div className={cn("flex-1 overflow-y-auto flex flex-col gap-0.5 pr-1 w-full", isCollapsed && "items-center pr-0")}>
        {recents.length === 0 ? (
          !isCollapsed && (
            <p className="text-[11px] text-white/50 px-4 py-0.5 italic">
              No recent conversations
            </p>
          )
        ) : (
          recents.map((c) => (
            <ConversationItem
              key={c.id}
              id={c.id}
              title={c.title}
              isActive={c.id === activeConversationId}
              isPinned={c.pinned}
              isCollapsed={isCollapsed}
              onSelect={onSelectConversation}
              onDelete={onDeleteConversation}
              onRename={onRenameConversation}
              onTogglePin={onTogglePin}
            />
          ))
        )}
      </div>

      {/* ── Bottom User Profile Card ── */}
      <div className={cn("pt-2 mt-auto flex flex-col gap-2 w-full", isCollapsed && "items-center")}>
        {!isCollapsed ? (
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl border-none bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-md bg-indigo-600/30 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0 border-none">
                N
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-semibold text-white truncate">
                  New User
                </span>
                <span className="text-[11px] text-white/60">
                  Free plan
                </span>
              </div>
            </div>

            <Link
              href="/login"
              className="px-3.5 py-1.5 text-[11.5px] font-bold bg-indigo-600/80 hover:bg-indigo-500 text-white rounded-md transition-colors no-underline flex items-center gap-1 shrink-0 shadow-md border-none"
              title="Log in to your account"
            >
              <FiLogIn className="w-3.5 h-3.5 text-white" />
              <span className="text-white font-bold">Log in</span>
            </Link>
          </div>
        ) : (
          <Link
            href="/login"
            title="New User - Log in"
            className="w-9 h-9 rounded-md border-none bg-indigo-600/30 flex items-center justify-center cursor-pointer transition-colors no-underline text-indigo-300 font-bold text-xs"
          >
            N
          </Link>
        )}
      </div>
    </aside>
  );
}
