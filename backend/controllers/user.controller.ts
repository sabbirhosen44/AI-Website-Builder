import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { processProjectGeneration } from "../services/project.service.js";
import {
  createProject,
  getAllUserProjects,
  getCredits,
  getSingleProject,
  refundCredits,
  toggleProjectPublish,
} from "../services/user.service.js";
import ErrorResponse from "../utils/errorResponse.js";
import { createCheckoutSession } from "../services/stripe.service.js";

// Get User Credits
export const getUserCredits = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      throw new ErrorResponse("Unauthorized", 401);
    }

    const credits = await getCredits(userId);

    res.status(200).json({ success: true, data: credits });
  },
);

// Create New Project
export const createUserProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    if (!userId) {
      throw new ErrorResponse("Unauthorized", 401);
    }

    const { initialPrompt } = req.body;

    if (!initialPrompt) {
      throw new ErrorResponse("Initial prompt is required", 400);
    }

    if (initialPrompt.trim().length < 10) {
      throw new ErrorResponse(
        "Initial prompt must be at least 10 characters long",
        400,
      );
    }

    const project = await createProject(userId, initialPrompt);

    res.status(201).json({
      success: true,
      message: "Project created successfully. Generating website...",
      data: project,
    });

    processProjectGeneration(project.id, initialPrompt).catch(async (error) => {
      await refundCredits(userId);
    });
  },
);

// Get A Single User Project
export const getUserProject = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const { projectId } = req.params;

    if (!userId) {
      throw new ErrorResponse("Unauthorized", 401);
    }

    if (!projectId) {
      throw new ErrorResponse("Project ID is required", 400);
    }

    const project = await getSingleProject(userId, projectId);

    res.status(200).json({
      success: true,
      data: project,
    });
  },
);

// Get All Users Project
export const getUserProjects = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    if (!userId) {
      throw new ErrorResponse("Unauthorized", 401);
    }

    const projects = await getAllUserProjects(userId);

    res.status(200).json({
      success: true,
      data: projects,
    });
  },
);

// Toggle Project Publish
export const togglePublishProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { projectId } = req.params;

    if (!userId) {
      throw new ErrorResponse("Unauthorized", 401);
    }

    if (!projectId) {
      throw new ErrorResponse("Project ID is required", 400);
    }

    const updatedProject = await toggleProjectPublish(userId, projectId);

    res.status(200).json({
      success: true,
      message: `Project ${updatedProject.isPublished ? "published" : "unpublished"} successfully`,
      data: updatedProject,
    });
  },
);

// Purchase Credits
export const purchaseCredits = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    if (!userId) {
      throw new ErrorResponse("Unauthorized", 401);
    }

    const { planId } = req.body;

    if (!planId) {
      throw new ErrorResponse("Plan ID is required", 400);
    }

    const origin = req.headers.origin as string;

    if (!origin) {
      throw new ErrorResponse("Origin header is required", 400);
    }

    const session = await createCheckoutSession(userId, planId, origin);

    res.status(200).json({
      success: true,
      data: { payment_link: session.url },
    });
  },
);
