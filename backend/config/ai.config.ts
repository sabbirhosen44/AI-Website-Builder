export const AI_CONFIG = {
  PRIMARY_MODEL: "google/gemini-2.0-flash-exp:free",
  FALLBACK_MODELS: [
    "meta-llama/llama-3.3-70b-instruct:free",
    "z-ai/glm-4.5-air:free",
    "qwen/qwen3-coder:free",
  ],
} as const;
