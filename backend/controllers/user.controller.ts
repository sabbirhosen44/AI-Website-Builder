import { Request, Response } from "express";
import { getCredits } from "../services/user.service.js";

export const getUserCredits = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const credits = await getCredits(userId);
    res.status(200).json({ credits });
  } catch (error: any) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to fetch credits" });
  }
};
