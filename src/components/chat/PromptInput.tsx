"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiZap, FiCpu, FiGlobe, FiCheck } from "react-icons/fi";
import { BiSolidSend as BiSendIcon } from "react-icons/bi";
import { LuAudioLines } from "react-icons/lu";
import { LiaMicrophoneSolid, LiaAirbnb } from "react-icons/lia";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { cn } from "@/lib/utils";

interface ModelItem {
  id: string;
  name: string;
  badge: string;
  description: string;
  icon: any;
}

const MODELS: ModelItem[] = [
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    badge: "Fast",
    description: "Next-gen ultra fast multimodal model by Google",
    icon: FiZap,
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    badge: "Pro",
    description: "Advanced complex coding and 2M token reasoning",
    icon: FiCpu,
  },
  {
    id: "gemini-2.0-flash-thinking",
    name: "Gemini 2.0 Flash Thinking",
    badge: "Thinking",
    description: "Live chain-of-thought problem solving",
    icon: FiCpu,
  },
  {
    id: "claude-3.7-sonnet",
    name: "Claude 3.7 Sonnet (Reasoning)",
    badge: "Default",
    description: "Hybrid reasoning & hybrid speed for software engineering",
    icon: FiZap,
  },
  {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    badge: "Popular",
    description: "Top-tier agentic coding and precise analysis",
    icon: FiCpu,
  },
  {
    id: "claude-3.5-haiku",
    name: "Claude 3.5 Haiku",
    badge: "Speed",
    description: "Lightning fast responses for quick queries",
    icon: FiZap,
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    badge: "Flagship",
    description: "Omni model for vision, audio, text & math",
    icon: FiGlobe,
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    badge: "Efficient",
    description: "Lightweight and cost-efficient intelligence",
    icon: FiZap,
  },
  {
    id: "o3-mini",
    name: "OpenAI o3-mini (High)",
    badge: "STEM",
    description: "State-of-the-art math and competitive coding",
    icon: FiCpu,
  },
  {
    id: "o1",
    name: "OpenAI o1",
    badge: "Reasoning",
    description: "Deep reasoning model for complex scientific queries",
    icon: FiCpu,
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    badge: "Open Reasoning",
    description: "Open-weights chain of thought reasoning model",
    icon: FiCpu,
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    badge: "MoE",
    description: "671B parameter Mixture-of-Experts engine",
    icon: FiZap,
  },
  {
    id: "llama-3.3-70b",
    name: "Llama 3.3 70B",
    badge: "Meta",
    description: "Industry standard open model fine-tuned for chat",
    icon: FiGlobe,
  },
  {
    id: "qwen-2.5-max",
    name: "Qwen 2.5 Max",
    badge: "Alibaba",
    description: "High performance flagship model by Alibaba AI",
    icon: FiZap,
  },
  {
    id: "mistral-large-2",
    name: "Mistral Large 2",
    badge: "Mistral",
    description: "Multilingual coding and 128k context window",
    icon: FiGlobe,
  },
  {
    id: "cohere-command-r-plus",
    name: "Command R+ (Cohere)",
    badge: "RAG",
    description: "Optimized for enterprise RAG and tool use",
    icon: FiGlobe,
  },
  {
    id: "grok-3",
    name: "Grok 3",
    badge: "xAI",
    description: "Colossus-trained supercomputing model",
    icon: FiZap,
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    badge: "Google",
    description: "Long-context understanding up to 2 million tokens",
    icon: FiGlobe,
  },
  {
    id: "perplexity-sonar-reasoning",
    name: "Sonar Reasoning (Perplexity)",
    badge: "Search",
    description: "Realtime web search backed by deep reasoning",
    icon: FiGlobe,
  },
  {
    id: "deepseek-coder-v2",
    name: "DeepSeek Coder V2",
    badge: "Code",
    description: "Specialized model supporting 338 programming languages",
    icon: FiCpu,
  },
];

interface PromptInputProps {
  onSend?: (text: string) => void;
  isLoading?: boolean;
}

