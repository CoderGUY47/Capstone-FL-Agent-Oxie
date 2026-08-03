import { cn } from "@/lib/utils";
import type { Metadata } from 'next';
import { Google_Sans_Flex } from 'next/font/google';
import './globals.css';

const gflexFont = Google_Sans_Flex({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Oxie - Personal AI Agent",
  description:
    "High-performance personal AI agent",
  keywords: ["Oxie", "CoderGUY47", "AI Agent", "Personal AI", "AI Stack", "Next.js 16", "React 19", "Vercel AI SDK"],
  icons: {
    icon: "/images/oxie.png",
  },
  openGraph: {
    title: "Oxie - Personal AI Agent",
    description: "Your high-performance personal AI agent and AI stack showcase.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gflexFont.variable} ${gflexFont.className} h-full antialiased`}>
      <body className={`${gflexFont.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
