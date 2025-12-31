# Phaser 3 + React + WebSocket Monorepo

This scaffold provides a minimal monorepo using pnpm workspaces with a Phaser 3 + React client and a Node.js WebSocket server. Shared TypeScript definitions live in `packages/shared`.

## Structure
- `apps/client`: Vite + React + Phaser 3
- `apps/server`: Node.js WebSocket server
- `packages/shared`: Shared enums and types

## Getting Started

```bash
pnpm install
```

### Development

Run client and server separately:

```bash
pnpm dev:client
pnpm dev:server
```

### Production Build

```bash
pnpm build
```

### Start Server

```bash
pnpm start
```

The client runs on Vite's dev server (port 5173) and connects to the WebSocket server on port 3001 by default.
