import type { Request, Response, NextFunction } from "express";
import type { z, ZodError } from "zod";
import { fail } from "@/shared/utils/response";

type Schemas = {
  body?: z.ZodType<any>;
  query?: z.ZodType<any>;
  params?: z.ZodType<any>;
};

const shapeIssues = (error: ZodError) =>
  error.issues.map((i) => ({
    path: i.path.join("."),
    message: i.message,
    code: i.code,
  }));

export const validate =
  (schemas: Schemas) => (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        const r = schemas.body.safeParse(req.body);
        if (!r.success) {
          return fail(
            res,
            {
              message: "Validation error",
              details: shapeIssues(r.error),
            },
            422
          );
        }
        req.body = r.data;
      }

      if (schemas.query) {
        const r = schemas.query.safeParse(req.query);
        if (!r.success) {
          return fail(
            res,
            {
              message: "Validation error",
              details: shapeIssues(r.error),
            },
            422
          );
        }
        req.query = r.data as any;
      }

      if (schemas.params) {
        const r = schemas.params.safeParse(req.params);
        if (!r.success) {
          return fail(
            res,
            {
              message: "Validation error",
              details: shapeIssues(r.error),
            },
            422
          );
        }
        req.params = r.data as Record<string, string>;
      }

      next();
    } catch (e) {
      return fail(res, e, 400);
    }
  };
