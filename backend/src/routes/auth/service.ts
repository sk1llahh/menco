import dayjs from 'dayjs';
import prisma from '@/prisma';
import {CONFIG} from '@/utils/config';
import {
  randomToken,
  sha256,
  hashPassword,
  comparePassword,
} from '@/utils/crypto';
import {error} from "@/utils/errors";
import {signAccessToken} from '@/utils/jwt';
import {RegisterBody, AuthResult, LoginBody} from './types';

const toAuthUser = (u: any) => ({
  id: u.id,
  login: u.login,
  email: u.email,
  name: u.name,
  avatarUrl: u.avatarUrl,
  createdAt: u.createdAt,
  updatedAt: u.updatedAt,
});

const createRefreshToken = async (userId: string): Promise<{ raw: string }> => {
  const raw = randomToken(64);
  const tokenHash = sha256(raw);
  const expiresAt = dayjs().add(CONFIG.REFRESH_TTL_DAYS, 'day').toDate();
  await prisma.refreshToken.create({data: {userId, tokenHash, expiresAt}});
  return {raw};
};

const register = async (body: RegisterBody): Promise<AuthResult> => {
  const {login, password, email, name, avatarUrl, timezone} = body;
  if (!login || !password)
    throw error("login & password required", 400);

  const exists = await prisma.user.findUnique({where: {login}});
  if (exists)
    throw error("User already exists", 400);

  const pwd = await hashPassword(password);
  const user = await prisma.user.create({
    data: {login, password: pwd, email, name, avatarUrl, timezone},
  });

  const accessToken = signAccessToken({userId: user.id, login: user.login});
  const {raw: refreshToken} = await createRefreshToken(user.id);

  return {accessToken, refreshToken, user: toAuthUser(user)};
};

const login = async (body: LoginBody): Promise<AuthResult> => {
  const {login, password} = body;
  if (!login || !password)
    throw error("login & password required", 400);

  const user = await prisma.user.findUnique({where: {login}});
  if (!user) throw error("User not found", 404);

  const ok = await comparePassword(password, user.password);
  if (!ok)
    throw error("Invalid credentials", 401);

  const accessToken = signAccessToken({userId: user.id, login: user.login});
  const {raw: refreshToken} = await createRefreshToken(user.id);

  return {accessToken, refreshToken, user: toAuthUser(user)};
};

const refresh = async (token: string): Promise<AuthResult> => {
  if (!token)
    throw error("No refresh token", 400);

  const hash = sha256(token);
  const current = await prisma.refreshToken.findUnique({
    where: {tokenHash: hash},
  });
  if (!current)
    throw error("Invalid refresh token", 401);
  if (current.revokedAt)
    throw error("Refresh token revoked", 401);

  if (dayjs(current.expiresAt).isBefore(dayjs()))
    throw error("Refresh token expired", 401);


  const user = await prisma.user.findUnique({where: {id: current.userId}});
  if (!user) throw error("User not found", 401);

  const {raw: newRaw} = await prisma.$transaction(async (tx) => {
    const raw2 = randomToken(64);
    const hash2 = sha256(raw2);
    const expiresAt = dayjs().add(CONFIG.REFRESH_TTL_DAYS, 'day').toDate();

    const rec2 = await tx.refreshToken.create({
      data: {userId: user.id, tokenHash: hash2, expiresAt},
    });
    await tx.refreshToken.update({
      where: {id: current.id},
      data: {revokedAt: dayjs().toDate(), replacedById: rec2.id},
    });
    return {raw: raw2};
  });

  const accessToken = signAccessToken({userId: user.id, login: user.login});
  return {accessToken, refreshToken: newRaw, user: toAuthUser(user)};
};

const logout = async (refreshToken?: string): Promise<{ ok: true }> => {
  if (!refreshToken) return {ok: true};
  const hash = sha256(refreshToken);
  const rec = await prisma.refreshToken.findUnique({
    where: {tokenHash: hash},
  });
  if (!rec) return {ok: true};
  await prisma.refreshToken.update({
    where: {id: rec.id},
    data: {revokedAt: dayjs().toDate()},
  });
  return {ok: true};
};

const logoutAll = async (userId: string): Promise<{ ok: true }> => {
  await prisma.refreshToken.updateMany({
    where: {userId, revokedAt: null},
    data: {revokedAt: dayjs().toDate()},
  });
  return {ok: true};
};

export default {register, login, refresh, logout, logoutAll};
