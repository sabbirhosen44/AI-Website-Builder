import { StarIcon } from "lucide-react";
import Marquee from "react-fast-marquee";

interface Testimonial {
  review: string;
  name: string;
  date: string;
  rating: number;
  image: string;
}

export default function OurTestimonials() {
  const data: Testimonial[] = [
    {
      review:
        "Super clean and easy to use. These Tailwind + React components saved me hours of dev time and countless lines of extra code!",
      name: "Richard Nelson",
      date: "12 Jan 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
      review:
        "The design quality is top-notch. Perfect balance between simplicity and style. Highly recommend for any creative developer!",
      name: "Sophia Martinez",
      date: "15 Mar 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
    {
      review:
        "Absolutely love the reusability of these components. My workflow feels 10x faster now with cleaner and more consistent layouts.",
      name: "Ethan Roberts",
      date: "20 Feb 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    },
    {
      review:
        "Clean, elegant, and efficient. These components are a dream for any modern web developer who values beautiful code.",
      name: "Isabella Kim",
      date: "20 Sep 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    },
    {
      review:
        "I've tried dozens of UI kits, but this one just feels right. Everything works seamlessly and looks incredibly polished.",
      name: "Liam Johnson",
      date: "04 Oct 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    },
    {
      review:
        "Brilliantly structured components with clean, modern styling. Makes development a joy and design updates super quick.",
      name: "Ava Patel",
      date: "01 Nov 2025",
      rating: 5,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-between py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-pink-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs sm:text-sm mb-4 sm:mb-6">
          <span>Testimonials</span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center px-4">
          What Our Users Say
        </h3>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-400 max-w-2xl text-center px-4">
          Join thousands of developers who are building faster and shipping
          better websites with our AI-powered platform.
        </p>

        <div className="w-full mt-12 sm:mt-16 overflow-hidden">
          <Marquee pauseOnHover gradient={false} speed={30}>
            {data.map((item, index) => (
              <TestimonialCard key={index} item={item} />
            ))}
          </Marquee>
        </div>

        <div className="w-full mt-4 sm:mt-6 overflow-hidden">
          <Marquee pauseOnHover gradient={false} direction="right" speed={30}>
            {data.map((item, index) => (
              <TestimonialCard key={index} item={item} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="w-full min-w-[280px] max-w-[320px] sm:min-w-[320px] sm:max-w-[360px] mx-2 sm:mx-3 space-y-3 sm:space-y-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 text-gray-300 hover:bg-white/10 transition-all group">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 sm:gap-1">
          {[...Array(item.rating)].map((_, index) => (
            <StarIcon
              key={index}
              className="size-3.5 sm:size-4 fill-purple-500 text-purple-500 group-hover:fill-pink-500 group-hover:text-pink-500 transition-colors"
            />
          ))}
        </div>
        <p className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
          {item.date}
        </p>
      </div>

      <p className="text-xs sm:text-sm leading-relaxed text-gray-400 line-clamp-4">
        "{item.review}"
      </p>

      <div className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-3">
        <img
          className="size-8 sm:size-10 rounded-full border-2 border-purple-500/30 flex-shrink-0"
          width={40}
          height={40}
          src={item.image}
          alt={item.name}
          loading="lazy"
        />
        <p className="font-semibold text-sm sm:text-base text-white truncate">
          {item.name}
        </p>
      </div>
    </div>
  );
}
