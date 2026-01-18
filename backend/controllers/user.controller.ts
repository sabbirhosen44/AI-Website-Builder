import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  processProjectGeneration,
  refundCredits,
} from "../services/project.service.js";
import { createProject, getCredits } from "../services/user.service.js";
import ErrorResponse from "../utils/errorResponse.js";

// Ger User Credits
export const getUserCredits = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      throw new ErrorResponse("Unauthorized", 401);
    }

    const credits = await getCredits(userId);

    res.status(200).json({ success: true, data: { credits } });
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
