import { cn } from "@/lib/utils";
import type { Metadata } from 'next';
import { Google_Sans_Flex, Alex_Brush } from 'next/font/google';
import './globals.css';

const gflexFont = Google_Sans_Flex({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const alexBrush = Alex_Brush({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-cursive',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Oxie - Personal AI Agent",
  description: "High-performance personal AI agent",
  keywords: ["Oxie", "CoderGUY47", "AI Agent", "Personal AI", "AI Stack", "Next.js 16", "React 19", "Vercel AI SDK"],
  icons: {
    icon: [
      { url: "/images/oxie.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/images/oxie.png",
    apple: "/images/oxie.png",
  },
  openGraph: {
    title: "Oxie - Personal AI Agent",
    description: "Your high-performance personal AI agent and AI stack showcase.",
    type: "website",
    images: ["/images/oxie.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gflexFont.variable} ${alexBrush.variable} ${gflexFont.className} h-full antialiased`}>
      <head>
        <link rel="icon" href="/images/oxie.png" type="image/png" />
        <link rel="shortcut icon" href="/images/oxie.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/oxie.png" />
      </head>
      <body className={`${gflexFont.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
