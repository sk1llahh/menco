import { z } from "zod";

export const ChatListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().max(100).default(20),
  type: z.enum(["DIRECT", "GROUP"]).optional(),
});

export const ChatCreateSchema = z.object({
  type: z.enum(["DIRECT", "GROUP"]).default("DIRECT"),
  title: z.string().optional(),
  memberIds: z.array(z.string()).optional(),
});

export const ChatIdParamsSchema = z.object({ id: z.string().min(1) });

export const MessageCreateSchema = z.object({
  content: z.string().min(1),
  type: z.enum(["TEXT", "IMAGE", "FILE", "SYSTEM"]).default("TEXT"),
});

export const AddMemberSchema = z.object({
  userId: z.string(),
  role: z.enum(["OWNER", "MEMBER"]).default("MEMBER"),
});

export type ChatListQuery = z.infer<typeof ChatListQuerySchema>;
export type ChatCreateBody = z.infer<typeof ChatCreateSchema>;
export type MessageCreateBody = z.infer<typeof MessageCreateSchema>;
export type AddMemberBody = z.infer<typeof AddMemberSchema>;
export type ChatIdParams = z.infer<typeof ChatIdParamsSchema>;
