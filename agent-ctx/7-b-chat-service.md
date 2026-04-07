# Task ID: 7-b — AI Chat Mini-Service

**Date:** 2026-04-07
**Status:** Complete
**Agent:** chat-service-creator

## Summary

Created the AI chat mini-service at `mini-services/chat-service/` that provides a WebSocket-based AI assistant for Securfix customers.

## Files Created

### 1. `mini-services/chat-service/package.json`
- Package name: `securfix-chat-service`
- Dev script: `bun --hot index.ts` (auto-restart on file change)
- Dependencies: `socket.io@^4.8.1`

### 2. `mini-services/chat-service/index.ts`
- Socket.IO-based chat service listening on **port 3005**
- HTTP server with Socket.IO on path `/` (Caddy gateway compatible)
- CORS: origin `*`, methods GET/POST
- Ping timeout: 60s, ping interval: 25s

## Architecture

**Multi-strategy AI completion with graceful fallback:**
1. **Strategy 1 — z-ai-web-dev-sdk** (streaming): Uses `ZAI.create()` with `.z-ai-config`. Calls `zai.chat.completions.create()` with `stream: true`. Parses SSE `data:` lines, extracts `choices[0].delta.content`, emits `chat:chunk` events.
2. **Strategy 2 — OpenRouter API** (streaming): Direct `fetch()` to `https://openrouter.ai/api/v1/chat/completions` with `stream: true`. Model: `google/gemini-2.0-flash-001`. Same SSE parsing.
3. **Strategy 3 — OpenRouter API** (non-streaming): Fallback if streaming fails. Sends single request, emits full response as one `chat:chunk`.
4. **Error**: If all strategies fail, emits `chat:error` with friendly Portuguese message suggesting to contact comercial@securfix.pt.

## Socket Events

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `chat` | Client → Server | `{ type: 'chat', message: string, locale: string }` | Send a chat message |
| `chat:start` | Server → Client | — | AI response streaming started |
| `chat:chunk` | Server → Client | `{ content: string }` | Streamed text chunk |
| `chat:done` | Server → Client | — | AI response complete |
| `chat:error` | Server → Client | `{ message: string }` | Error occurred |
| `chat:ack` | Client → Server | `{ content: string }` | Client confirms full assistant response (for history) |
| `chat:reset` | Client → Server | — | Clear conversation history |
| `chat:reset:ack` | Server → Client | — | History cleared confirmation |

## Conversation Management
- Per-socket conversation history stored in `Map<socketId, Message[]>`
- History capped at 20 messages (oldest trimmed) to prevent token overflow
- System prompt is locale-aware: appends `"\n\nThe user's preferred language is: {locale}"` when locale is provided
- History cleared on disconnect

## System Prompt
Securfix virtual assistant expert in metal fencing, gates, doors, construction materials. Company info: Securfix/Hierros Tous S.L.U, 50+ years experience, factory prices, 48-72h delivery Portugal/Spain, 3-15 days Europe. Responds in user's language. Suggests products for conversion. Website: securfix.xdeals.online

## Environment Variables
- `OPENROUTER_API_KEY` — Required for OpenRouter API fallback (currently not set in environment)
- `.z-ai-config` — Required for z-ai-web-dev-sdk (checked at project root, home dir, /etc)

## Dependencies Installed
- `socket.io@4.8.3` (22 packages total)
- `z-ai-web-dev-sdk` resolved from parent project's `node_modules`

## Type Check
- `tsc --noEmit` passes with zero errors

## Notes
- Worklog.md is owned by root (read-only), so work record written here instead
- Service NOT started yet (as instructed) — ready to start with `cd mini-services/chat-service && bun run dev`
- Frontend should connect via `io("/?XTransformPort=3005")`
