import prisma from "../lib/prisma.js";
import ErrorResponse from "../utils/errorResponse.util.js";

export const getCredits = async (userId: string): Promise<number> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }

  if (user.credits === null || user.credits === undefined) {
    throw new ErrorResponse("Credits not available for user", 400);
  }

  return user.credits;
};
