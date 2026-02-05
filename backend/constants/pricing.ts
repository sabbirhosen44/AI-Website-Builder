export const CREDIT_PLANS = {
  basic: {
    id: "basic",
    credits: 100,
    amount: 5,
  },
  pro: {
    id: "pro",
    credits: 400,
    amount: 19,
  },
  enterprise: {
    id: "enterprise",
    credits: 1000,
    amount: 49,
  },
} as const;

export type PlanId = keyof typeof CREDIT_PLANS;
