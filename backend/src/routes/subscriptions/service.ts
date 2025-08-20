import dayjs from "dayjs";
import prisma from '@/prisma';
import {error} from "@/utils/errors.ts";
import {SubscribeBody} from './types';

const listPlans = async () => {
  return prisma.plan.findMany({orderBy: {price: 'asc'}});
};

const my = async (userId: string) => {
  return prisma.subscription.findMany({
    where: {userId, isActive: true},
    include: {plan: true},
  });
};

const subscribe = async (userId: string, body: SubscribeBody) => {
  const plan = await prisma.plan.findUnique({where: {id: body.planId}});
  if (!plan) throw error('Plan not found', 404);

  const sub = await prisma.subscription.create({
    data: {
      userId,
      planId: body.planId,
      isActive: true,
      currentPeriodEnd: body.currentPeriodEnd
        ? dayjs(body.currentPeriodEnd).toDate()
        : null,
    },
  });
  return sub;
};

const cancel = async (userId: string, id: string) => {
  const sub = await prisma.subscription.findUnique({where: {id}});
  if (!sub || sub.userId !== userId)
    throw error('Subscription not found', 404);
  const u = await prisma.subscription.update({
    where: {id},
    data: {isActive: false},
  });
  return u;
};

export default {listPlans, my, subscribe, cancel};
