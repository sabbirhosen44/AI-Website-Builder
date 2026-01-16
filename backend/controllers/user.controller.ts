import { Request, Response } from "express";
import { getCredits } from "../services/user.service.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import ErrorResponse from "../utils/errorResponse.util.js";

// Ger User Credits
export const getUserCredits = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      throw new ErrorResponse("Unauthorized", 401);
    }

    const credits = await getCredits(userId);

    res.status(200).json({ success: true, data: { credits } });
  }
);

// Create New Project
