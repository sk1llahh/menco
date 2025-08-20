import prisma from "@/prisma";
import {comparePassword, hashPassword} from "@/utils/crypto";
import {error} from "@/utils/errors.ts";
import {parsePagination, paginate} from "@/utils/pagination";
import {
  SafeUser,
  UsersListQuery,
  UsersListResult,
  UpdateMeBody,
  ChangePasswordBody,
} from "./types";

const toSafe = (u: any): SafeUser => ({
  id: u.id,
  login: u.login,
  email: u.email,
  name: u.name,
  avatarUrl: u.avatarUrl,
  bio: u.bio,
  timezone: u.timezone,
  locale: u.locale,
  mode: u.mode,
  status: u.status,
  createdAt: u.createdAt,
  updatedAt: u.updatedAt,
});

const listUsers = async (query: UsersListQuery): Promise<UsersListResult> => {
  const {page, limit} = parsePagination(query);

  const where: any = {};
  if (query.q?.trim()) {
    where.OR = [
      {login: {contains: query.q, mode: "insensitive" as const}},
      {name: {contains: query.q, mode: "insensitive" as const}},
      {email: {contains: query.q, mode: "insensitive" as const}},
    ];
  }
  if (query.status) where.status = query.status;
  if (query.mode) where.mode = query.mode;

  return paginate<SafeUser>(
    () => prisma.user.count({where}),
    async (offset, take) => {
      const rows = await prisma.user.findMany({
        where,
        skip: offset,
        take,
        orderBy: {createdAt: "desc"},
      });
      return rows.map(toSafe);
    },
    {page, limit},
  );
}

const getMe = async (userId: string): Promise<SafeUser> => {
  const u = await prisma.user.findUnique({where: {id: userId}});
  if (!u) throw error('User not found', 404);
  return toSafe(u);
}

const updateMe = async (userId: string, body: UpdateMeBody): Promise<SafeUser> => {
  if (typeof body.email === "string" && body.email.trim().length > 0) {
    const exists = await prisma.user.findUnique({where: {email: body.email}});
    if (exists && exists.id !== userId) {
      throw error('Email already in use');
    }
  }

  const u = await prisma.user.update({
    where: {id: userId},
    data: {
      email: body.email ?? undefined,
      name: body.name ?? undefined,
      avatarUrl: body.avatarUrl ?? undefined,
      bio: body.bio ?? undefined,
      timezone: body.timezone ?? undefined,
      locale: body.locale ?? undefined,
    },
  });
  return toSafe(u);
}

const changeMyPassword = async (userId: string, body: ChangePasswordBody): Promise<{ ok: true }> => {
  const u = await prisma.user.findUnique({where: {id: userId}});
  if (!u) throw error('User not found', 404);

  const ok = await comparePassword(body.oldPassword, u.password);
  if (!ok) throw error('Old password is incorrect');

  const newHash = await hashPassword(body.newPassword);
  await prisma.user.update({where: {id: userId}, data: {password: newHash}});
  return {ok: true};
}

const getById = async (id: string): Promise<SafeUser> => {
  const u = await prisma.user.findUnique({where: {id}});
  if (!u) throw error('User not found', 404);
  return toSafe(u);
}


const deleteMe = async (userId: string): Promise<{ id: string }> => {
  await prisma.user.delete({where: {id: userId}});
  return {id: userId};
}

export default {
  listUsers,
  getMe,
  updateMe,
  changeMyPassword,
  getById,
  deleteMe,
};