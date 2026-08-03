"use client";

import MessageBubble, { MessageProps } from "./MessageBubble";

interface ChatMessageProps {
  messages: MessageProps[];
}

export default function ChatMessage({ messages }: ChatMessageProps) {
  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto">
        <MessageBubble role="user" content="How can I build a simple AI chatbot using Python?" />
        <MessageBubble role="assistant" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      {messages.map((msg, index) => (
        <MessageBubble key={index} role={msg.role} content={msg.content} time={msg.time} message={msg.message} />
      ))}
    </div>
  );
}
