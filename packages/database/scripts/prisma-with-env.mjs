import { config as loadEnv } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../../config/.env");
loadEnv({ path: envPath });

const args = process.argv.slice(2);
const prismaBin = path.resolve(__dirname, "../node_modules/.bin/prisma");
const child = spawn(prismaBin, args, { stdio: "inherit" });

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
