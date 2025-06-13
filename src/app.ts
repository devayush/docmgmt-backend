import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import documentRoutes from "./modules/document/document.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swaggerUtil";
import { apiRateLimiter } from "./middlewares/rateLimitter";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", documentRoutes);
app.use(apiRateLimiter);

// Swagger UI endpoint
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_, res) => {
  res.send("Document Management Backend Running ✅");
});

app.get("/ping", (_, res) => {
  res.send("pong");
});

export default app;