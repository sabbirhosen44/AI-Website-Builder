import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { updateProject } from "../controllers/project.controller.js";

const projectRouter = express.Router();

projectRouter.use(protect);
projectRouter.post("/:projectId/update", updateProject);

export default projectRouter;
