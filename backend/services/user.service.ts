import prisma from "../lib/prisma.js";
import ErrorResponse from "../utils/errorResponse.js";

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

export const createProject = async (userId: string, initialPrompt: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true, totalCreation: true },
  });

  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }

  if (user.credits === null || user.credits === undefined) {
    throw new ErrorResponse("Credits not available", 400);
  }

  if (user.credits < 5) {
    throw new ErrorResponse(
      "Insufficient credits. Please purchase more credits to create a project.",
      403,
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const project = await tx.websiteProject.create({
      data: {
        name:
          initialPrompt.length > 50
            ? initialPrompt.substring(0, 47) + "..."
            : initialPrompt,
        initial_prompt: initialPrompt.trim(),
        userId,
      },
    });

    await tx.conversation.create({
      data: {
        role: "user",
        content: initialPrompt.trim(),
        projectId: project.id,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: {
        credits: { decrement: 5 },
        totalCreation: { increment: 1 },
      },
    });

    return project;
  });
  return result;
};
