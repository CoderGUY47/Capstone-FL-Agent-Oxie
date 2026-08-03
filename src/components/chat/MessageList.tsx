"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { UIMessage } from "ai";
import { HiSparkles } from "react-icons/hi2";
import { FiCode, FiCpu, FiCompass, FiZap } from "react-icons/fi";
import MessageBubble from "./MessageBubble";
import ThinkingIndicator from "./ThinkingIndicator";
import JumpToLatest from "./JumpToLatest";

interface MessageListProps {
  messages: UIMessage[];
  isLoading: boolean;
}

const BOTTOM_THRESHOLD = 80;

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isPinnedRef = useRef(true);
  const [showJump, setShowJump] = useState(false);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const atBottom = distFromBottom < BOTTOM_THRESHOLD;
    isPinnedRef.current = atBottom;
    setShowJump(!atBottom);
  }, []);

  useEffect(() => {
    if (isPinnedRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const jumpToLatest = useCallback(() => {
    isPinnedRef.current = true;
    setShowJump(false);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const lastMsg = messages.at(-1);
  const showThinking = isLoading && lastMsg?.role === "user";

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="relative flex-1 overflow-y-auto py-6 scroll-smooth"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-6 min-h-full">
        {/* Empty state */}
        {messages.length === 0 && !isLoading && (
          <EmptyState />
        )}

        {/* Message bubbles */}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Thinking indicator */}
        {showThinking && <ThinkingIndicator />}

        {/* Invisible scroll anchor */}
        <div ref={bottomRef} aria-hidden="true" style={{ height: 1 }} />
      </div>

      {/* Jump to latest affordance */}
      {showJump && <JumpToLatest onClick={jumpToLatest} />}
    </div>
  );
}

/* ── Pure Standalone Big Icons (NO icon background box) ── */
function EmptyState() {
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

  const handlePromptClick = (prompt: string) => {
    window.dispatchEvent(new CustomEvent("starter-prompt", { detail: prompt }));
  };

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
              onClick={() => handlePromptClick(item.prompt)}
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
