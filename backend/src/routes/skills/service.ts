import prisma from "@/prisma";
import {SkillCreateBody} from "./types";

const list = async () => {
  return prisma.skill.findMany({orderBy: {name: "asc"}});
};

const create = async (body: SkillCreateBody) => {
  const s = await prisma.skill.create({data: {name: body.name, slug: body.slug}});
  return s;
};

export default {list, create};