import { AI_CONFIG } from "../config/ai.config.js";
import openai from "../config/openai.config.js";
import { AI_PROMPTS } from "../constants/prompts.js";
import ErrorResponse from "../utils/errorResponse.js";

const callAI = async (
  systemPrompt: string,
  userPrompt: string,
): Promise<string> => {
  const models = [AI_CONFIG.PRIMARY_MODEL, ...AI_CONFIG.FALLBACK_MODELS];

  for (let i = 0; i < models.length; i++) {
    const model = models[i];

    try {
      const response = await openai.chat.completions.create({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        if (i > 0) console.log(`Using fallback model: ${model}`);
        return content;
      }
    } catch (err: any) {
      console.warn(`Model ${model} failed: ${err.message || err}`);
    }
  }

  throw new ErrorResponse("All AI models failed to respond", 500);
};

const cleanCode = (code: string): string => {
  return code
    .replace(/```[a-z]*\n?/gi, "")
    .replace(/```$/g, "")
    .trim();
};

export const enhancePrompt = async (initialPrompt: string): Promise<string> => {
  return await callAI(AI_PROMPTS.ENHANCE_PROMPT, initialPrompt);
};

export const generateWebsiteCode = async (
  enhancedPrompt: string,
): Promise<string> => {
  const code = await callAI(AI_PROMPTS.GENERATE_WEBSITE, enhancedPrompt);
  return cleanCode(code);
};

export const enhanceUpdateRequest = async (
  userMessage: string,
): Promise<string> => {
  return await callAI(
    AI_PROMPTS.ENHANCE_UPDATE_REQUEST,
    `User's request: "${userMessage}"`,
  );
};

export const generateUpdatedCode = async (
  currentCode: string,
  enhancedRequest: string,
): Promise<string> => {
  const userPrompt = `Here is the current website code: ${currentCode}
 The user wants this change: "${enhancedRequest}"`;

  const code = await callAI(AI_PROMPTS.UPDATE_WEBSITE, userPrompt);
  return cleanCode(code);
};
