import prisma from "../lib/prisma.js";
import ErrorResponse from "../utils/errorResponse.js";
import {
  enhancePrompt,
  enhanceUpdateRequest,
  generateUpdatedCode,
  generateWebsiteCode,
} from "./ai.service.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { NextFunction } from "express";

export const validateProjectForUpdate = async (
  userId: string,
  projectId: string,
) => {
  const project = await prisma.websiteProject.findFirst({
    where: {
      id: projectId,
      userId: userId,
    },
    select: {
      id: true,
      current_code: true,
    },
  });

  if (!project) {
    throw new ErrorResponse("Project not found", 404);
  }

  if (!project.current_code) {
    throw new ErrorResponse(
      "Project has no code yet. Please wait for initial generation to complete.",
      400,
    );
  }

  return project;
};

export const saveUserMessage = async (projectId: string, message: string) => {
  await prisma.conversation.create({
    data: {
      role: "user",
      content: message,
      projectId,
    },
  });
};

export const processProjectGeneration = async (
  projectId: string,
  initialPrompt: string,
) => {
  const enhancedPrompt = await enhancePrompt(initialPrompt);
  console.log(enhancedPrompt);

  await prisma.conversation.create({
    data: {
      role: "assistant",
      content: `I've enhanced your prompt to: ${enhancedPrompt}`,
      projectId,
    },
  });

  await prisma.conversation.create({
    data: {
      role: "assistant",
      content: "Now generating your website...",
      projectId,
    },
  });

  const code = await generateWebsiteCode(enhancedPrompt);

  if (!code) {
    await prisma.conversation.create({
      data: {
        role: "assistant",
        content:
          "I wasn’t able to generate the code this time. Please try again.",
        projectId,
      },
    });
  }
  console.log(code);

  const version = await prisma.version.create({
    data: {
      code,
      description: "Initial version",
      projectId,
    },
  });

  await prisma.conversation.create({
    data: {
      role: "assistant",
      content:
        "I've created your website! You can preview it and request any changes",
      projectId,
    },
  });

  await prisma.websiteProject.update({
    where: { id: projectId },
    data: {
      current_code: code,
      current_version_index: version.id,
    },
  });

  return { code, version };
};

export const processProjectUpdate = async (
  projectId: string,
  userMessage: string,
  currentCode: string | null,
) => {
  const enhancedRequest = await enhanceUpdateRequest(userMessage);
  console.log(enhancedRequest);

  await prisma.conversation.create({
    data: {
      role: "assistant",
      content: `I've enhanced your prompt to: "${enhancedRequest}"`,
      projectId,
    },
  });

  await prisma.conversation.create({
    data: {
      role: "assistant",
      content: "Now updating your website...",
      projectId,
    },
  });

  const updatedCode = await generateUpdatedCode(
    currentCode || "",
    enhancedRequest,
  );

  if (!updatedCode) {
    await prisma.conversation.create({
      data: {
        role: "assistant",
        content:
          "I wasn’t able to generate the code this time. Please try again.",
        projectId,
      },
    });
  }

  console.log(updatedCode);

  const version = await prisma.version.create({
    data: {
      code: updatedCode,
      description: "Updated based on user feedback",
      projectId,
    },
  });

  await prisma.conversation.create({
    data: {
      role: "assistant",
      content: "I've updated your website! You can now preview it",
      projectId,
    },
  });

  await prisma.websiteProject.update({
    where: { id: projectId },
    data: {
      current_code: updatedCode,
      current_version_index: version.id,
    },
  });

  return { code: updatedCode, version };
};

export const rollbackProjectToVersion = async (
  projectId: string,
  versionId: string,
  userId: string,
) => {
  const version = await prisma.version.findUnique({
    where: { id: versionId },
    include: { project: true },
  });

  if (!version) {
    throw new ErrorResponse("Version not found", 404);
  }

  if (version.project.userId !== userId) {
    throw new ErrorResponse("Not authorized to access this project", 403);
  }

  if (version.projectId !== projectId) {
    throw new ErrorResponse("Version does not belong to this project", 400);
  }

  const updatedProject = await prisma.websiteProject.update({
    where: { id: projectId, userId },
    data: {
      current_code: version.code,
      current_version_index: version.id,
    },
  });

  await prisma.conversation.create({
    data: {
      role: "assistant",
      content:
        "I've rolled back your website to selected version. you can now preview it.",
      projectId,
    },
  });

  return updatedProject;
};

export const deleteProjectService = async (
  userId: string,
  projectId: string,
) => {
  const project = await prisma.websiteProject.findFirst({
    where: { id: projectId, userId },
  });

  if (!project) {
    throw new ErrorResponse("Project not found", 404);
  }

  await prisma.websiteProject.delete({
    where: { id: projectId, userId },
  });

  return { deleted: true };
};

export const getProjectPreviewCode = async (
  projectId: string,
  userId: string,
) => {
  const project = await prisma.websiteProject.findFirst({
    where: { id: projectId, userId },
    include: {
      versions: true,
    },
  });

  if (!project) {
    throw new ErrorResponse("Project not found", 404);
  }

  return project;
};

export const getAllPublishedProjects = async () => {
  const projects = await prisma.websiteProject.findMany({
    where: { isPublished: true, current_code: { not: null } },
    include: { user: true },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return projects;
};

export const getProjectDetails = async (projectId: string) => {
  const project = await prisma.websiteProject.findFirst({
    where: { id: projectId },
  });

  if (!project || !project?.current_code || project.isPublished === false) {
    throw new ErrorResponse("Project not found", 404);
  }

  return project;
};

export const saveProjectVersion = async (
  userId: string,
  projectId: string,
  code: string,
) => {
  const project = await prisma.websiteProject.findUnique({
    where: { id: projectId, userId },
  });

  if (!project) {
    throw new ErrorResponse("Project not found", 404);
  }

  const updatedProject = await prisma.websiteProject.update({
    where: { id: projectId },
    data: {
      current_code: code,
      current_version_index: "",
      updatedAt: new Date(),
    },
  });

  return updatedProject;
};