export default function PromptInput({ onSend, isLoading = false }: PromptInputProps) {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState<ModelItem>(MODELS[0]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsModelOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend?.(input);
    setInput("");
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky bottom-16 w-full max-w-3xl mx-auto px-4 z-30 shrink-0 pointer-events-auto mb-10"
    >
      {/* Taller Input Container (h-32) with Glassmorphism and NO button bg boxes */}
      <form
        onSubmit={handleSubmit}
        className="w-full h-32 p-4.5 rounded-2xl bg-white/5 border-none outline-none backdrop-blur-2xl shadow-[0_16px_48px_0_rgba(0,0,0,0.8)] flex flex-col justify-between transition-all duration-300 group hover:bg-white/10"
      >
        {/* Top Text Input Area with Taller Font & Spacing */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type / for skills or ask AI anything..."
          className="w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none border-none font-sans py-1"
        />

        {/* Bottom Actions Row with Standalone Big Icons (NO background boxes) */}
        <div className="flex items-center justify-between pt-2 border-none">
          {/* Left: Standalone Airbnb Attachment Icon + Standalone Resources Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-1 rounded-md text-indigo-400 hover:text-white border-none transition-transform hover:scale-110 cursor-pointer outline-none bg-transparent"
              title="Attachment Option"
            >
              <LiaAirbnb className="w-5.5 h-5.5 text-indigo-400 hover:text-white" />
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-1 py-1 bg-transparent border-none text-white text-xs font-semibold transition-colors cursor-pointer outline-none hover:text-indigo-400"
            >
              <HiOutlineInboxArrowDown className="w-5 h-5 text-indigo-400" />
              <span className="text-white">Resources</span>
            </button>
          </div>

          {/* Right: Standalone Model Selector + Standalone Mic + Standalone Audio + Send Button */}
          <div className="flex items-center gap-3">
            {/* Model Selector Dropdown (Standalone without button bg box) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsModelOpen((v) => !v)}
                className="flex items-center gap-1.5 px-1 py-1 bg-transparent text-white text-xs font-semibold border-none cursor-pointer transition-colors hover:text-indigo-400"
              >
                <selectedModel.icon className="w-4.5 h-4.5 text-indigo-400" />
                <span className="text-white max-w-36 truncate">{selectedModel.name}</span>
                <FiChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isModelOpen && (
                <div className="absolute bottom-full right-0 mb-3 w-80 max-h-72 overflow-y-auto bg-black/90 border-none backdrop-blur-2xl rounded-xl shadow-[0_20px_60px_0_rgba(0,0,0,0.95)] p-2 z-50 text-white">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Available Models (20)
                  </div>
                  {MODELS.map((model) => {
                    const isSelected = selectedModel.id === model.id;
                    return (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() => {
                          setSelectedModel(model);
                          setIsModelOpen(false);
                        }}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-2 rounded-md cursor-pointer transition-colors text-left border-none text-white mb-1",
                          isSelected
                            ? "bg-indigo-600/30 text-white font-semibold"
                            : "text-slate-300 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <div className="flex flex-col gap-0.5 min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <model.icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            <span className="font-semibold text-xs text-white truncate">{model.name}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-600/25 text-indigo-300 shrink-0">
                              {model.badge}
                            </span>
                          </div>
                          <span className="text-[10.5px] text-slate-400 font-normal truncate">
                            {model.description}
                          </span>
                        </div>
                        {isSelected && <FiCheck className="w-4 h-4 text-indigo-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Standalone Voice Mic Button */}
            <button
              type="button"
              onClick={() => setIsRecording((v) => !v)}
              className={cn(
                "p-1 rounded-md transition-transform hover:scale-110 cursor-pointer outline-none border-none bg-transparent",
                isRecording
                  ? "text-indigo-400"
                  : "text-indigo-400 hover:text-white"
              )}
              title="Voice Input"
            >
              <LiaMicrophoneSolid className="w-5 h-5" />
            </button>

            {/* Standalone Audio Lines Button */}
            <button
              type="button"
              onClick={() => setIsAudioEnabled((v) => !v)}
              className={cn(
                "p-1 rounded-md transition-transform hover:scale-110 cursor-pointer outline-none border-none bg-transparent",
                isAudioEnabled
                  ? "text-indigo-400"
                  : "text-indigo-400 hover:text-white"
              )}
              title="Audio Output"
            >
              <LuAudioLines className="w-5 h-5" />
            </button>

            {/* Send Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`w-8.5 h-8.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-500 backdrop-blur-md flex items-center justify-center text-white shadow-lg transition-all border-none outline-none cursor-pointer ${
                !input.trim() || isLoading ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"
              }`}
            >
              <BiSendIcon className="w-4.5 h-4.5 text-white" />
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
