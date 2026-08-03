# Oxie - Personal AI Agent

> A high-performance, full-stack Personal AI Agent & AI Architecture showcase built by **CoderGUY47** using **Next.js 16 (App Router + Turbopack)**, **React 19**, **Tailwind CSS**, and **Vercel AI SDK**.

---

## 🌟 UI Showcase

### 1. Landing Homepage
![Oxie AI Landing Homepage](./public/layouts/home-page.png)

### 2. Interactive AI Chat Experience
![Oxie AI Chat Interface](./public/layouts/chat-page.png)

---

## ✨ Features

- 💎 **Ultra-Premium Glassmorphism Design**: Custom dark glass aesthetic with subtle rim reflections, backdrop blurs, and an Indigo theme palette.
- ⚡ **Next.js 16 & React 19 Powered**: Built with Turbopack for lightning-fast compilation, server rendering, and zero layout shift.
- 🤖 **Vercel AI SDK Integration**: Seamless multi-turn streaming AI conversations powered by Google Gemini models.
- 🎨 **Editorial Typography**: Customized typography featuring **Google Sans Flex** for UI text and **Alex Brush** for calligraphic hero accents.
- 📱 **Responsive Glass Navigation**: Floating glass capsule navigation bar, collapsible dark indigo sidebar, and standalone icon UI controls.
- 🚀 **Full-Stack Capabilities**:
  - Code Generation & Refactoring
  - Bug Analysis & Diagnostic Tracing
  - System Architecture & API Design
  - Web Search & Documentation Retrieval

---

## 🛠️ Technology Stack

| Category | Technology / Library |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4, Custom Glassmorphism System |
| **AI Integration** | Vercel AI SDK (`ai`), `@google/genai` |
| **Icons & Motion** | React Icons, Lucide Icons, Framer Motion |
| **Typography** | Google Sans Flex, Alex Brush |

---

## 📁 Project Structure

```
agent-oxie/
├── public/
│   ├── favicon.ico
│   ├── images/            # Brand logos & Oxie AI assets
│   └── layouts/           # UI screenshots (home-page.png, chat-page.png, main-bg.png)
├── src/
│   ├── app/
│   │   ├── page.tsx       # Root Landing Homepage (/)
│   │   ├── chat/          # AI Chat Application (/chat)
│   │   ├── layout.tsx     # Root Layout with Font & Favicon configuration
│   │   └── api/chat/      # AI Streaming API Endpoint
│   ├── components/
│   │   ├── home/          # Modular Landing Page Components (Navbar, Hero)
│   │   ├── chat/          # Chat UI (Topbar, PromptInput, MessageBubble)
│   │   └── sidebar/       # Dark Indigo Glass Sidebar & Conversation Items
│   └── lib/               # Utility functions & AI provider setup
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm**: `v9.0.0` or higher

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/CoderGUY47/-Capstone-FL-Agent-Oxie.git
cd -Capstone-FL-Agent-Oxie
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build

Validate TypeScript and build for production:

```bash
npm run build
npm run start
```

---

## 🤝 Author & License

Built with ❤️ by **[CoderGUY47](https://github.com/CoderGUY47)**.
