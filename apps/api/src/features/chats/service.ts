import type {
  AddMemberBody,
  ChatCreateBody,
  ChatListQuery,
  MessageCreateBody,
} from "@repo/types";
import prisma from "@/prisma";
import { error } from "@/shared/utils/errors";
import { paginate } from "@/shared/utils/pagination";
import { toChatItem, toChatMemberItem, toMessageItem } from "./mapper";

const list = async (userId: string, q: ChatListQuery) =>
  paginate(
    () =>
      prisma.chat.count({
        where: { members: { some: { userId } }, type: q.type },
      }),
    async (offset, limit) => {
      const rows = await prisma.chat.findMany({
        where: { members: { some: { userId } }, type: q.type },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });
      return rows.map(toChatItem);
    },
    { page: q.page, limit: q.limit }
  );

const create = async (userId: string, body: ChatCreateBody) => {
  const chat = await prisma.chat.create({
    data: {
      type: body.type,
      title: body.title,
      createdById: userId,
      members: {
        create: [
          { userId, role: "OWNER" },
          ...(body.memberIds ?? []).map((id) => ({
            userId: id,
            role: "MEMBER",
          })),
        ],
      },
    },
  });
  return toChatItem(chat);
};

const postMessage = async (
  chatId: string,
  senderId: string,
  body: MessageCreateBody
) => {
  const member = await prisma.chatMember.findUnique({
    where: { chatId_userId: { chatId, userId: senderId } },
  });
  if (!member) throw error("Forbidden", 403);
  const msg = await prisma.message.create({
    data: { chatId, senderId, content: body.content, type: body.type },
  });
  return toMessageItem(msg);
};

const addMember = async (
  chatId: string,
  actorId: string,
  body: AddMemberBody
) => {
  const actor = await prisma.chatMember.findUnique({
    where: { chatId_userId: { chatId, userId: actorId } },
  });
  if (!actor || actor.role !== "OWNER") throw error("Forbidden", 403);
  const cm = await prisma.chatMember.create({
    data: { chatId, userId: body.userId, role: body.role },
  });
  return toChatMemberItem(cm);
};

export default { list, create, postMessage, addMember };
