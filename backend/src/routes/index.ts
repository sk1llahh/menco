import { Router } from "express";
import authRoutes from "./auth/route";
import challengeRoutes from "./challenge/route";
import chatRoutes from "./chat/route";
import mentorRoutes from "./mentor/route";
import notificationRoutes from "./notifications/route";
import paymentRoutes from "./payment/route";
import qnaRoutes from "./qna/route";
import sessionRoutes from "./session/route";
import skillRoutes from "./skills/route";
import subscriptionRoutes from "./subscriptions/route";
import userRoutes from "./user/route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/challenges", challengeRoutes);
router.use("/qna", qnaRoutes);
router.use("/chats", chatRoutes);
router.use("/mentors", mentorRoutes);
router.use("/sessions", sessionRoutes);
router.use("/payments", paymentRoutes);
router.use("/subscriptions", subscriptionRoutes);
router.use("/notifications", notificationRoutes);
router.use("/skills", skillRoutes);

export default router;