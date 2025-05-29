# basic-mcp · Minimal MCP Server in TypeScript

> **Status:** Proof of concept — designed for quick local testing with Model Context Protocol clients.

This repository contains a **tiny MCP server** written in TypeScript.  
It publishes a single tool — `fetch-weather` — that returns a mock weather report for any city.  
Use it to learn how transports, tools and schemas work with `@modelcontextprotocol/sdk`.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Lightweight** | One‑file implementation (`main.ts`). |
| **Stdio transport** | Communicates over standard I/O (perfect for piping into LLMs). |
| **Zod validation** | Strongly‑typed parameters with runtime validation. |
| **Mock weather** | Demonstrates `content` blocks without external APIs. |

---

## 🛠 Requirements

* Node.js ≥ 18 (ESM & top‑level `await` support)  
* pnpm / npm / yarn to install dependencies  
* ts-node _(optional)_ for dev mode

---

## 🚀 Quick start

```bash
# 1 — Clone
git clone https://github.com/SkyH34D/basic-mcp.git
cd first-mcp

# 2 — Install
pnpm install           # or: npm install / yarn install

# 3 — Run (non-sense, it's LLM's job)
npx -y tsx main.ts
# The server now listens on STDIN/STDOUT for MCP messages
```

Send a tool call such as:

```jsonc
{
  "tool": "fetch-weather",
  "params": { "city": "Madrid" }
}
```

and you’ll get:

```jsonc
{
  "content": [
    { "type": "text", "text": "The weather in Madrid is sunny." }
  ]
}
```

---

## 🗂 Project layout

```
basic-mcp/
├─ main.ts         # Main MCP server
├─ package.json
└─ pnpm-lock.yaml
```

---

## 🧩 How it works

1. **Instantiate** `McpServer` with a `name` and `version`.  
2. **Register** the `fetch-weather` tool via `server.tool()`, providing:
   * A unique ID and description  
   * A Zod schema for `city`  
   * An async handler that returns a `content` array  
3. **Create** `StdioServerTransport` to use standard I/O.  
4. **Connect** with `await server.connect(transport)` and start listening.

---

## 📦 NPM scripts

| Script | Runs | Description |
|--------|------|-------------|
| `dev`  | `ts-node` | Hot‑reload style development. |
| `build`| `tsc`     | Compiles TypeScript into `dist/`. |
| `start`| `node`    | Executes the compiled build. |

_(Edit `package.json` to fit your tooling.)_

---

## 📝 TODO / ideas

* Replace the mock weather with a real API (e.g. OpenWeatherMap).  
* Add more tools — currency rates, timezone lookup, etc.  
* Switch to WebSocket/HTTP transport for remote use.  
* Write tests for tool handlers.

---

## 📄 License

MIT

---

### 🤝 Contributing

PRs and discussions are welcome! If you build on this, share your results.
