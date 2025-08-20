import {Request, Response} from 'express';
import eh from 'express-async-handler';
import {fail, ok} from '@/utils/response';
import svc from './service';
import {
  QnaListQuery,
  QnaQuestionCreateBody,
  QnaAnswerCreateBody,
} from './types';

type ReqList = Request<unknown, unknown, unknown, QnaListQuery>;
type ReqAsk = Request<unknown, unknown, QnaQuestionCreateBody>;
type ReqAnswer = Request<unknown, unknown, QnaAnswerCreateBody>;

const list = eh(async (req: ReqList, res: Response) => {
  try {
    const r = await svc.list(req.query);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const ask = eh(async (req: ReqAsk, res: Response) => {
  try {
    const r = await svc.ask(req.user!.userId, req.body);
    ok(res, r, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const answer = eh(async (req: ReqAnswer, res: Response) => {
  try {
    const r = await svc.answer(req.user!.userId, req.body);
    ok(res, r, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

export default {list, ask, answer};
