import {
  ChartSplineIcon,
  LayoutPanelTopIcon,
  NotebookPenIcon,
} from "lucide-react";

interface Feature {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export default function FeaturesSection() {
  const features: Feature[] = [
    {
      icon: LayoutPanelTopIcon,
      title: "AI Layout Generator",
      description:
        "Automatically creates a complete website layout from a single prompt.",
    },
    {
      icon: NotebookPenIcon,
      title: "AI Content Writer",
      description:
        "Generates high-quality headlines, text, and call-to-actions instantly.",
    },
    {
      icon: ChartSplineIcon,
      title: "Performance Optimization",
      description:
        "Ensures fast load speed, clean code, and high PageSpeed scores.",
    },
  ];

  return (
    <section className="py-16 px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900  relative md:px-0">
      {/* Gradient orbs */}

      <div
        id="features"
        className="relative z-10 grid border rounded-xl max-w-6xl mx-auto border-white/10 bg-white/5 backdrop-blur-xl grid-cols-1 divide-y divide-white/10 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
      >
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-4 hover:bg-white/10 transition duration-300 p-8 pb-14 group"
          >
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <item.icon className="size-5 text-white" />
              </div>
              <h2 className="font-semibold text-lg">{item.title}</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-72">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
