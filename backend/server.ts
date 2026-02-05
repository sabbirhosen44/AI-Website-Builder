import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { handleStripeWebhook } from "./controllers/webhook.controller.js";
import { auth } from "./lib/auth.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import projectRoutes from "./routes/project.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

const corsOption = {
  origin: process.env.CLIENT_URL?.split(",") || [],
  credentials: true,
};
app.use(cors(corsOption));

app.post(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  handleStripeWebhook,
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.all("/api/auth/{*any}", toNodeHandler(auth));
app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
