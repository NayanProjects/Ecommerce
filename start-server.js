
import fs from "node:fs";
import { spawn } from "node:child_process";

const dbPath = "/var/data/db.json";

// Copy initial database only if it doesn't exist yet.
if (!fs.existsSync(dbPath)) {
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

server.on("exit", (code) => {
  process.exit(code ?? 0);
});
