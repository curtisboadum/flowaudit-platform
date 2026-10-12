"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useLocale } from "@/components/providers/locale-provider";
import { useState, useRef, useEffect, useCallback } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const { locale } = useLocale();
  const label = (en: string, es: string) => (locale === "es" ? es : en);
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
    label("What happens before activation?", "¿Qué ocurre antes de activar?"),
    label("What can the dental demo show?", "¿Qué muestra la demo dental?"),
    label("How is pricing scoped?", "¿Cómo se define el precio?"),
  ];
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger
        className="fa-chat-trigger"
        aria-label={label("Open FlowAudit assistant", "Abrir asistente de FlowAudit")}
      >
        ?
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fa-chat-overlay" />
        <Dialog.Content className="fa-chat-panel">
          <div className="fa-chat-header">
            <Dialog.Title>FlowAudit</Dialog.Title>
            <Dialog.Close aria-label={label("Close chat", "Cerrar chat")}>×</Dialog.Close>
          </div>
          <Dialog.Description className="fa-small">
            {label(
              "AI website assistant. Please avoid patient or confidential information.",
              "Asistente de IA del sitio. Evita datos de pacientes o información confidencial.",
            )}
          </Dialog.Description>
          <div className="fa-chat-messages" aria-live="polite" aria-relevant="additions text">
            {messages.length === 0 && (
              <div>
                <p>{label("What would you like to understand?", "¿Qué te gustaría entender?")}</p>
                {quickQuestions.map((q) => (
                  <button key={q} onClick={() => handleQuickQuestion(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <p key={i} className={m.role === "user" ? "fa-chat-user" : ""}>
                <strong>{m.role === "user" ? label("You", "Tú") : "FlowAudit"}</strong>
                <br />
                {m.content || label("Thinking…", "Pensando…")}
              </p>
            ))}
            {error && (
              <p role="alert">
                {label(
                  "The assistant is unavailable. We can help on a call.",
                  "El asistente no está disponible. Podemos ayudarte en una llamada.",
                )}{" "}
                <a href="/book" className="underline">
                  {label("Book a call", "Reservar llamada")}
                </a>
              </p>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="fa-chat-input">
              {label("Message", "Mensaje")}
            </label>
            <input
              id="fa-chat-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              disabled={isStreaming}
              placeholder={label("Your question…", "Tu pregunta…")}
            />
            <button disabled={isStreaming || !input.trim()} type="submit">
              {label("Send", "Enviar")}
            </button>
          </form>
          <a className="fa-text-link" href="/book">
            {label("Book a 15-minute fit assessment", "Reservar evaluación de 15 minutos")} ↗
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
