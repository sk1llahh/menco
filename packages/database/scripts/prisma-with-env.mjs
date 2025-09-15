import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import {findRepoRoot} from '@repo/config'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = findRepoRoot(__dirname);

const envName = process.env.NODE_ENV || "development";
const names = [
  `.env.${envName}.local`,
  `.env.local`,
  `.env.${envName}`,
  `.env`,
  `env.${envName}.local`,
  `env.local`,
  `env.${envName}`,
  `env`,
];

const candidates = [process.env.DOTENV_CONFIG_PATH]
  .concat(repoRoot ? names.map((n) => path.resolve(repoRoot, n)) : [])
  .filter(Boolean);

let loaded = false;
for (const p of candidates) {
  try {
    if (p && fs.existsSync(p)) {
      loadEnv({ path: p });
      loaded = true;
      break;
    }
  } catch {}
}
if (!loaded) {
  loadEnv();
}

const args = process.argv.slice(2);
const prismaBin = path.resolve(__dirname, "../node_modules/.bin/prisma");
const child = spawn(prismaBin, args, { stdio: "inherit" });

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
