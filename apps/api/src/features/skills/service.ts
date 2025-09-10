import type { PageResult } from "@repo/types";
import prisma from "@/prisma";
import { error } from "@/shared/utils/errors";
import { paginate } from "@/shared/utils/pagination";
import type { SkillCreateBody, SkillListQuery } from "@repo/types";

type SkillItem = { id: string; name: string; slug: string };

const list = async (q: SkillListQuery): Promise<PageResult<SkillItem>> => {
  const where: any = {};
  if (q.q)
    where.OR = [
      { name: { contains: q.q, mode: "insensitive" } },
      { slug: { contains: q.q, mode: "insensitive" } },
    ];

  return paginate<SkillItem>(
    () => prisma.skill.count({ where }),
    async (offset, limit) => {
      const rows = await prisma.skill.findMany({
        where,
        orderBy: { name: "asc" },
        skip: offset,
        take: limit,
      });
      return rows as SkillItem[];
    },
    { page: q.page, limit: q.limit }
  );
};

const create = async (body: SkillCreateBody) => {
  const slug = body.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const exists = await prisma.skill.findFirst({
    where: { OR: [{ name: body.name }, { slug }] },
  });
  if (exists) throw error("Skill already exists", 409);
  return prisma.skill.create({ data: { name: body.name, slug } });
};

export default { list, create };
