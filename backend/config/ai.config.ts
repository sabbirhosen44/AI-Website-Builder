export const AI_CONFIG = {
  PRIMARY_MODEL: "z-ai/glm-4.5-air:free",
  FALLBACK_MODELS: [
    "meta-llama/llama-3.3-70b-instruct:free",
    "google/gemini-2.0-flash-exp:free",
    "qwen/qwen3-coder:free",
  ],
} as const;
