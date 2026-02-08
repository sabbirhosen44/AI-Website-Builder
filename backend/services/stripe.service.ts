import { stripe } from "../config/stripe.config.js";
import { CREDIT_PLANS, PlanId } from "../constants/pricing.js";
import prisma from "../lib/prisma.js";
import ErrorResponse from "../utils/errorResponse.js";

export const createCheckoutSession = async (
  userId: string,
  planId: string,
  origin: string,
) => {
  console.log("🛒 Creating checkout session");
  console.log("👤 User ID:", userId);
  console.log("📦 Plan ID:", planId);
  console.log("🌐 Origin:", origin);
  if (!CREDIT_PLANS[planId as PlanId]) {
    throw new ErrorResponse("Plan not found", 401);
  }

  const plan = CREDIT_PLANS[planId as PlanId];
  console.log("💰 Plan details:", plan);

  const transaction = await prisma.transaction.create({
    data: {
      userId,
      planId,
      amount: plan.amount,
      credits: plan.credits,
      isPaid: false,
    },
  });

  console.log("📝 Transaction created:", transaction.id);

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

  console.log("🔗 Checkout session created:", session.id);
  console.log("🔗 Session URL:", session.url);

  return session;
};

export const handlePaymentSuccess = async (session: any) => {
  console.log("💳 handlePaymentSuccess called");
  console.log("📦 Session metadata:", session.metadata);
  const { transactionId, userId, credits } = session.metadata;

  if (!transactionId || !userId || !credits) {
    console.error("❌ Missing metadata:", { transactionId, userId, credits });
    throw new ErrorResponse("Invalid session metadata", 400);
  }

  console.log(`💰 Updating transaction ${transactionId}`);

  await prisma.transaction.update({
    where: { id: transactionId },
    data: { isPaid: true },
  });

  console.log("✅ Transaction updated:");

  console.log(`👤 Adding ${credits} credits to user ${userId}`);

  await prisma.user.update({
    where: { id: userId },
    data: {
      credits: { increment: parseInt(credits) },
    },
  });

  console.log(`✅ User credits updated. `);
};
