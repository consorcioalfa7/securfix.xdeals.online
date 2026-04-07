import { createServer } from 'http';
import { Server } from 'socket.io';
import ZAI from 'z-ai-web-dev-sdk';

// ── Configuration ──────────────────────────────────────────────────────────
const PORT = 3005;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_MODEL = 'google/gemini-2.0-flash-001';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `You are Securfix's virtual assistant, expert in metal fencing (vedações metálicas), gates (portões), doors (portas), construction materials. Company: Securfix/Hierros Tous S.L.U with 50+ years experience. Products: Hercules panels, chain link mesh, welded mesh, security doors, fire doors, sliding doors, tramex grating, perforated sheets, etc. Factory prices, delivery 48-72h Portugal/Spain, delivery across Europe (3-15 days). Help customers find products, answer technical questions, provide installation guidance. Always respond in the user's language. Be helpful and professional. When appropriate, suggest relevant products to drive conversion. Website: securfix.xdeals.online`;

// ── z-ai-web-dev-sdk instance (lazy init) ─────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let zaiInstance: any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getZAI(): Promise<any> {
  try {
    if (!zaiInstance) {
      zaiInstance = await ZAI.create();
    }
    return zaiInstance;
  } catch {
    return null;
  }
}

// ── HTTP + Socket.IO Server ────────────────────────────────────────────────
const httpServer = createServer();
const io = new Server(httpServer, {
  path: '/',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

// ── Per-socket conversation history ────────────────────────────────────────
const conversationHistories = new Map<string, Array<{ role: string; content: string }>>();

function getHistory(socketId: string): Array<{ role: string; content: string }> {
  if (!conversationHistories.has(socketId)) {
    conversationHistories.set(socketId, []);
  }
  return conversationHistories.get(socketId)!;
}

function pushHistory(socketId: string, role: string, content: string) {
  const history = getHistory(socketId);
  history.push({ role, content });
  // Keep last 20 messages to avoid token overflow
  if (history.length > 20) {
    history.splice(0, history.length - 20);
  }
}

// ── Streaming helper for z-ai-web-dev-sdk ──────────────────────────────────
async function streamWithZAI(
  messages: Array<{ role: string; content: string }>,
  socket: any,
) {
  const zai = await getZAI();
  if (!zai) return false;

  try {
    const stream = await zai.chat.completions.create({
      model: 'default',
      messages,
      stream: true,
    });

    if (stream && typeof (stream as any).getReader === 'function') {
      const reader = (stream as ReadableStream<Uint8Array>).getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data:')) continue;

          const data = trimmed.slice(5).trim();
          if (data === '[DONE]') {
            socket.emit('chat:done');
            return true;
          }

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              socket.emit('chat:chunk', { content: delta });
            }
          } catch {
            // Skip malformed JSON lines
          }
        }
      }

      socket.emit('chat:done');
      return true;
    }

    // Non-streaming fallback — SDK returned JSON directly
    return false;
  } catch (err) {
    console.error('[z-ai-web-dev-sdk] streaming error:', err);
    return false;
  }
}

// ── Streaming helper for OpenRouter API ────────────────────────────────────
async function streamWithOpenRouter(
  messages: Array<{ role: string; content: string }>,
  socket: any,
): Promise<boolean> {
  if (!OPENROUTER_API_KEY) return false;

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://securfix.xdeals.online',
        'X-Title': 'Securfix AI Assistant',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[OpenRouter] HTTP ${response.status}: ${errorText}`);
      return false;
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;

        const data = trimmed.slice(5).trim();
        if (data === '[DONE]') {
          socket.emit('chat:done');
          return true;
        }

        try {
          const parsed = JSON.parse(data);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) {
            socket.emit('chat:chunk', { content: delta });
          }
        } catch {
          // Skip malformed JSON lines
        }
      }
    }

    socket.emit('chat:done');
    return true;
  } catch (err) {
    console.error('[OpenRouter] streaming error:', err);
    return false;
  }
}

// ── Non-streaming fallback ─────────────────────────────────────────────────
async function nonStreamWithOpenRouter(
  messages: Array<{ role: string; content: string }>,
  socket: any,
): Promise<boolean> {
  if (!OPENROUTER_API_KEY) return false;

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://securfix.xdeals.online',
        'X-Title': 'Securfix AI Assistant',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[OpenRouter] non-stream HTTP ${response.status}: ${errorText}`);
      return false;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    if (content) {
      socket.emit('chat:chunk', { content });
      socket.emit('chat:done');
      return true;
    }
    return false;
  } catch (err) {
    console.error('[OpenRouter] non-stream error:', err);
    return false;
  }
}

