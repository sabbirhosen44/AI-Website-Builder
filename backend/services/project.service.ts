import prisma from "../lib/prisma.js";
import { enhancePrompt, generateWebsiteCode } from "./ai.service.js";

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

export const refundCredits = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { credits: { increment: 5 }, totalCreation: { decrement: 1 } },
  });
};
