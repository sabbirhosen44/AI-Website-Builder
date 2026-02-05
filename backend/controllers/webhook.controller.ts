import { Request, Response } from "express";
import { stripe } from "../config/stripe.config.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { handlePaymentSuccess } from "../services/stripe.service.js";
import ErrorResponse from "../utils/errorResponse.js";

export const handleStripeWebhook = asyncHandler(
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;

    if (!sig) {
      throw new ErrorResponse("No signature found", 400);
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (err: any) {
      throw new ErrorResponse(`Webhook Error: ${err.message}`, 400);
    }

    if (event.type === "checkout.session.completed") {
      await handlePaymentSuccess(event.data.object);
    }

    res.status(200).json({ success: true, received: true });
  },
);
