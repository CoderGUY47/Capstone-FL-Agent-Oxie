"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { FiCopy, FiCheck, FiThumbsUp, FiThumbsDown, FiRotateCw } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { UIMessage } from "ai";
import { cn } from "@/lib/utils";

export interface MessageProps {
  role?: "user" | "assistant";
  content?: string;
  time?: string;
  message?: UIMessage;
}

type LikeState = "none" | "liked" | "disliked";

export default function MessageBubble({ role, content, time = "11:22 PM", message }: MessageProps) {
  const actualRole = message?.role ?? role ?? "assistant";
  const isUser = actualRole === "user";
  const [copied, setCopied] = useState(false);
  const [likeState, setLikeState] = useState<LikeState>("none");

  // Extract text from parts (v7 UIMessage)
  let textContent = content || "";
  if (message) {
    if (Array.isArray(message.parts)) {
      textContent = message.parts
        .filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join("") || content || "";
    } else if ((message as any).content) {
      textContent = (message as any).content;
    }
  }

  const handleCopy = useCallback(() => {
    if (!textContent) return;
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [textContent]);

  const handleLike = useCallback(() => {
    setLikeState((prev) => (prev === "liked" ? "none" : "liked"));
  }, []);

  const handleDislike = useCallback(() => {
    setLikeState((prev) => (prev === "disliked" ? "none" : "disliked"));
  }, []);

  if (isUser) {
    return (
      <div className="flex flex-col items-end gap-1 w-full max-w-3xl mx-auto my-2.5">
        {/* Translucent Indigo Glass User Message Bubble (border-none) */}
        <div className="flex items-center gap-2.5 max-w-[85%]">
          <div className="px-5 py-2.5 rounded-2xl bg-indigo-600/80 backdrop-blur-md border-none text-white text-xs font-semibold leading-relaxed shadow-md">
            <span className="whitespace-pre-wrap">{textContent || "hi"}</span>
          </div>

          <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border-none text-white text-[11px] font-extrabold flex items-center justify-center shrink-0 select-none shadow-sm">
            OX
          </div>
        </div>

        {/* Action bar BELOW User message div */}
        <div className="flex items-center gap-2 text-[10.5px] text-slate-400 pr-9 pt-0.5 font-medium">
          <button
            type="button"
            onClick={handleCopy}
            className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors border-none"
          >
            {copied ? <FiCheck className="w-3 h-3 text-indigo-400" /> : <FiCopy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <span>·</span>
          <span>{time}</span>
          <FiCheck className="w-3 h-3 text-indigo-400" />
        </div>
      </div>
    );
  }

  // Assistant Response Message — ONLY THIS CHAT DIV GETS A LIGHT BORDER (border border-white/10)
  return (
    <div className="flex gap-3 w-full max-w-3xl mx-auto items-start my-3">
      {/* Oxie Logo Avatar (border-none) */}
      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border-none flex items-center justify-center shrink-0 mt-0.5 select-none shadow-md p-1">
        <Image
          src="/images/oxie.png"
          alt="Oxie AI"
          width={22}
          height={22}
          className="w-5.5 h-5.5 object-contain"
          priority
        />
      </div>

      {/* Content Column */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        {/* Chat Div with Light Border (border border-white/10) */}
        <div className="w-full rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl text-white p-5 text-xs leading-relaxed">
          <StreamingMarkdown content={textContent} />
        </div>

        {/* Action bar BELOW the Response Card Div */}
        <div className="flex items-center gap-2 justify-start px-1 text-[10.5px] text-slate-400 font-medium">
          <button
            type="button"
            className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors border-none"
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy text"}
          >
            {copied ? (
              <>
                <FiCheck className="w-3 h-3 text-indigo-400" />
                <span className="text-indigo-400">Copied</span>
              </>
            ) : (
              <>
                <FiCopy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            className={cn(
              "p-0.5 transition-colors cursor-pointer outline-none hover:text-white border-none",
              likeState === "liked" && "text-indigo-400"
            )}
            onClick={handleLike}
            title="Like response"
          >
            <FiThumbsUp className="w-3 h-3" />
          </button>

          <button
            type="button"
            className={cn(
              "p-0.5 transition-colors cursor-pointer outline-none hover:text-white border-none",
              likeState === "disliked" && "text-red-400"
            )}
            onClick={handleDislike}
            title="Dislike response"
          >
            <FiThumbsDown className="w-3 h-3" />
          </button>

          <button
            type="button"
            className="p-0.5 transition-colors cursor-pointer outline-none hover:text-white border-none"
            title="Regenerate response"
          >
            <FiRotateCw className="w-3 h-3" />
          </button>

          <span>·</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Code block with Copy button and syntax highlighting ───── */
function CodeBlock({ codeString, language }: { codeString: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full my-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/10 backdrop-blur-md border-b border-white/10 text-xs font-mono">
        <span className="text-indigo-400 font-semibold uppercase tracking-wider text-[11px]">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer outline-none border-none"
        >
          {copied ? (
            <>
              <FiCheck className="w-3 h-3 text-indigo-400" />
              <span className="text-[11px] text-indigo-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <FiCopy className="w-3 h-3 text-slate-300" />
              <span className="text-[11px] text-slate-300">Copy code</span>
            </>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        style={oneDark}
        language={language || "javascript"}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: "16px",
          fontSize: "12.5px",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          lineHeight: "1.6",
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}

/* ── Streaming-safe Markdown renderer ─────────────────────── */
function closeDanglingFences(content: string): string {
  const fenceCount = (content.match(/```/g) || []).length;
  if (fenceCount % 2 !== 0) {
    return content + "\n```";
  }
  return content;
}

function StreamingMarkdown({ content }: { content: string }) {
  const safeContent = closeDanglingFences(content || "");

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeString = String(children).replace(/\n$/, "");
          const isBlock = codeString.includes("\n") || !!match;

          return isBlock ? (
            <CodeBlock codeString={codeString} language={match ? match[1] : "text"} />
          ) : (
            <code
              className="bg-white/10 text-indigo-400 border-none px-1.5 py-0.5 rounded-md text-[11.5px] font-mono font-medium"
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {safeContent}
    </ReactMarkdown>
  );
}
