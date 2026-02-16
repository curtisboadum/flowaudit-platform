// ---------------------------------------------------------------------------
// Chat provider abstraction — OpenAI-compatible streaming for OpenRouter & DeepSeek
// ---------------------------------------------------------------------------

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ProviderConfig {
  name: string;
  baseUrl: string;
  apiKey: string;
  model: string;
  extraHeaders?: Record<string, string>;
}

interface StreamOptions {
  maxTokens?: number;
  temperature?: number;
}

// ---------------------------------------------------------------------------
// Provider factories
// ---------------------------------------------------------------------------

function openRouterProvider(): ProviderConfig | null {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;
  return {
    name: "OpenRouter",
    baseUrl: "https://openrouter.ai/api/v1",
    apiKey,
    model: process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.3-70b-instruct:free",
    extraHeaders: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "https://flowaudit.co.uk",
      "X-Title": "FlowAudit_",
    },
  };
}

function deepSeekProvider(): ProviderConfig | null {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return null;
  return {
    name: "DeepSeek",
    baseUrl: "https://api.deepseek.com/v1",
    apiKey,
    model: process.env.DEEPSEEK_MODEL ?? "deepseek-chat",
  };
}

// ---------------------------------------------------------------------------
// Core streaming fetch for OpenAI-compatible endpoints
// ---------------------------------------------------------------------------

async function fetchChatStream(
  provider: ProviderConfig,
  messages: ChatMessage[],
  options: StreamOptions,
): Promise<ReadableStream<Uint8Array>> {
  const res = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${provider.apiKey}`,
      ...provider.extraHeaders,
    },
    body: JSON.stringify({
      model: provider.model,
      messages,
      max_tokens: options.maxTokens ?? 512,
      temperature: options.temperature ?? 0.7,
      stream: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    const err = new Error(`${provider.name} ${res.status}: ${body.slice(0, 200)}`);
    (err as unknown as Record<string, unknown>).status = res.status;
    throw err;
  }

  if (!res.body) {
    throw new Error(`${provider.name} returned no response body`);
  }

  // Transform OpenAI SSE stream → FlowAudit_ SSE format
  const upstream = res.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  const providerName = provider.name;

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await upstream.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            processLine(line, controller, encoder, providerName);
          }
        }

        // Flush remaining buffer
        if (buffer.trim()) {
          processLine(buffer, controller, encoder, providerName);
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        console.error(`[chat] ${providerName} stream read error:`, err);
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
    cancel() {
      upstream.cancel().catch(() => {});
    },
  });
}

// ---------------------------------------------------------------------------
// SSE line parser
// ---------------------------------------------------------------------------

function processLine(
  line: string,
  controller: ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
  providerName: string,
): void {
  const trimmed = line.trim();

  // Skip empty lines and SSE comments (OpenRouter keep-alives)
  if (!trimmed || trimmed.startsWith(":")) return;
  if (!trimmed.startsWith("data: ")) return;

  const payload = trimmed.slice(6);
  if (payload === "[DONE]") return;

  try {
    const chunk = JSON.parse(payload) as Record<string, unknown>;

    // OpenRouter mid-stream error field
    if (chunk.error) {
      const errMsg =
        typeof chunk.error === "object" && chunk.error !== null && "message" in chunk.error
          ? (chunk.error as { message: string }).message
          : String(chunk.error);
      console.error(`[chat] ${providerName} stream error:`, errMsg);
      return;
    }

    const choices = chunk.choices as Array<{ delta?: { content?: string } }> | undefined;
    const text = choices?.[0]?.delta?.content;
    if (text) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
    }
  } catch {
    // Malformed JSON line — skip
  }
}

// ---------------------------------------------------------------------------
// Retry + fallback orchestrator
// ---------------------------------------------------------------------------

function extractStatus(err: unknown): number | undefined {
  if (typeof err === "object" && err !== null && "status" in err) {
    const s = (err as { status: unknown }).status;
    return typeof s === "number" ? s : undefined;
  }
  return undefined;
}

function isRetryable(status: number | undefined): boolean {
  return status === 429 || (status !== undefined && status >= 500);
}

export async function streamWithFallback(
  messages: ChatMessage[],
  options: StreamOptions = {},
): Promise<ReadableStream<Uint8Array>> {
  const providers = [openRouterProvider(), deepSeekProvider()].filter(
    (p): p is ProviderConfig => p !== null,
  );

  const primary = providers[0];
  if (!primary) {
    throw new Error("No chat providers configured");
  }

  const fallback = providers[1];
  const MAX_RETRIES = 2;
  let lastError: unknown;

  // --- Try primary with retries ---
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fetchChatStream(primary, messages, options);
    } catch (err: unknown) {
      lastError = err;
      const status = extractStatus(err);
      const errMsg = err instanceof Error ? err.message : String(err);

      console.error(`[chat] ${primary.name} attempt ${attempt + 1}/${MAX_RETRIES + 1} failed:`, {
        status,
        message: errMsg,
      });

      // Non-retryable errors (400, 401, 403) skip straight to fallback
      if (!isRetryable(status)) break;

      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }

  // --- Try fallback (single attempt, last resort) ---
  if (fallback) {
    try {
      console.error(`[chat] ${primary.name} exhausted. Trying ${fallback.name} fallback.`);
      return await fetchChatStream(fallback, messages, options);
    } catch (err: unknown) {
      lastError = err;
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error(`[chat] ${fallback.name} fallback also failed:`, {
        message: errMsg,
      });
    }
  }

  throw lastError ?? new Error("All chat providers failed");
}
