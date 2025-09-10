export type ChatItem = {
  id: string;
  type: string;
  title?: string | null;
  createdAt: Date;
};

export const toChatItem = (c: any): ChatItem => ({
  id: c.id,
  type: c.type,
  title: c.title,
  createdAt: c.createdAt,
});

export type MessageItem = {
  id: string;
  chatId: string;
  senderId?: string | null;
  content: string;
  type: string;
  createdAt: Date;
};

export const toMessageItem = (m: any): MessageItem => ({
  id: m.id,
  chatId: m.chatId,
  senderId: m.senderId,
  content: m.content,
  type: m.type,
  createdAt: m.createdAt,
});

export type ChatMemberItem = {
  chatId: string;
  userId: string;
  role: string;
  joinedAt: Date;
};

export const toChatMemberItem = (cm: any): ChatMemberItem => ({
  chatId: cm.chatId,
  userId: cm.userId,
  role: cm.role,
  joinedAt: cm.joinedAt,
});
