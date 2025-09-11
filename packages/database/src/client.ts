import "@repo/config";
if (!process.env.DATABASE_URL) {
  const hint = process.env.__ENV_FILE
    ? `Loaded env file: ${process.env.__ENV_FILE}`
    : "No env file detected. Set DOTENV_CONFIG_PATH or create env.development / env.production in repo root.";
  throw new Error(`DATABASE_URL is not set. ${hint}`);
}

export * from "../generated/client";

import { PrismaClient } from "../generated/client";

const prismaClientSingleton = () => new PrismaClient();

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
