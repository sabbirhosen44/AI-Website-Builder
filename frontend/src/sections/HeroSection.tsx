import { useCreateProject } from "@/hooks/useUsers";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Prompt {
  label: string;
  prompt: string;
}

export default function HeroSection() {
  const [prompt, setPrompt] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const createProject = useCreateProject();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login to create a project");
      navigate("/auth/sign-in");
      return;
    }

    if (prompt.trim().length < 10) {
      toast.error("Prompt must be at least 10 characters long");
      return;
    }

    createProject.mutate(
      {
        initialPrompt: prompt.trim(),
      },
      {
        onSuccess: (data) => {
          const projectId = data?.data?.id;

          if (projectId) {
            navigate(`/projects/${projectId}`);
          }

          setPrompt("");
          setSelected(null);
        },
      },
    );
  };

  const placeholders = [
    "portfolio website...",
    "e-commerce store...",
    "business landing page...",
    "personal blog...",
    "startup website...",
  ];

  const prompts: Prompt[] = [
    {
      label: "Portfolio Website",
      prompt:
        "Create a modern portfolio website to showcase my skills, projects, experience, and personal brand professionally",
    },
    {
      label: "E-commerce Website",
      prompt:
        "Build a fast, secure e-commerce website with product listings, cart system, payments, and admin dashboard",
    },
    {
      label: "Blog",
      prompt:
        "Create a clean, SEO-optimized blog website for writing articles, managing content, and growing audience online",
    },
    {
      label: "Landing Page",
      prompt:
        "Design a high-conversion landing page with strong hero section, CTA buttons, and lead capture form",
    },
    {
      label: "Resume Website",
      prompt:
        "Generate a professional resume website with skills, experience, education, projects, and downloadable CV section",
    },
    {
      label: "Personal Website",
      prompt:
        "Create a personal branding website with about section, social links, blogs, and contact form",
    },
    {
      label: "Business Website",
      prompt:
        "Build a professional business website with services, testimonials, pricing section, and customer inquiry form",
    },
    {
      label: "Marketing Website",
      prompt:
        "Create a marketing-focused website optimized for conversions, analytics tracking, funnels, and campaign integrations",
    },
    {
      label: "Educational Website",
      prompt:
        "Build an educational website with courses, student dashboard, lesson pages, progress tracking, and quizzes",
    },
  ];

  useEffect(() => {
    if (prompt) return;

    const currentWord = placeholders[textIndex];

    if (!deleting && charIndex === currentWord.length) {
      setTimeout(() => setDeleting(true), 2000);
      return;
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((prev) => (prev + 1) % placeholders.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (deleting ? -1 : 1));
    }, 50);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, prompt]);

  const animatedPlaceholder = placeholders[textIndex].substring(0, charIndex);

  return (
    <section
      id="home"
      className="min-h-screen w-full flex flex-col items-center pb-8 px-4 sm:px-6 justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative"
    >
      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs sm:text-sm mt-24 sm:mt-32">
          <SparklesIcon className="size-3.5 sm:size-4" />
          <span>Powered by AI</span>
        </div>

        <h1 className="text-center text-3xl/tight sm:text-4xl/tight md:text-5xl/tight lg:text-6xl/tight xl:text-7xl/tight font-bold max-w-4xl mx-2 mt-4 sm:mt-6 text-white px-4">
          Build websites with{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI in seconds
          </span>
        </h1>

        <p className="text-center text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mt-4 sm:mt-6 px-4">
          Turn your ideas into production-ready code. Just describe what you
          want and let AI build it.
        </p>

        <form
          onSubmit={handleSubmit}
          className="focus-within:ring-2 focus-within:ring-purple-500/20 bg-white/5 border border-white/10 rounded-xl max-w-3xl w-full mt-8 sm:mt-10 backdrop-blur-xl mx-4"
        >
          <textarea
            className="w-full resize-none p-3 sm:p-4 bg-transparent outline-none text-white placeholder-gray-500 text-sm sm:text-base"
            placeholder={`Create a ${animatedPlaceholder}`}
            rows={3}
            minLength={10}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            disabled={createProject.isPending}
          />

          <div className="flex items-center justify-end p-3 sm:p-4 pt-0">
            <button
              disabled={createProject.isPending}
              className={`flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all px-4 sm:px-6 py-2 sm:py-2.5 text-white rounded-lg font-medium shadow-lg shadow-purple-500/25 text-sm sm:text-base ${
                createProject.isPending ? "cursor-not-allowed opacity-80" : ""
              }`}
            >
              {createProject.isPending ? (
                <Loader2Icon className="size-4 sm:size-5 animate-spin" />
              ) : (
                <>
                  <SparklesIcon className="size-3.5 sm:size-4" />
                  <span className="hidden sm:inline">Create</span>
                  <span className="sm:hidden">Go</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="w-full max-w-3xl mt-6 px-4 sm:px-0">
          <Marquee speed={30} pauseOnHover className="w-full">
            {prompts.map((item) => {
              const isSelected = selected === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setPrompt(item.prompt);
                    setSelected(item.label);
                  }}
                  className={`px-3 sm:px-4 py-1.5 mx-1.5 sm:mx-2 border rounded-full transition-all text-xs sm:text-sm whitespace-nowrap
                  ${
                    isSelected
                      ? "bg-purple-500/20 text-purple-300 border-purple-500/30 cursor-not-allowed"
                      : "text-gray-400 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white"
                  }
                `}
                >
                  {item.label}
                </button>
              );
            })}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
