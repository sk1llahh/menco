import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { notFound, errorHandler } from "@/middlewares/error.middleware";
import apiRoutes from "@/routes";
import { CONFIG } from "@/utils/config";

const app = express();
app.set("trust proxy", 1);

const ALLOWED_ORIGINS = (CONFIG.FRONTEND_URL || "*").split(",").map(s => s.trim());

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes("*") || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(helmet());

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false, limit: "2mb" }));

if (CONFIG.NODE_ENV !== "development") {
  app.use(morgan("dev"));
}

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(CONFIG.PORT, () => {
  console.log(`Server started on port ${CONFIG.PORT}`);
});

export default app;