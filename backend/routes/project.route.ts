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

const projectRouter = express.Router();

projectRouter.use(protect);
projectRouter.post("/:projectId/update", updateProject);
projectRouter.patch(
  "/:projectId/versions/:versionId/rollback",
  rollbackToVersion,
);
projectRouter.delete("/delete", deleteProject);
projectRouter.get("/:projectId/preview", getProjectPreview);
projectRouter.get("/published", getPublishedProjects);
projectRouter.get("/:projectId", getProjectById);
projectRouter.post("/:projectId/save", protect, saveProjectCode);

export default projectRouter;
