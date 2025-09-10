import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";
import {
  ApplicationCreateSchema,
  ApplicationUpdateSchema,
  AvailabilityIdParamsSchema,
  AvailabilityListQuerySchema,
  AvailabilityUpsertSchema,
  MentorSearchQuerySchema,
  MentorUpdateSchema,
} from "@repo/types";

const r: ExpressRouter = Router();

r.get("/", validate({ query: MentorSearchQuerySchema }), c.search);
r.put("/me", authGuard, validate({ body: MentorUpdateSchema }), c.upsertMe);

// availability
r.get(
  "/me/availability",
  authGuard,
  validate({ query: AvailabilityListQuerySchema }),
  c.availabilityList
);
r.post(
  "/me/availability",
  authGuard,
  validate({ body: AvailabilityUpsertSchema }),
  c.availabilityCreate
);
r.delete(
  "/me/availability/:id",
  authGuard,
  validate({ params: AvailabilityIdParamsSchema }),
  c.availabilityDelete
);

// applications
r.post(
  "/applications",
  authGuard,
  validate({ body: ApplicationCreateSchema }),
  c.apply
);

// admin (по желанию подвяжи отдельный guard/роль)
r.patch(
  "/applications/:id",
  validate({ body: ApplicationUpdateSchema }),
  c.setApplicationStatus
);

export default r as import("express").Router;
