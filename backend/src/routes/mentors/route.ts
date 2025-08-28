import { Router } from "express";
import c from "./controller";
import { validate } from "@/middlewares/validate";
import { authGuard } from "@/middlewares/auth";
import {
  ApplicationCreateSchema,
  ApplicationUpdateSchema,
  AvailabilityIdParamsSchema,
  AvailabilityListQuerySchema,
  AvailabilityUpsertSchema,
  MentorSearchQuerySchema,
  MentorUpdateSchema,
} from "./schema";

const r = Router();

r.get("/", validate({ query: MentorSearchQuerySchema }), c.search);
r.put("/me", authGuard, validate({ body: MentorUpdateSchema }), c.upsertMe);

// availability
r.get("/me/availability", authGuard, validate({ query: AvailabilityListQuerySchema }), c.availabilityList);
r.post("/me/availability", authGuard, validate({ body: AvailabilityUpsertSchema }), c.availabilityCreate);
r.delete("/me/availability/:id", authGuard, validate({ params: AvailabilityIdParamsSchema }), c.availabilityDelete);

// applications
r.post("/applications", authGuard, validate({ body: ApplicationCreateSchema }), c.apply);

// admin (по желанию подвяжи отдельный guard/роль)
r.patch("/applications/:id", validate({ body: ApplicationUpdateSchema }), c.setApplicationStatus);

export default r;