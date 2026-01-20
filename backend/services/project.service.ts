import prisma from "../lib/prisma.js";
import ErrorResponse from "../utils/errorResponse.js";
import {
  enhancePrompt,
  enhanceUpdateRequest,
  generateUpdatedCode,
  generateWebsiteCode,
} from "./ai.service.js";

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
