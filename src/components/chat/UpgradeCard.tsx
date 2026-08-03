"use client";

import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

export default function UpgradeCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="w-full p-3.5 rounded-md bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md shadow-lg shadow-black/40 flex items-center justify-between gap-3 group cursor-pointer"
    >
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
          <FiStar className="w-3.5 h-3.5 text-[#6366f1] fill-[#6366f1]" />
          <span>Upgrade to Pro</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-tight">
          Unlock advanced models and premium features.
        </p>
      </div>

      <button
        type="button"
        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#6366f1]/80 hover:bg-[#6366f1] border border-white/20 rounded-full transition-all shadow-sm shrink-0 cursor-pointer backdrop-blur-md"
      >
        Upgrade
      </button>
    </motion.div>
  );
}
