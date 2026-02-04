import { Check } from "lucide-react";
import { appPlans } from "@/assets/DummyData";
import { useState } from "react";

interface Plan {
  id: string;
  name: string;
  price: string;
  credits: number;
  description: string;
  features: string[];
}

export default function PricingSection() {
  const [plans] = useState<Plan[]>(appPlans);

  const handlePurchase = async () => {};

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute top-20 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-40 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
          Choose{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Plan
          </span>
        </h1>

        <p className="text-center text-base sm:text-lg text-gray-400 max-w-2xl mt-2 px-4">
          Start learning today with flexible pricing options that grow with your
          journey
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 sm:mt-16 w-full">
          {plans.map((plan) => {
            const isPro = plan.id === "pro";

            return (
              <div
                key={plan.id}
                className={`w-full sm:w-80 rounded-xl p-4 sm:p-6 cursor-pointer backdrop-blur-xl transition-all duration-300 ${
                  isPro
                    ? "bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20 transform hover:scale-105"
                    : "bg-white/5 border border-white/10 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10"
                }`}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-xs font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="space-y-6 mt-2">
                  <div>
                    <p
                      className={`font-semibold text-sm ${
                        isPro ? "text-purple-300" : "text-gray-400"
                      }`}
                    >
                      {plan.name}
                    </p>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-4xl sm:text-5xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-500 text-sm">
                        /{plan.credits} credits
                      </span>
                    </div>

                    <p className="text-white mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-3 text-sm ${
                          isPro ? "text-white" : "text-gray-300"
                        }`}
                      >
                        <Check
                          className={`size-5 flex-shrink-0 mt-0.5 ${
                            isPro ? "text-purple-300" : "text-purple-400"
                          }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      handlePurchase();
                    }}
                    className={`w-full py-2.5 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                      isPro
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25"
                        : "bg-white/10 hover:bg-white/20 border border-white/10 text-white"
                    }`}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-gray-500 text-sm text-center mt-12 px-4">
          Project Creation / Revision consume 5 credits . You can purchase more
          credits to create more projects.
        </p>
      </div>
    </section>
  );
}
