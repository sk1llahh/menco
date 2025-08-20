import dayjs from "dayjs";
import prisma from "@/prisma";
import {error} from "@/utils/errors";
import {parsePagination, paginate} from "@/utils/pagination";
import {NotificationsListQuery} from "./types";

const list = async (userId: string, query: NotificationsListQuery) => {
  const {page, limit} = parsePagination(query);
  const where: any = {userId};
  if (query.unread === "true") where.readAt = null;

  return paginate(
    () => prisma.notification.count({where}),
    (offset, take) => prisma.notification.findMany({where, skip: offset, take, orderBy: {createdAt: "desc"}}),
    {page, limit}
  );
};

const markRead = async (userId: string, id: string) => {
  const n = await prisma.notification.findUnique({where: {id}});
  if (!n || n.userId !== userId) throw error('Notification not found', 404);
  const u = await prisma.notification.update({where: {id}, data: {readAt: dayjs().toDate()}});
  return u;
};

export default {list, markRead};