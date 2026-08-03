# 🚀 Oxie AI Assistant — Capstone Project

[![Next.js 16.2](https://img.shields.io/badge/Next.js-16.2-black?logo=nextdotjs)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-v4.0-black?logo=vercel)](https://sdk.vercel.ai/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?logo=google)](https://ai.google.dev/)

> **Oxie AI Assistant** is a state-of-the-art Personal AI Agent and AI Architecture showcase built with **Next.js 16 (App Router + Turbopack)**, **Vercel AI SDK**, **Google Gemini 2.5 Flash**, and a custom **3D Glassmorphism Design System**.

---

## 🌟 Live Preview & Testing URLs

- **Homepage Landing:** [http://localhost:3000](http://localhost:3000)
- **AI Chat Application:** [http://localhost:3000/chat](http://localhost:3000/chat)

---

## 📸 Application UI Preview

### 1. Landing Homepage
![Oxie AI Landing Homepage](./public/layouts/home-page.png)

### 2. Interactive AI Chat Experience
![Oxie AI Chat Interface](./public/layouts/chat-page.png)

---

> [!NOTE]
> **Why It Matters**: Oxie AI combines real-time streaming LLM responses, structured tools, responsive glassmorphism UI components, and zero-layout-shift (CLS = 0) execution to deliver a modern, high-performance AI experience.

---

## ⚡ How to Test Failure States & Features in the Web UI

We have built robust error handling and streaming capabilities into `http://localhost:3000/chat`:

### 1. ⚡ Normal (200) — Happy Path
- **Action:** Visit `http://localhost:3000/chat`, select a prompt or type a question (e.g. *"Design a clean RESTful API endpoint..."*), and click Send.
- **Result:** Response streams token-by-token in a dark glass card with code syntax highlighting, copy, like, dislike, and local timestamp actions.

### 2. ⚡ 429 Rate Limit
- **Action:** Exceed model quotas or trigger rate limit errors on `/api/chat`.
- **Result:** Displays a styled error banner with clear rate-limit feedback and a functional **Retry** action.

### 3. ⚡ Mid-Stream Interruptions
- **Action:** Interrupt network connectivity during active response generation.
- **Result:** Streams initial tokens before interrupting cleanly with an inline error notification. Partial stream content is safely preserved.

### 4. ⚡ 500 Server Error
- **Action:** Trigger invalid API key or server-side exception parameters.
- **Result:** Displays an error banner with graceful error boundary fallback and **Retry** button.

### 5. ⚡ Latency & Zero Layout Shift
- **Action:** Send prompts requiring multi-step processing or web search logic.
- **Result:** Displays animated thinking indicators without layout shift (CLS = 0).

---

## 🔄 AI Streaming & Tool Lifecycle Matrix

```
┌───────────────────┐    Streaming Tokens   ┌───────────────────┐
│ 1. Prompt Input   │ ───────────────────> │ 2. Model Stream   │
│ (Input Bar / SKills)                     │ (Token-by-Token)  │
└───────────────────┘                       └───────────────────┘
                                                      │
                                           ┌──────────┴──────────┐
                                           │  Process AI Stream  │
                                           └──────────┬──────────┘
                                                      │
                            ┌─────────────────────────┴─────────────────────────┐
                            ▼                                                   ▼
                  ┌───────────────────┐                               ┌───────────────────┐
                  │ 3. Output Stream  │                               │ 4. Error State    │
                  │ (Markdown & Code) │                               │ (Designed Error)  │
                  └───────────────────┘                               └───────────────────┘
```

| Lifecycle State | Description | Visual UI Treatment |
| :--- | :--- | :--- |
| **`input-streaming`** | *Model reasoning & streaming* | Animated Lottie thinking indicator with live status feedback |
| **`output-available`** | *Streaming tokens complete* | Styled glass card with markdown rendering, syntax highlighting & action buttons |
| **`output-error`** | *Error state encountered* | Designed error card with error description, technical details toggle & retry action |

---

> [!TIP]
> **State Motion**: All layout transitions use smooth animations with backdrop-blur glass filters, ensuring fluid visual feedback without layout jumps.

---

## 🎨 Theme & Typography Design System

- **Dark Glass Engine**: Deep dark background (`#000000` & `#0d0f17`) with backdrop blur filters and soft 3D rim reflections.
- **Typography Standard**:
  - **Body & UI Font**: `Google Sans Flex` (`--font-sans`).
  - **Cursive Accents**: `Alex Brush` (`--font-cursive`) for hero headlines (`Build` and `Grow`).
- **Text Palette Standard**:
  - **Primary Headings & Content:** Pure `text-white` (`#ffffff`).
  - **Subtext & Muted Labels:** `text-white/60` (60% white opacity).
  - **Indigo Highlights**: `text-indigo-400` & `bg-indigo-600/30`.
  - **Zero Gray Text Policy**: All gray variants replaced with white opacity standards for consistent dark mode contrast.

---

## 📦 Tech Stack

- **Framework:** Next.js 16.2.12 (App Router, Turbopack)
- **AI Engine:** Vercel AI SDK (`ai`), `@google/genai` (Google Gemini 2.5 Flash)
- **Icons:** React Icons (`bi`, `fi`, `md`, `pi`, `tb`, `vsc`, `gr`, `lu`, `fa`, `hi2`)
- **Favicon & Brand Assets:** Oxie logo icon (`/favicon.ico`, `/icon.png`, `/images/oxie.png`)
- **Styling:** Custom Glassmorphism, Tailwind CSS v4, Framer Motion

---

## 🚀 Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start Dev Server**:
   ```bash
   npm run dev
   ```

4. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

---

> [!IMPORTANT]
> **Repository Link**: [GitHub Repository](https://github.com/CoderGUY47/-Capstone-FL-Agent-Oxie)
