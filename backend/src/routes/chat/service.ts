import prisma from '@/prisma';
import {error} from "@/utils/errors.ts";
import {parsePagination, paginate} from '@/utils/pagination';
import {
  ChatVM,
  ChatListQuery,
  ChatListResult,
  ChatCreateBody,
  MessageCreateBody,
} from './types';

const toVM = (c: any): ChatVM => ({
  id: c.id,
  type: c.type,
  title: c.title,
  createdById: c.createdById,
  challengeId: c.challengeId,
  createdAt: c.createdAt,
});

const my = async (
  userId: string,
  query: ChatListQuery,
): Promise<ChatListResult> => {
  const {page, limit} = parsePagination(query);
  const where: any = {members: {some: {userId}}};
  if (query.type) where.type = query.type;

  return paginate<ChatVM>(
    () => prisma.chat.count({where}),
    async (offset, take) =>
      (
        await prisma.chat.findMany({
          where,
          skip: offset,
          take,
          orderBy: {createdAt: 'desc'},
        })
      ).map(toVM),
    {page, limit},
  );
};

const create = async (
  userId: string,
  body: ChatCreateBody,
): Promise<ChatVM> => {
  const chat = await prisma.$transaction(async (tx) => {
    const c = await tx.chat.create({
      data: {
        type: (body.type ?? 'DIRECT') as any,
        title: body.title ?? null,
        createdById: userId,
        challengeId: body.challengeId ?? null,
      },
    });
    const uniqueMemberIds = Array.from(
      new Set([userId, ...(body.memberIds || [])]),
    );
    await tx.chatMember.createMany({
      data: uniqueMemberIds.map((uid) => ({chatId: c.id, userId: uid})),
    });
    return c;
  });
  return toVM(chat);
};

const send = async (userId: string, body: MessageCreateBody) => {
  const member = await prisma.chatMember.findUnique({
    where: {chatId_userId: {chatId: body.chatId, userId}},
  });
  if (!member) throw error('Not a member', 404)
  const m = await prisma.message.create({
    data: {
      chatId: body.chatId,
      senderId: userId,
      type: (body.type ?? 'TEXT') as any,
      content: body.content,
      meta: body.meta as any,
    },
  });
  return m;
};

const messages = async (
  userId: string,
  chatId: string,
  page = 1,
  limit = 50,
) => {
  const member = await prisma.chatMember.findUnique({
    where: {chatId_userId: {chatId, userId}},
  });
  if (!member) throw error('Not a member',  403);

  const p = Math.max(1, Number(page || 1));
  const l = Math.max(1, Math.min(100, Number(limit || 50)));
  const offset = (p - 1) * l;

  const [items, total] = await Promise.all([
    prisma.message.findMany({
      where: {chatId},
      orderBy: {createdAt: 'desc'},
      skip: offset,
      take: l,
    }),
    prisma.message.count({where: {chatId}}),
  ]);

  return {
    items,
    meta: {
      page: p,
      limit: l,
      totalItems: total,
      totalPages: Math.max(1, Math.ceil(total / l)),
      offset,
      hasNext: offset + l < total,
      hasPrev: p > 1,
    },
  };
};

export default {my, create, send, messages};
