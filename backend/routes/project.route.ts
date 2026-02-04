import express from "express";
import {
  deleteProject,
  getProjectById,
  getProjectPreview,
  getPublishedProjects,
  rollbackToVersion,
  saveProjectCode,
  updateProject,
} from "../controllers/project.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { getUserProjects } from "../controllers/user.controller.js";

const projectRouter = express.Router();

// Public Routes
projectRouter.get("/published", getPublishedProjects);

// Protected Routes
projectRouter.use(protect);
projectRouter.get("/", getUserProjects);
projectRouter.post("/:projectId/update", updateProject);
projectRouter.get(
  "/:projectId/versions/:versionId/rollback",
  rollbackToVersion,
);
projectRouter.delete("/:projectId", deleteProject);
projectRouter.get("/:projectId/preview", getProjectPreview);
projectRouter.put("/:projectId/save", saveProjectCode);
projectRouter.get("/:projectId", getProjectById);

export default projectRouter;
