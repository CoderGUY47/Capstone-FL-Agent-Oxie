"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Top bar header component with logo, Oxie brand title, creator badge, and CTAs.
 */
export default function LandingHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between px-4 py-3 rounded-xl bg-slate-950/40 backdrop-blur-xl border border-white/10 shadow-2xl"
    >
      <div className="flex items-center gap-3">
        {/* Animated Brand Avatar / Logo */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex items-center justify-center"
        >
          <Image
            src="/images/oxie.png"
            alt="Oxie Logo"
            width={38}
            height={38}
            className="object-contain drop-shadow-[0_0_12px_rgba(99,102,241,0.5)]"
            priority
          />
        </motion.div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-white tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              Oxie
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Agent Active
            </span>
          </div>
          <span className="text-[11px] text-slate-300 font-medium pt-0.5">
            Personal AI Agent by CoderGUY47
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link
            href="/login"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold border border-white/10 backdrop-blur-md transition-all no-underline flex items-center gap-1.5 shadow-sm"
          >
            Sign In
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link
            href="/signup"
            className="px-4.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold border border-indigo-500/50 shadow-lg shadow-indigo-600/30 transition-all no-underline flex items-center gap-1.5"
          >
            Sign Up
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}
