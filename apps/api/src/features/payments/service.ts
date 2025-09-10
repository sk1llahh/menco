import type { PageResult } from "@repo/types";
import prisma from "@/prisma";
import { error } from "@/shared/utils/errors";
import { paginate } from "@/shared/utils/pagination";
import { type PaymentItem, toPaymentItem } from "./mapper";
import type {
  PaymentCreateBody,
  PaymentListQuery,
  PaymentUpdateStatusBody,
} from "@repo/types";

const list = async (q: PaymentListQuery): Promise<PageResult<PaymentItem>> => {
  const where: any = {};
  if (q.userId) where.userId = q.userId;
  if (q.status) where.status = q.status;
  if (q.purpose) where.purpose = q.purpose;

  return paginate<PaymentItem>(
    () => prisma.payment.count({ where }),
    async (offset, limit) => {
      const rows = await prisma.payment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });
      return rows.map(toPaymentItem);
    },
    { page: q.page, limit: q.limit }
  );
};

const get = async (id: string): Promise<PaymentItem> => {
  const row = await prisma.payment.findUnique({ where: { id } });
  if (!row) throw error("Payment not found", 404);
  return toPaymentItem(row);
};

const create = async (userId: string, body: PaymentCreateBody) => {
  if (!body.sessionId && !body.subscriptionId) {
    // можно платить и просто за что-то иное, но лучше связать
  }
  const row = await prisma.payment.create({
    data: {
      userId,
      amount: body.amount as any,
      currency: body.currency,
      status: "PENDING",
      purpose: body.purpose,
      sessionId: body.sessionId,
      subscriptionId: body.subscriptionId,
      meta: body.meta,
    } as any,
  });
  return toPaymentItem(row);
};

const updateStatus = async (id: string, body: PaymentUpdateStatusBody) => {
  const exists = await prisma.payment.findUnique({ where: { id } });
  if (!exists) throw error("Payment not found", 404);

  const row = await prisma.payment.update({
    where: { id },
    data: { status: body.status, meta: body.meta ?? undefined },
  });
  return toPaymentItem(row);
};

export default { list, get, create, updateStatus };
