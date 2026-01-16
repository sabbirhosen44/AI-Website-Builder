import prisma from "../lib/prisma.js";

export const getCredits = async (userId: string): Promise<number> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.credits) {
    throw new Error("Credits not available for user");
  }

  return user.credits;
};
