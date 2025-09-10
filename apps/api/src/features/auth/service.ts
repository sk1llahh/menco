import dayjs from "dayjs";
import prisma from "@repo/database";
import { CONFIG } from "@/shared/utils/config";
import {
  randomToken,
  sha256,
  hashPassword,
  comparePassword,
} from "@/shared/utils/crypto";
import { error } from "@/shared/utils/errors";
import { signAccessToken } from "@/shared/utils/jwt";
import { type AuthResult, toAuthUser } from "./mapper";
import { type LoginBody, RefreshBody, type RegisterBody } from "@repo/types";

const createRefreshToken = async (userId: string): Promise<string> => {
  const raw = randomToken(64);
  const tokenHash = sha256(raw);
  const expiresAt = dayjs().add(CONFIG.REFRESH_TTL_DAYS, "day").toDate();
  await prisma.refreshToken.create({
    data: { userId, tokenHash, expiresAt },
  });
  return raw;
};

const register = async (body: RegisterBody): Promise<AuthResult> => {
  const exists = await prisma.user.findUnique({ where: { login: body.login } });
  if (exists) throw error("User already exists", 409);

  const pwd = await hashPassword(body.password);
  const user = await prisma.user.create({
    data: {
      login: body.login,
      password: pwd,
      email: body.email,
      name: body.name,
      avatarUrl: body.avatarUrl,
      timezone: body.timezone,
    },
  });

  const accessToken = signAccessToken({ userId: user.id, login: user.login });
  const refreshToken = await createRefreshToken(user.id);
  return { accessToken, refreshToken, user: toAuthUser(user) };
};

const login = async (body: LoginBody): Promise<AuthResult> => {
  const user = await prisma.user.findUnique({ where: { login: body.login } });
  if (!user) throw error("User not found", 404);

  const ok = await comparePassword(body.password, user.password);
  if (!ok) throw error("Invalid credentials", 401);

  const accessToken = signAccessToken({ userId: user.id, login: user.login });
  const refreshToken = await createRefreshToken(user.id);
  return { accessToken, refreshToken, user: toAuthUser(user) };
};

const refresh = async (token: string): Promise<AuthResult> => {
  const hash = sha256(token);
  const current = await prisma.refreshToken.findUnique({
    where: { tokenHash: hash },
  });
  if (!current) throw error("Invalid refresh token", 401);
  if (current.revokedAt) throw error("Refresh token revoked", 401);
  if (current.expiresAt < dayjs().toDate())
    throw error("Refresh token expired", 401);

  const user = await prisma.user.findUnique({ where: { id: current.userId } });
  if (!user) throw error("User not found", 401);

  const newRaw = await prisma.$transaction(async (tx: any) => {
    const raw2 = randomToken(64);
    const hash2 = sha256(raw2);
    const expiresAt = dayjs().add(CONFIG.REFRESH_TTL_DAYS, "day").toDate();

    const next = await tx.refreshToken.create({
      data: { userId: user.id, tokenHash: hash2, expiresAt },
    });
    await tx.refreshToken.update({
      where: { id: current.id },
      data: { revokedAt: dayjs().toDate(), replacedById: next.id },
    });
    return raw2;
  });

  const accessToken = signAccessToken({ userId: user.id, login: user.login });
  return { accessToken, refreshToken: newRaw, user: toAuthUser(user) };
};

const logout = async (refreshToken?: string) => {
  if (!refreshToken) return { ok: true as const };
  const hash = sha256(refreshToken);
  const rec = await prisma.refreshToken.findUnique({
    where: { tokenHash: hash },
  });
  if (!rec) return { ok: true as const };
  await prisma.refreshToken.update({
    where: { id: rec.id },
    data: { revokedAt: dayjs().toDate() },
  });
  return { ok: true as const };
};

const logoutAll = async (userId: string) => {
  await prisma.refreshToken.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: dayjs().toDate() },
  });
  return { ok: true as const };
};

export default { register, login, refresh, logout, logoutAll };
