"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiSparkles, HiArrowRight, HiCodeBracket, HiGlobeAlt } from "react-icons/hi2";

/**
 * Center hero section with animated Oxie bot avatar,
 * model badge, headline, description, CTAs, and feature chips.
 */
export default function CenterHeroCore() {
  return (
    <div className="lg:col-span-6 flex flex-col items-center text-center gap-6">
      {/* Animated Oxie Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [0, 1.5, 0, -1.5, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl -z-10 transform scale-125" />
          <Image
            src="/images/oxie.png"
            alt="Oxie AI Bot"
            width={190}
            height={190}
            priority
            className="w-44 h-44 sm:w-52 sm:h-52 object-contain drop-shadow-[0_20px_40px_rgba(79,70,229,0.35)] select-none"
          />
        </motion.div>

        {/* Badge Pill with HiSparkles */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-indigo-500/30 text-xs font-semibold text-indigo-200 backdrop-blur-md shadow-lg shadow-indigo-950/50"
        >
          <HiSparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Oxie 3.7 Sonnet · CoderGUY47 AI Stack</span>
        </motion.div>
      </motion.div>

      {/* Headline & Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-col items-center gap-3.5 max-w-xl"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Build faster, explore deeper with{" "}
          <span className="text-indigo-400 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400">
            Oxie
          </span>
          .
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Your high-performance personal AI companion built by CoderGUY47. Ask questions, debug code, explore architectures, and execute real-time web search — powered by state-of-the-art models.
        </p>
      </motion.div>

      {/* CTAs with HiArrowRight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex items-center justify-center gap-4 flex-wrap"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/chat"
            className="h-11 px-7 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg text-sm flex items-center gap-2 transition-all border border-indigo-400/30 shadow-xl shadow-indigo-600/40 no-underline cursor-pointer"
          >
            <span>Launch Oxie Agent</span>
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <a
            href="https://github.com/CoderGUY47/agent-oxie"
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-7 bg-slate-900/60 hover:bg-slate-800/80 text-white font-semibold rounded-lg text-sm flex items-center justify-center transition-all border border-white/10 backdrop-blur-md no-underline shadow-md"
          >
            Explore AI Stack
          </a>
        </motion.div>
      </motion.div>

      {/* Feature Chips with HiCodeBracket & HiGlobeAlt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md pt-2"
      >
        <motion.div
          whileHover={{ y: -2 }}
          className="flex items-center justify-center gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-indigo-500/20 text-xs font-semibold text-slate-200 backdrop-blur-md shadow-md"
        >
          <HiCodeBracket className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Real-time Code & AI Stack</span>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="flex items-center justify-center gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-purple-500/20 text-xs font-semibold text-slate-200 backdrop-blur-md shadow-md"
        >
          <HiGlobeAlt className="w-4 h-4 text-purple-400 shrink-0" />
          <span>2026 Web Search & Docs</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
