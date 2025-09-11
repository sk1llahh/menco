import { type Router as ExpressRouter, Router } from "express";
import authRoutes from "./auth/route";
import challengeRoutes from "./challenges/route";
import chatRoutes from "./chats/route";
import enrollmentRoutes from "./enrollments/route";
import mentorRoutes from "./mentors/route";
import notificationRoutes from "./notifications/route";
import paymentRoutes from "./payments/route";
import planRoutes from "./plans/route";
import progressRoutes from "./progress/route";
import qnaRoutes from "./qna/route";
import sessionRoutes from "./sessions/route";
import skillRoutes from "./skills/route";
import subscriptionRoutes from "./subscriptions/route";
import userRoutes from "./users/route";

const r: ExpressRouter = Router();

r.use("/auth", authRoutes);
r.use("/users", userRoutes);
r.use("/mentors", mentorRoutes);
r.use("/skills", skillRoutes);
r.use("/challenges", challengeRoutes);
r.use("/enrollments", enrollmentRoutes);
r.use("/progress", progressRoutes);
r.use("/chats", chatRoutes);
r.use("/qna", qnaRoutes);
r.use("/sessions", sessionRoutes);
r.use("/plans", planRoutes);
r.use("/subscriptions", subscriptionRoutes);
r.use("/payments", paymentRoutes);
r.use("/notifications", notificationRoutes);

export default r;
