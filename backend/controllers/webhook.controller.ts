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
      console.log("Processing checkout.session.completed");
      console.log(
        "Session metadata:",
        JSON.stringify(event.data.object.metadata),
      );

      try {
        await handlePaymentSuccess(event.data.object);
        console.log("Payment processed successfully");
      } catch (error: any) {
        console.error("Error in handlePaymentSuccess:", error.message);
        throw error;
      }
    } else if (event.type === "payment_intent.succeeded") {
      console.log("Processing payment_intent.succeeded");

      try {
        const paymentIntent = event.data.object as any;
        console.log("Payment Intent ID:", paymentIntent.id);

        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
          limit: 1,
        });

        if (sessions.data.length > 0) {
          const session = sessions.data[0];
          console.log("Found session:", session.id);
          console.log("Session metadata:", JSON.stringify(session.metadata));

          await handlePaymentSuccess(session);
          console.log("Payment processed successfully via payment_intent");
        } else {
          console.error(
            "No session found for payment intent:",
            paymentIntent.id,
          );
        }
      } catch (error: any) {
        console.error(
          "Error processing payment_intent.succeeded:",
          error.message,
        );
        throw error;
      }
    } else {
      console.log("Ignoring event type:", event.type);
    }

    res.status(200).json({ success: true, received: true });
  },
);
