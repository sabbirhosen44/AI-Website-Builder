import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  deleteProjectService,
  getAllPublishedProjects,
  getProjectDetails,
  getProjectPreviewCode,
  processProjectUpdate,
  rollbackProjectToVersion,
  saveProjectVersion,
  saveUserMessage,
  validateProjectForUpdate,
} from "../services/project.service.js";
import {
  checkUserCredits,
  deductCredits,
  refundCredits,
} from "../services/user.service.js";
import ErrorResponse from "../utils/errorResponse.js";

// Update Project
export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const { projectId } = req.params;
    const { message } = req.body;

    if (!userId) {
      throw new ErrorResponse("Unauthorized", 401);
    }

    if (!projectId) {
      throw new ErrorResponse("Project ID is required", 400);
    }

    if (!message || message.trim() === "") {
      throw new ErrorResponse("Please enter a valid prompt", 400);
    }

    await checkUserCredits(userId);

    const project = await validateProjectForUpdate(userId, projectId);

    await saveUserMessage(projectId, message);

    await deductCredits(userId);

    res.status(200).json({
      success: true,
      message: "Your website is being updated...",
    });

    processProjectUpdate(projectId, message, project.current_code).catch(
      async (error) => {
        await refundCredits(userId);
      },
    );
  },
);

// Rollback To Specific Version
export const rollbackToVersion = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { projectId, versionId } = req.params;

    if (!userId) {
      throw new ErrorResponse("Unauthorized", 401);
    }

    if (!projectId) {
      throw new ErrorResponse("Project ID is required", 400);
    }

    if (!versionId) {
      throw new ErrorResponse("Version ID is required", 400);
    }

    const project = await rollbackProjectToVersion(
      projectId,
      versionId,
      userId,
    );

    res.status(200).json({
      success: true,
      message: "Project rolled back successfully",
      data: project,
    });
  },
);

// Delete Project
export const deleteProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { projectId } = req.params;

    if (!userId) {
      throw new ErrorResponse("Unauthorized", 401);
    }

    if (!projectId) {
      throw new ErrorResponse("Project ID is required", 400);
    }

    await deleteProjectService(userId, projectId);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  },
);

// Get Project Code For Preview
export const getProjectPreview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { projectId } = req.params;

    if (!userId) {
      throw new ErrorResponse("Unauthorized", 401);
    }

    if (!projectId) {
      throw new ErrorResponse("Project ID is required", 400);
    }

    const projectCode = await getProjectPreviewCode(projectId, userId);

    res.status(200).json({
      success: true,
      data: projectCode,
    });
  },
);

// Get Published Projects
export const getPublishedProjects = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const projects = await getAllPublishedProjects();

    res.status(200).json({
      success: true,
      data: projects,
    });
  },
);

// Get Single Project By ID
export const getProjectById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.params;

    if (!projectId) {
      throw new ErrorResponse("Project ID is required", 400);
    }

    const project = await getProjectDetails(projectId);

    res.status(200).json({
      success: true,
      data: project,
    });
  },
);

// Save Project
export const saveProjectCode = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { projectId } = req.params;
    const { code } = req.body;

    if (!userId) {
      throw new ErrorResponse("Unauthorized", 401);
    }

    if (!projectId) {
      throw new ErrorResponse("Project ID is required", 400);
    }

    if (!code) {
      throw new ErrorResponse("Code is required", 400);
    }

    const savedProject = await saveProjectVersion(userId, projectId, code);

    res.status(200).json({
      success: true,
      message: "Project saved successfully",
      data: savedProject,
    });
  },
);