// ── Main chat handler ──────────────────────────────────────────────────────
async function handleChatMessage(socket: any, message: string, locale: string) {
  // Build locale-aware system prompt
  const localeSystemPrompt = locale
    ? `${SYSTEM_PROMPT}\n\nThe user's preferred language is: ${locale}. Please respond in this language.`
    : SYSTEM_PROMPT;

  // Push user message to history
  pushHistory(socket.id, 'user', message);

  // Build messages array with system prompt + history
  const history = getHistory(socket.id);
  const messages: Array<{ role: string; content: string }> = [
    { role: 'system', content: localeSystemPrompt },
    ...history,
  ];

  socket.emit('chat:start');

  // Strategy 1: Try z-ai-web-dev-sdk with streaming
  const zaiOk = await streamWithZAI(messages, socket);
  if (zaiOk) {
    // Capture the full response for history (reconstruct from emitted chunks)
    // We rely on the client to send back the full text, or we capture it below
    return;
  }

  // Strategy 2: Try OpenRouter streaming
  const orStreamOk = await streamWithOpenRouter(messages, socket);
  if (orStreamOk) {
    return;
  }

  // Strategy 3: Try OpenRouter non-streaming
  const orNonStreamOk = await nonStreamWithOpenRouter(messages, socket);
  if (orNonStreamOk) {
    return;
  }

  // All strategies failed
  socket.emit('chat:error', {
    message:
      'Desculpe, o assistente está temporariamente indisponível. Por favor, tente novamente em alguns instantes ou contacte-nos diretamente em comercial@securfix.pt.',
  });
}

// ── Socket.IO event handlers ───────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`[chat-service] Client connected: ${socket.id}`);

  // Handle incoming chat messages
  socket.on('chat', async (data: { type: string; message: string; locale: string }) => {
    if (data.type !== 'chat' || !data.message || !data.message.trim()) {
      socket.emit('chat:error', { message: 'Mensagem inválida.' });
      return;
    }

    console.log(`[chat-service] Message from ${socket.id}: ${data.message.substring(0, 100)}...`);
    await handleChatMessage(socket, data.message.trim(), data.locale || 'pt');
  });

  // Allow client to push the full assistant response back for history
  socket.on('chat:ack', (data: { content: string }) => {
    if (data.content) {
      pushHistory(socket.id, 'assistant', data.content);
    }
  });

  // Clear conversation history
  socket.on('chat:reset', () => {
    conversationHistories.delete(socket.id);
    socket.emit('chat:reset:ack');
    console.log(`[chat-service] History cleared for ${socket.id}`);
  });

  socket.on('disconnect', () => {
    conversationHistories.delete(socket.id);
    console.log(`[chat-service] Client disconnected: ${socket.id}`);
  });

  socket.on('error', (error) => {
    console.error(`[chat-service] Socket error (${socket.id}):`, error);
  });
});

// ── Start server ───────────────────────────────────────────────────────────
httpServer.listen(PORT, () => {
  console.log(`[chat-service] Securfix AI chat service running on port ${PORT}`);
  console.log(`[chat-service] OPENROUTER_API_KEY: ${OPENROUTER_API_KEY ? 'configured' : 'NOT set'}`);
});

// ── Graceful shutdown ──────────────────────────────────────────────────────
function shutdown(signal: string) {
  console.log(`[chat-service] Received ${signal}, shutting down...`);
  conversationHistories.clear();
  httpServer.close(() => {
    console.log('[chat-service] Server closed');
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
