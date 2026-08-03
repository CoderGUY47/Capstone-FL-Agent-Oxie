import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiLock, FiMail, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#1e2124] text-white flex flex-col items-center justify-center p-4 select-none font-sans">
      {/* Back navigation */}
      <div className="w-full max-w-md mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors no-underline px-3 py-1.5 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 backdrop-blur-md"
        >
          <FiArrowLeft className="w-3.5 h-3.5 text-[#6366f1]" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Glass Card */}
      <div className="w-full max-w-md bg-white/5 border border-white/15 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6">
        {/* Logo & Title */}
        <div className="flex flex-col items-center text-center gap-2">
          <Image
            src="/images/oxie.png"
            alt="Oxie AI Logo"
            width={60}
            height={60}
            className="w-15 h-15 object-contain mb-1"
            priority
          />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-xs text-slate-400 max-w-xs">
            Sign in to access your saved chats and AI projects.
          </p>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href="/chat"
            className="flex items-center justify-center gap-2 h-9 px-3 bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md rounded-md text-xs font-semibold text-white transition-colors no-underline"
          >
            <FcGoogle className="w-4 h-4" />
            <span>Google</span>
          </a>
          <a
            href="/chat"
            className="flex items-center justify-center gap-2 h-9 px-3 bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md rounded-md text-xs font-semibold text-white transition-colors no-underline"
          >
            <FiGithub className="w-4 h-4 text-white" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Or with email
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Form */}
        <form action="/chat" method="get" className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-300">
              Email address
            </label>
            <div className="relative flex items-center">
              <FiMail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="email"
                required
                name="email"
                placeholder="you@example.com"
                className="w-full h-9 pl-9 pr-3 text-xs bg-white/10 border border-white/15 focus:border-white/30 rounded-md outline-none text-white placeholder-slate-400 font-medium transition-colors backdrop-blur-md"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300">
                Password
              </label>
              <a href="#" className="text-[11.5px] font-semibold text-[#6366f1] hover:underline no-underline">
                Forgot password?
              </a>
            </div>
            <div className="relative flex items-center">
              <FiLock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="password"
                required
                name="password"
                placeholder="••••••••"
                className="w-full h-9 pl-9 pr-3 text-xs bg-white/10 border border-white/15 focus:border-white/30 rounded-md outline-none text-white placeholder-slate-400 font-medium transition-colors backdrop-blur-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-9 bg-[#6366f1]/80 hover:bg-[#6366f1] backdrop-blur-md text-white font-semibold text-xs rounded-md border border-white/20 transition-colors cursor-pointer outline-none mt-1 shadow-md"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-2 border-t border-white/10 text-xs text-slate-400">
          <span>Don&apos;t have an account? </span>
          <Link
            href="/signup"
            className="font-bold text-[#6366f1] hover:underline no-underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
