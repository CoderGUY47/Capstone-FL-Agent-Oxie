"use client";

import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export interface ChatItem {
  id: string;
  title: string;
  time: string;
  section: "Today" | "Yesterday" | "This week";
}

interface ChatListProps {
  activeId: string;
  onSelect: (id: string) => void;
  searchQuery?: string;
}

const DEFAULT_CHATS: ChatItem[] = [
  { id: "1", title: "Python chatbot tutorial", time: "10:24 AM", section: "Today" },
  { id: "2", title: "AI in healthcare", time: "09:15 AM", section: "Today" },
  { id: "3", title: "React server components", time: "08:42 AM", section: "Today" },
  { id: "4", title: "Explain JWT auth", time: "Yesterday", section: "Today" },

  { id: "5", title: "Next.js middleware", time: "Yesterday", section: "Yesterday" },
  { id: "6", title: "OpenAI function calling", time: "Yesterday", section: "Yesterday" },
  { id: "7", title: "Tailwind animations", time: "Yesterday", section: "Yesterday" },

  { id: "8", title: "Design system ideas", time: "Tue", section: "This week" },
  { id: "9", title: "PostgreSQL indexing", time: "Mon", section: "This week" },
];

export default function ChatList({ activeId, onSelect, searchQuery = "" }: ChatListProps) {
  const filteredChats = DEFAULT_CHATS.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sections: ("Today" | "Yesterday" | "This week")[] = ["Today", "Yesterday", "This week"];

  return (
    <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
      {sections.map((section) => {
        const items = filteredChats.filter((c) => c.section === section);
        if (items.length === 0) return null;

        return (
          <div key={section} className="flex flex-col gap-1.5">
            <h4 className="text-[11px] font-semibold text-[#FF7A18]/80 uppercase tracking-wider px-3">
              {section}
            </h4>

            <div className="flex flex-col gap-0.5">
              {items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 2, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="button"
                    onClick={() => onSelect(item.id)}
                    className={`w-full h-9 px-3.5 rounded-full flex items-center justify-between text-xs transition-all duration-150 cursor-pointer outline-none ${
                      isActive
                        ? "bg-[#211108] text-[#FDFBF7] font-semibold border border-[#FF7A18]/30 shadow-md shadow-[#FF7A18]/10"
                        : "text-[#A79B94] hover:text-[#FDFBF7] hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#FF7A18]" : "text-[#A79B94]/60"}`} />
                      <span className="truncate">{item.title}</span>
                    </div>

                    <span className={`text-[10px] shrink-0 ${isActive ? "text-[#FFB15E]" : "text-[#A79B94]/50"}`}>
                      {item.time}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
