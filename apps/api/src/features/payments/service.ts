import type {
  PageResult,
  PaymentCreateBody,
  PaymentListQuery,
  PaymentUpdateStatusBody,
} from "@repo/types";
import prisma from "@/prisma";
import { error } from "@/shared/utils/errors";
import { paginate } from "@/shared/utils/pagination";
import { type PaymentItem, toPaymentItem } from "./mapper";

const list = async (
  q: PaymentListQuery,
  actorId: string,
  actorIsAdmin: boolean
): Promise<PageResult<PaymentItem>> => {
  const where: any = {};
  if (actorIsAdmin) {
    if (q.userId) where.userId = q.userId;
  } else {
    where.userId = actorId;
  }
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

const get = async (
  id: string,
  actorId: string,
  actorIsAdmin: boolean
): Promise<PaymentItem> => {
  const row = await prisma.payment.findUnique({ where: { id } });
  if (!row) throw error("Payment not found", 404);
  if (!actorIsAdmin && row.userId !== actorId) throw error("Forbidden", 403);
  return toPaymentItem(row);
};

const create = async (userId: string, body: PaymentCreateBody) => {
  if (!body.sessionId && !body.subscriptionId) {
    throw error("Payment must reference sessionId or subscriptionId", 400);
  }
  if (body.sessionId && body.subscriptionId) {
    throw error("Only one of sessionId or subscriptionId is allowed", 400);
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

const updateStatus = async (
  id: string,
  _actorId: string,
  body: PaymentUpdateStatusBody,
  actorIsAdmin: boolean
) => {
  const exists = await prisma.payment.findUnique({ where: { id } });
  if (!exists) throw error("Payment not found", 404);
  if (!actorIsAdmin) throw error("Forbidden", 403);

  const row = await prisma.payment.update({
    where: { id },
    data: { status: body.status, meta: body.meta ?? undefined },
  });
  return toPaymentItem(row);
};

export default { list, get, create, updateStatus };
