import { z } from "zod";

export const RegisterSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
  email: z.string().email().optional(),
  name: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  timezone: z.string().optional(),
});

export const LoginSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
});

export const RefreshSchema = z.object({
  refreshToken: z.string().min(20),
});

export type RegisterBody = z.output<typeof RegisterSchema>;
export type LoginBody = z.output<typeof LoginSchema>;
export type RefreshBody = z.output<typeof RefreshSchema>;
