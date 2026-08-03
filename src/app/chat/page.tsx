"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { UIMessage, DefaultChatTransport } from "ai";
import { HiSparkles } from "react-icons/hi2";
import { FiCode, FiCpu, FiCompass, FiZap } from "react-icons/fi";
import Sidebar from "@/components/sidebar/Sidebar";
import Topbar from "@/components/chat/Topbar";
import MessageBubble from "@/components/chat/MessageBubble";
import PromptInput from "@/components/chat/PromptInput";
import ThinkingIndicator from "@/components/chat/ThinkingIndicator";
import { Conversation } from "@/components/sidebar/ConversationItem";

const STORAGE_KEY = "oxie-ai-conversations";
const ACTIVE_KEY = "oxie-ai-active-conversation";

function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map((c: Conversation) => ({
      ...c,
      createdAt: new Date(c.createdAt),
    }));
  } catch {
    return [];
  }
}

function saveConversations(conversations: Conversation[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch {
    // quota fallback
  }
}

function generateTitle(messages: UIMessage[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser) return "New conversation";
  const content = firstUser.parts
    ? firstUser.parts
        .filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join("")
        .trim()
    : (firstUser as any).content || "";
  return content.length > 35 ? content.slice(0, 35) + "…" : content || "New conversation";
}

function createNewConversation(): Conversation {
  return {
    id: `conv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: "New conversation",
    messages: [],
    createdAt: new Date(),
  };
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAutoScrollRef = useRef(true);

  useEffect(() => {
    const saved = loadConversations();
    if (saved.length > 0) {
      setConversations(saved);
      const savedActive = localStorage.getItem(ACTIVE_KEY);
      const validActive = saved.find((c) => c.id === savedActive);
      setActiveId(validActive ? validActive.id : saved[0].id);
    } else {
      const first = createNewConversation();
      setConversations([first]);
      setActiveId(first.id);
    }
  }, []);

  useEffect(() => {
    if (conversations.length > 0) {
      saveConversations(conversations);
    }
    if (activeId) {
      localStorage.setItem(ACTIVE_KEY, activeId);
    }
  }, [conversations, activeId]);

  const activeConversation = conversations.find((c) => c.id === activeId);

  const { messages, status, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: activeConversation?.messages ?? [],
    onFinish: ({ messages: finalMessages }) => {
      if (!activeId) return;
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? { ...c, messages: finalMessages, title: generateTitle(finalMessages) }
            : c
        )
      );
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Smooth scroll handler
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isAutoScrollRef.current) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    isAutoScrollRef.current = isAtBottom;
  };

  const handleNewChat = useCallback(() => {
    const newConv = createNewConversation();
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(newConv.id);
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleDeleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const next = prev.filter((c) => c.id !== id);
        if (activeId === id) {
          setActiveId(next[0]?.id ?? null);
        }
        return next;
      });
    },
    [activeId]
  );

  const handleRenameConversation = useCallback((id: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
    );
  }, []);

  const handleTogglePin = useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c))
    );
  }, []);

  const handleClearAll = useCallback(() => {
    if (!confirm("Clear all recents? This cannot be undone.")) return;
    const newConv = createNewConversation();
    setConversations([newConv]);
    setActiveId(newConv.id);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACTIVE_KEY);
  }, []);

  const handleSendPrompt = useCallback(
    (text: string) => {
      if (!text.trim() || isLoading) return;
      isAutoScrollRef.current = true;
      sendMessage({ text });
    },
    [isLoading, sendMessage]
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white flex select-none font-sans">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeId}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        onClearAll={handleClearAll}
        onTogglePin={handleTogglePin}
      />

      {/* Main Chat Screen */}
      <main className="relative flex-1 flex flex-col h-full overflow-hidden min-w-0 z-10">
        {/* Topbar */}
        <Topbar title={activeConversation?.title || "New conversation"} />

        {/* Scrollable Conversation Stream */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto pt-6 pb-6 px-4 flex flex-col justify-start"
        >
          {messages.length === 0 ? (
            /* Standalone Big Icons without Background Boxes */
            <EmptyChatWelcome onSelectPrompt={handleSendPrompt} />
          ) : (
            /* Dynamic Message Stream */
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {isLoading && <ThinkingIndicator />}
            </div>
          )}
        </div>

        {/* Sticky Centered Prompt Input Bar */}
        <PromptInput onSend={handleSendPrompt} isLoading={isLoading} />
      </main>
    </div>
  );
}

/* ── Pure Standalone Big Icons (NO icon background box) ── */
function EmptyChatWelcome({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) {
  const starterPrompts = [
    {
      title: "Code Generation",
      subtitle: "Write Next.js, React, or Python modules",
      icon: FiCode,
      prompt: "Create a modern React component with TypeScript and Tailwind CSS for a dashboard widget.",
    },
    {
      title: "Bug Analysis & Fixing",
      subtitle: "Analyze stack traces and resolve errors",
      icon: FiZap,
      prompt: "I have a bug in my code. Help me analyze the stack trace and fix the root cause.",
    },
    {
      title: "System Architecture",
      subtitle: "Design scalable REST, GraphQL, & DB schemas",
      icon: FiCpu,
      prompt: "Design a clean RESTful API endpoint architecture in Next.js App Router with error handling.",
    },
    {
      title: "Live Web & Documentation",
      subtitle: "Fetch 2026 specs and web documentation",
      icon: FiCompass,
      prompt: "Search the latest 2026 documentation and explain best practices for modern web apps.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center my-auto py-10 text-center select-none max-w-2xl mx-auto">
      {/* Translucent Glass Intelligence Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border-none backdrop-blur-md text-indigo-400 text-xs font-semibold mb-6 shadow-md">
        <HiSparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
        <span className="text-white">Oxie AI Intelligence</span>
      </div>

      {/* Headline & Subtitle */}
      <div className="flex flex-col items-center gap-2.5 mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How can Oxie assist you today?
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-lg font-medium leading-relaxed">
          Select a capabilities category below or type your custom prompt directly in the input bar.
        </p>
      </div>

      {/* 4 Cards with BIG standalone icons (NO background box around icons) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full text-left">
        {starterPrompts.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectPrompt(item.prompt)}
              className="flex items-center gap-4 p-4.5 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border-none transition-all duration-300 cursor-pointer group text-left outline-none shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
            >
              {/* Standalone Big Icon without background box */}
              <Icon className="w-7 h-7 text-indigo-400 group-hover:text-white shrink-0 transition-transform duration-300 group-hover:scale-110" />

              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-sm font-bold text-white group-hover:text-white leading-snug truncate">
                  {item.title}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-slate-200 leading-snug">
                  {item.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
