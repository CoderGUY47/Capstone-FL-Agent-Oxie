/**
 * app/api/chat/route.ts
 * ============================================================
 * Server-side streaming chat route handler for Oxie AI Agent (AI SDK v7).
 * ============================================================
 */

import { streamText, convertToModelMessages, tool, isStepCount } from "ai";
import type { UIMessage } from "ai";
import { z } from "zod";
import { searchWeb } from "@/lib/search";
import {
  createOpenRouterProvider,
  MODEL_ID,
  SYSTEM_PROMPT,
  TEMPERATURE,
  MAX_OUTPUT_TOKENS,
} from "@/lib/ai-config";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const openrouter = createOpenRouterProvider();

    const dynamicSystem = `Today's Date: ${new Date().toISOString().split("T")[0]} (Year 2026). You are Oxie. MANDATE: State the direct, accurate answer immediately on line 1 without preambles. Keep responses concise, sharp, and high value.\n\n${SYSTEM_PROMPT}`;

    const result = streamText({
      model: openrouter(MODEL_ID),
      system: dynamicSystem,
      messages: await convertToModelMessages(messages),
      temperature: TEMPERATURE,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      stopWhen: isStepCount(3),
      tools: {
        getRecentNews: tool({
          description: "Search the web for real-time news, current events, technology updates, documentation, or facts.",
          inputSchema: z.object({
            query: z.string().describe("The search query to look up live news or facts"),
          }),
          execute: async ({ query }: { query: string }) => {
            console.log(`[Oxie Tool Call] Searching web for: "${query}"`);
            const results = await searchWeb(query);
            return results;
          },
        }),
      },
      experimental_telemetry: {
        isEnabled: true,
        functionId: "oxie-ai-chat-stream",
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[/api/chat] Oxie Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
