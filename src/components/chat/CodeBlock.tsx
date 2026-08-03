"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  language?: string;
  code: string;
}

export default function CodeBlock({ language = "Python", code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full my-3 rounded-md bg-[#090504] border border-white/[0.08] overflow-hidden shadow-2xl">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/[0.06] text-xs font-mono">
        <span className="text-[#A79B94]/80 font-medium">{language}</span>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#FDFBF7] transition-all cursor-pointer outline-none border border-white/[0.06]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#A79B94]" />
              <span className="text-[11px] text-[#A79B94]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto font-mono text-xs text-[#FDFBF7] leading-relaxed select-text">
        <pre>
          <code>
            {code.split("\n").map((line, idx) => {
              let lineContent = line;

              return (
                <div key={idx} className="table-row">
                  <span className="table-cell select-none text-[#A79B94]/30 pr-4 text-right">
                    {idx + 1}
                  </span>
                  <span className="table-cell">
                    {lineContent.includes("import ") || lineContent.includes("def ") ? (
                      <span className="text-purple-400 font-semibold">{lineContent}</span>
                    ) : lineContent.includes('"your_api_key"') || lineContent.includes('"gpt-3.5-turbo"') ? (
                      <span className="text-emerald-400">{lineContent}</span>
                    ) : lineContent.includes("while True:") || lineContent.includes("response =") ? (
                      <span className="text-[#FFB15E]">{lineContent}</span>
                    ) : (
                      <span>{lineContent}</span>
                    )}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}
