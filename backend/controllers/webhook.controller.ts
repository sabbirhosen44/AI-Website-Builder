import { Request, Response } from "express";
import { stripe } from "../config/stripe.config.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { handlePaymentSuccess } from "../services/stripe.service.js";
import ErrorResponse from "../utils/errorResponse.js";

export const handleStripeWebhook = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("🔔 Webhook received at:", new Date().toISOString());
    const sig = req.headers["stripe-signature"] as string;

    if (!sig) {
      console.error("❌ No signature found in headers");
      throw new ErrorResponse("No signature found", 400);
    }

    console.log("✅ Signature found");

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
      console.log("✅ Webhook verified, event type:", event.type);
    } catch (err: any) {
      console.error("❌ Webhook verification failed:", err.message);
      throw new ErrorResponse(`Webhook Error: ${err.message}`, 400);
    }

    if (event.type === "checkout.session.completed") {
      console.log("💳 Processing checkout.session.completed");
      console.log(
        "📦 Session data:",
        JSON.stringify(event.data.object.metadata),
      );
      await handlePaymentSuccess(event.data.object);
      console.log("✅ Payment processed successfully");
    }

    res.status(200).json({ success: true, received: true });
  },
);
