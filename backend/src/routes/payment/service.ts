import prisma from "@/prisma";
import {parsePagination, paginate} from "@/utils/pagination";
import {PaymentsListQuery, PaymentCreateBody} from "./types";

const list = async (userId: string, query: PaymentsListQuery) => {
  const {page, limit} = parsePagination(query);
  const where: any = {userId};
  if (query.status) where.status = query.status as any;
  if (query.purpose) where.purpose = query.purpose;

  return paginate(
    () => prisma.payment.count({where}),
    (offset, take) => prisma.payment.findMany({where, skip: offset, take, orderBy: {createdAt: "desc"}}),
    {page, limit}
  );
};

const create = async (userId: string, body: PaymentCreateBody) => {
  const p = await prisma.payment.create({
    data: {
      userId,
      amount: body.amount,
      currency: (body.currency ?? "KZT") as any,
      status: "PENDING",
      purpose: body.purpose,
      sessionId: body.sessionId ?? null,
      subscriptionId: body.subscriptionId ?? null,
      meta: body.meta as any,
    },
  });
  return p;
};

export default {list, create};