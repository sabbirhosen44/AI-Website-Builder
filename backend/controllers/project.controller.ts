import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  processProjectUpdate,
  saveUserMessage,
  validateProjectForUpdate,
} from "../services/project.service.js";
import {
  checkUserCredits,
  deductCredits,
  refundCredits,
} from "../services/user.service.js";
import ErrorResponse from "../utils/errorResponse.js";

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
