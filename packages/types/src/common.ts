import { z } from "zod";

export const UserModeSchema = z.enum(["LEARNER", "MENTOR", "BOTH"]);
export type UserMode = z.infer<typeof UserModeSchema>;

export const UserStatusSchema = z.enum(["ACTIVE", "BLOCKED"]);
export type UserStatus = z.infer<typeof UserStatusSchema>;
