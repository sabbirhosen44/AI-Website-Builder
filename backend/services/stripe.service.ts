import { stripe } from "../config/stripe.config.js";
import { CREDIT_PLANS, PlanId } from "../constants/pricing.js";
import prisma from "../lib/prisma.js";
import ErrorResponse from "../utils/errorResponse.js";

export const createCheckoutSession = async (
  userId: string,
  planId: string,
  origin: string,
) => {
  if (!CREDIT_PLANS[planId as PlanId]) {
    throw new ErrorResponse("Plan not found", 401);
  }

  const plan = CREDIT_PLANS[planId as PlanId];

  const transaction = await prisma.transaction.create({
    data: {
      userId,
      planId,
      amount: plan.amount,
      credits: plan.credits,
      isPaid: false,
    },
  });

  const session = await stripe.checkout.sessions.create({
    success_url: `${origin}/pricing?payment=success`,
    cancel_url: `${origin}/pricing?payment=cancelled`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `AiWebsiteBuilder - ${plan.credits} credits`,
          },
          unit_amount: Math.floor(plan.amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      transactionId: transaction.id,
      userId,
      credits: plan.credits.toString(),
      appId: "ai-website-builder",
    },
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
  });

  return session;
};

export const handlePaymentSuccess = async (session: any) => {
  const { transactionId, userId, credits } = session.metadata;

  if (!transactionId || !userId || !credits) {
    throw new ErrorResponse("Invalid session metadata", 400);
  }

  await prisma.transaction.update({
    where: { id: transactionId },
    data: { isPaid: true },
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      credits: { increment: parseInt(credits) },
    },
  });
};
