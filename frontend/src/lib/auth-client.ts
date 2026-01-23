import { createAuthClient } from "better-auth/react";

const API_BASE_URL = import.meta.env.VITE_AUTH_URL as string;

export const authClient = createAuthClient({
  baseURL: API_BASE_URL,
});

export const { signIn, signUp, useSession } = authClient;
