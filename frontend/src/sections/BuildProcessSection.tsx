import { useEffect, useRef, useState } from "react";

type Step = {
  title: string;
  description: string;
};

const leftSteps: Step[] = [
  {
    title: "AI Generates Smart Layouts",
    description:
      "Our AI Layout Generator creates a complete website structure with proper sections, spacing, and layout flow, ensuring a clean, modern, and high-conversion design from the start.",
  },
  {
    title: "Website Is Optimized & Published",
    description:
      "Performance Optimization is applied automatically to improve speed, structure, and responsiveness, so your website is fast, stable, and ready to publish across all devices.",
  },
];

const rightSteps: Step[] = [
  {
    title: "Describe Your Website Idea",
    description:
      "Explain your business type, target audience, and style in a few words. Our system understands your intent and prepares everything needed to build a website that fits your vision.",
  },
  {
    title: "Content Is Written Automatically",
    description:
      "The AI Content Writer generates headlines, section text, and call-to-actions tailored to your website goals, keeping everything clear, engaging, and optimized for user interaction.",
  },
];

export default function BuildProcess() {
  const segmentRefs = useRef<HTMLDivElement[]>([]);
  const [progress, setProgress] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const updated = segmentRefs.current.map((el) => {
        if (!el) return 0;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const start = windowHeight * 0.6;
        const end = windowHeight * 0.2;

        let percent = (start - rect.top) / (start - end);

        percent = Math.min(Math.max(percent, 0), 1);

        return percent;
      });

      setProgress(updated);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="process"
      className="flex flex-col items-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
    >
      {/* Gradient orbs */}
      <div className="absolute top-40 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-40 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-pink-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs sm:text-sm mb-4 sm:mb-6">
          <span>How It Works</span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-3 sm:mb-4 max-w-2xl px-4">
          Build Your Website in Just Four Simple Steps
        </h3>

        <p className="text-sm sm:text-base text-gray-400 text-center max-w-xl mb-12 sm:mb-16 px-4">
          From idea to deployment in minutes with our AI-powered workflow
        </p>

        {/* Mobile View - Stack all steps */}
        <div className="md:hidden w-full space-y-12">
          {/* Step 1 */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/50">
                1
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {rightSteps[0].title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {rightSteps[0].description}
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/50">
                2
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {leftSteps[0].title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {leftSteps[0].description}
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/50">
                3
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {rightSteps[1].title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {rightSteps[1].description}
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/50">
                4
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {leftSteps[1].title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {leftSteps[1].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View - Original Timeline */}
        <div className="hidden md:flex flex-row mt-8 gap-8 lg:gap-16 w-full justify-center">
          <div className="flex-shrink-0">
            {leftSteps.map((step, index) => (
              <div
                key={index}
                className="max-w-md lg:max-w-lg h-60 md:mt-60 px-4"
              >
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center flex-shrink-0">
            <div className="size-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50" />

            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  ref={(el) => {
                    if (el) segmentRefs.current[i] = el;
                  }}
                  data-index={i}
                  className="relative w-0.5 mx-6 lg:mx-10 h-60 bg-white/10 overflow-hidden"
                >
                  <div
                    style={{ height: `${progress[i] * 100}%` }}
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 to-pink-500"
                  />
                </div>
                <div
                  className={`size-4 rounded-full transition-all ${
                    progress[i] > 0.95
                      ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
                      : "bg-white/10"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex-shrink-0">
            {rightSteps.map((step, index) => (
              <div
                key={index}
                className={`max-w-md lg:max-w-lg h-60 px-4 ${
                  index === 0 ? "" : "md:mt-60"
                }`}
              >
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
