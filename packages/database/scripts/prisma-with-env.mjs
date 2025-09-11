import { config as loadEnv } from "dotenv";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findRepoRoot(start) {
  let curr = start;
  while (true) {
    const marker1 = path.join(curr, "pnpm-workspace.yaml");
    const marker2 = path.join(curr, "turbo.json");
    if (fs.existsSync(marker1) || fs.existsSync(marker2)) return curr;
    const parent = path.dirname(curr);
    if (!parent || parent === curr) return undefined;
    curr = parent;
  }
}

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
