import "dotenv/config";
import Stripe from "stripe";
import ErrorResponse from "../utils/errorResponse.js";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new ErrorResponse("Stripe configuration error", 500);
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-01-28.clover",
});
