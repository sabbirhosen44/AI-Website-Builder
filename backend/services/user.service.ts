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

export const checkUserCredits = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });

  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }

  if (user.credits < 5) {
    throw new ErrorResponse("Add more credits to make changes", 403);
  }

  return user;
};

export const deductCredits = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      credits: { decrement: 5 },
    },
  });
};

export const refundCredits = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { credits: { increment: 5 }, totalCreation: { decrement: 1 } },
  });
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

export const getSingleProject = async (userId: string, projectId: string) => {
  const project = await prisma.websiteProject.findFirst({
    where: { id: projectId, userId },
    include: {
      conversation: {
        orderBy: { timestamp: "asc" },
      },
      versions: {
        orderBy: { timestamp: "asc" },
      },
    },
  });

  if (!project) {
    throw new ErrorResponse("Project not found", 404);
  }

  return project;
};

export const getAllUserProjects = async (userId: string) => {
  const projects = await prisma.websiteProject.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

  if (!projects) {
    throw new ErrorResponse("Projects are not found", 404);
  }

  return projects;
};

export const toggleProjectPublish = async (
  userId: string,
  projectId: string,
) => {
  const project = await prisma.websiteProject.findFirst({
    where: { id: projectId, userId },
    select: { id: true, isPublished: true },
  });

  if (!project) {
    throw new ErrorResponse("Project not found", 404);
  }

  const updatedProject = await prisma.websiteProject.update({
    where: { id: projectId },
    data: {
      isPublished: !project.isPublished,
    },
  });

  return updatedProject;
};
