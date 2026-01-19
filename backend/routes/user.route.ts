import express from "express";
import {
  createUserProject,
  getUserCredits,
  getUserProject,
  getUserProjects,
  purchaseCredits,
  togglePublishProject,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.use(protect);
userRouter.get("/credits", getUserCredits);
userRouter.post("/credits/purchase", purchaseCredits);
userRouter.get("/projects", getUserProjects);
userRouter.post("/projects", createUserProject);
userRouter.get("/projects/:projectId", getUserProject);
userRouter.patch("/projects/:projectId/publish", togglePublishProject);

export default userRouter;
