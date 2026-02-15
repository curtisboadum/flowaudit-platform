"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isStreaming) {
      inputRef.current?.focus();
    }
  }, [isOpen, isStreaming]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      const userMessage: ChatMessage = { role: "user", content: text.trim() };
      const updatedMessages = [...messages, userMessage];

      setMessages(updatedMessages);
      setInput("");
      setIsStreaming(true);
      setError(null);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        });

        if (!response.ok) {
          const errorData: unknown = await response.json().catch(() => null);
          const errorMessage =
            errorData !== null &&
            typeof errorData === "object" &&
            "error" in errorData &&
            typeof (errorData as Record<string, unknown>).error === "string"
              ? (errorData as Record<string, string>).error
              : "Failed to get response";
          throw new Error(errorMessage);
        }

        const body = response.body;
        if (!body) {
          throw new Error("No response body");
        }

        const reader = body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";

        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data: ")) continue;

            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;

            let parsed: unknown;
            try {
              parsed = JSON.parse(data);
            } catch {
              continue; // Skip malformed JSON chunks
            }

            if (
              parsed !== null &&
              typeof parsed === "object" &&
              "text" in parsed &&
              typeof (parsed as Record<string, unknown>).text === "string"
            ) {
              assistantContent += (parsed as Record<string, string>).text;
              setMessages((prev) => {
                const updated = [...prev];
                const lastMessage = updated[updated.length - 1];
                if (lastMessage && lastMessage.role === "assistant") {
                  updated[updated.length - 1] = {
                    ...lastMessage,
                    content: assistantContent,
                  };
                }
                return updated;
              });
            }
            if (
              parsed !== null &&
              typeof parsed === "object" &&
              "error" in parsed &&
              typeof (parsed as Record<string, unknown>).error === "string"
            ) {
              throw new Error((parsed as Record<string, string>).error);
            }
          }
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setError(message);
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === "assistant" && last.content === "") {
            return prev.slice(0, -1);
          }
          return prev;
        });
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, messages],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const handleQuickQuestion = (question: string) => {
    void sendMessage(question);
  };

  const quickQuestions = [
    "How does this work for tradespeople?",
    "What does setup look like?",
    "How much does it cost?",
    "Does this work for small teams?",
  ];

  return (
    <>
      {/* Chat Panel */}
      <div
        className={`fixed right-4 bottom-20 z-50 flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 ease-in-out sm:right-6 sm:w-[380px] ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ height: "min(520px, calc(100vh - 120px))" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#37322F] px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">FlowAudit_</h3>
              <p className="text-xs text-gray-300">AI Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close chat"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-[#F7F5F3] p-4">
          {messages.length === 0 && !error && (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#37322F]">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#37322F]">
                  Hi! Got questions about automating your admin?
                </p>
                <p className="mt-1 text-xs text-[#605A57]">
                  I can help with pricing, setup, and what works for your business
                </p>
              </div>
              <div className="mt-2 flex w-full flex-col gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleQuickQuestion(question)}
                    className="rounded-lg border border-[#E8E4E1] bg-white px-3 py-2 text-left text-sm text-[#37322F] transition-colors hover:border-[#37322F] hover:bg-[#F0EDEB]"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-3 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "rounded-br-md bg-[#37322F] text-white"
                    : "rounded-bl-md bg-[#F0EDEB] text-[#37322F]"
                }`}
              >
                {message.content}
                {message.role === "assistant" && message.content === "" && isStreaming && (
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#605A57]" />
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#605A57]"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#605A57]"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </span>
                )}
              </div>
            </div>
          ))}

          {error && (
            <div className="mb-3 flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-red-50 px-4 py-2.5 text-sm leading-relaxed text-red-800">
                {error}{" "}
                <a href="/book" className="font-medium text-red-600 underline hover:text-red-800">
                  Book a call
                </a>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-[#E8E4E1] bg-white px-3 py-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={isStreaming}
            className="flex-1 rounded-lg border border-[#E8E4E1] bg-[#F7F5F3] px-3 py-2 text-sm text-[#37322F] placeholder-[#605A57] transition-colors outline-none focus:border-[#37322F] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#37322F] text-white transition-colors hover:bg-[#605A57] disabled:opacity-40"
            aria-label="Send message"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#37322F] text-white shadow-lg transition-all hover:bg-[#605A57] hover:shadow-xl sm:right-6"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <svg
          className={`h-6 w-6 transition-transform duration-300 ${isOpen ? "scale-0 rotate-90" : "scale-100 rotate-0"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <svg
          className={`absolute h-6 w-6 transition-transform duration-300 ${isOpen ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </>
  );
}
