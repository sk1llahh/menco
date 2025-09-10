import { z } from "zod";
export const SkillListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  q: z.string().optional(),
});
export const SkillCreateSchema = z.object({ name: z.string().min(1) });

export type SkillListQuery = z.output<typeof SkillListQuerySchema>;
export type SkillCreateBody = z.output<typeof SkillCreateSchema>;
