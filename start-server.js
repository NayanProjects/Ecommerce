
import fs from "node:fs";
import { spawn } from "node:child_process";

const dbPath = process.env.DB_PATH || "./db.json";

if (process.env.DB_PATH && !fs.existsSync(dbPath)) {
  fs.copyFileSync("./db.json", dbPath);
}

const port = process.env.PORT || "3000";

const server = spawn(
  process.execPath,
  [
    "./node_modules/json-server/lib/bin.js",
    dbPath,
    "--host",
    "0.0.0.0",
    "--port",
    port
  ],
  { stdio: "inherit" }
);

server.on("error", (error) => {
  console.error("Failed to start JSON Server:", error);
  process.exit(1);
});

server.on("exit", (code) => {
  process.exit(code ?? 0);
});
