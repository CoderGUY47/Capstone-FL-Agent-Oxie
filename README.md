# 🚀 Oxie — Personal AI Agent & Architecture Workbench

[![Next.js 16.2](https://img.shields.io/badge/Next.js-16.2-black?logo=nextdotjs)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-v4.0-black?logo=vercel)](https://sdk.vercel.ai/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?logo=google)](https://ai.google.dev/)

> **Oxie AI Assistant** is a state-of-the-art Personal AI Agent and AI Architecture showcase built by **CoderGUY47** using **Next.js 16 (App Router + Turbopack)**, **Vercel AI SDK**, **Google Gemini 2.5 Flash**, and a custom **3D Glassmorphism Design System**.

---

## 🖼️ Application UI Showcase

<table>
  <tr>
    <td width="50%" align="center">
      <img src="./public/layouts/home-page.png" alt="Landing Homepage" />
      <br />
      <sub><b>Landing Homepage (<code>/</code>)</b></sub>
    </td>
    <td width="50%" align="center">
      <img src="./public/layouts/chat-page.png" alt="AI Chat Application" />
      <br />
      <sub><b>AI Chat Application (<code>/chat</code>)</b></sub>
    </td>
  </tr>
</table>

---

## ❓ What It Is

**Oxie** is an intelligent personal AI assistant designed to accelerate product development, code generation, system architecture planning, and web research. It serves as both a high-performance productivity workspace for developers and a reference showcase for modern full-stack AI application architecture.

> [!NOTE]
> **Why It Matters**: Most AI wrappers rely on basic chat boxes. Oxie combines real-time streaming, modular glassmorphism design, custom cursive typography, and zero-layout-shift (CLS = 0) execution into a cohesive production application.

---

## ⚡ What It Does

- 💬 **Real-time AI Streaming Chat**: Delivers token-by-token streaming responses with formatted markdown, syntax-highlighted code blocks, copy actions, and message feedback.
- 🚀 **AI-Assisted Workflows**: Helps developers turn ideas into products through code generation, bug diagnosis, and system architecture design.
- 💎 **3D Glassmorphism Design System**: Features dark glass surfaces (`#0d0f17`), frosted backdrop blurs, soft top-edge rim reflections, and an Indigo theme palette.
- 🎯 **Standalone Iconography & Floating Controls**: Clean, box-free icons with text-only active highlights for an un-cluttered workspace.
- 🌐 **Live Web & Documentation Search**: Connects users to up-to-date documentation and online resources seamlessly.
- 🛡️ **Designed Resilience**: Handles API rate limits (429), mid-stream interruptions, and server errors (500) with built-in retry mechanisms.

---

## ⚙️ How It Works

```
┌────────────────────────────────┐
│      1. User Action / Prompt   │
│   (Input Bar / Capability Card)│
└───────────────┬────────────────┘
                │
                ▼
┌────────────────────────────────┐
│    2. Vercel AI SDK Client     │
│   (useChat + StreamTransport)  │
└───────────────┬────────────────┘
                │  POST /api/chat
                ▼
┌────────────────────────────────┐
│   3. Next.js 16 API Route      │
│  (Google Gemini 2.5 Flash API) │
└───────────────┬────────────────┘
                │  Stream Tokens
                ▼
┌────────────────────────────────┐
│   4. Real-time UI Rendering    │
│  (Markdown, Syntax & Controls) │
└────────────────────────────────┘
```

1. **User Request**: The user enters a prompt via the input bar (`src/components/chat/PromptInput.tsx`) or clicks a capability starter card.
2. **Vercel AI SDK Transport**: The prompt is processed by `useChat` and sent as a POST request to `/api/chat`.
3. **Google Gemini Stream**: Server-side route handler (`src/app/api/chat/route.ts`) streams tokens from Google Gemini 2.5 Flash.
4. **Token-by-Token Rendering**: The frontend streams tokens into message bubbles (`src/components/chat/MessageBubble.tsx`), updating syntax-highlighted code blocks dynamically.

---

## 🧪 Testing Failure States & Reliability

We have built interactive testing capabilities for edge cases at `http://localhost:3000/chat`:

| Test State | Trigger Scenario | Visual UI Behavior |
| :--- | :--- | :--- |
| **`Happy Path (200)`** | Standard prompt submission | Streams response in a dark glass bubble with code copy, timestamps, and feedback icons. |
| **`429 Rate Limit`** | Exceeding API rate quotas | Displays a styled error banner with clear rate-limit feedback and a **Retry** button. |
| **`Mid-Stream Error`** | Network interruption mid-response | Preserves streamed partial text and shows an inline recovery banner. |
| **`500 Server Error`** | Invalid server configuration | Renders graceful fallback error UI with a functional **Retry** action. |
| **`Slow Latency`** | High model processing load | Displays animated thinking indicators without layout shift (CLS = 0). |

---

## 🎨 Theme & Design Architecture

- **Color Surface Engine**: Deep black (`#000000`) and dark indigo (`#0d0f17`) with 3D inset rim reflections (`shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)]`).
- **Typography**:
  - **Body & UI**: `Google Sans Flex` (`--font-sans`).
  - **Hero Accents**: `Alex Brush` (`--font-cursive`) for hero headlines (`Build` and `Grow`).
- **Text Palette Standard**:
  - **Headings & Main Text:** `text-white` (`#ffffff`).
  - **Muted Subtext:** `text-white/60` (60% white opacity).
  - **Highlights:** `text-indigo-400` & `bg-indigo-600/30`.
  - **Strict No-Gray Policy**: All plain gray variants replaced with white opacity standards for contrast consistency.

---

## 📦 Tech Stack

- **Framework:** Next.js 16.2.12 (App Router, Turbopack)
- **AI Engine:** Vercel AI SDK (`ai`), `@google/genai` (Google Gemini 2.5 Flash)
- **Icons:** React Icons (`bi`, `fi`, `md`, `pi`, `tb`, `vsc`, `gr`, `lu`, `fa`, `hi2`)
- **Favicon & Brand Assets:** Oxie logo icon (`/favicon.ico`, `/icon.png`, `/images/oxie.png`)
- **Styling:** Custom Glassmorphism, Tailwind CSS v4, Framer Motion

---

## 🚀 Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start Development Server
```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000).

### 4. Production Build & Start
```bash
npm run build
npm run start
```

---

> [!IMPORTANT]
> **GitHub Repository**: [https://github.com/CoderGUY47/-Capstone-FL-Agent-Oxie](https://github.com/CoderGUY47/-Capstone-FL-Agent-Oxie)
