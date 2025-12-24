import HandImage from "@/assets/hand.png";

export default function CallToAction() {
  return (
    <section className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-pink-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl text-center bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent px-4">
          Your Website Is Just One Prompt Away
        </h3>
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl text-center px-4">
          Describe your idea in a sentence and our AI handles layout, content,
          and performance automatically in seconds.
        </p>

        <button
          onClick={() => scrollTo({ left: 0, top: 0, behavior: "smooth" })}
          className="mt-6 sm:mt-8 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all px-6 sm:px-8 text-sm sm:text-base py-3 sm:py-3.5 text-white rounded-full font-semibold shadow-xl shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
          >
            <g
              clipPath="url(#a)"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#fff"
            >
              <path d="M8 4a.8.8 0 0 1 .77.58l.866 3.036a4 4 0 0 0 1.018 1.73c.481.48 1.73 1.018 1.73 1.018l3.036.867a.8.8 0 0 1 0 1.538l-3.036.868a4 4 0 0 0-2.748 2.747L8.77 19.42a.8.8 0 0 1-1.538 0l-.867-3.036a4 4 0 0 0-2.748-2.747L.58 12.769a.8.8 0 0 1 0-1.538l3.036-.867a4 4 0 0 0 2.748-2.748L7.23 4.58A.8.8 0 0 1 8 4m8-4a.4.4 0 0 1 .385.29l.433 1.518a2 2 0 0 0 .51.865c.24.24.864.509.864.509l1.518.434a.4.4 0 0 1 0 .769l-1.518.433a2 2 0 0 0-1.374 1.374l-.433 1.518a.4.4 0 0 1-.77 0l-.433-1.518a2 2 0 0 0-1.374-1.374l-1.518-.433a.4.4 0 0 1 0-.77l1.518-.433a2 2 0 0 0 1.374-1.374L15.615.29A.4.4 0 0 1 16 0" />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h20v20H0z" />
              </clipPath>
            </defs>
          </svg>
          <span className="whitespace-nowrap">Generate My Website</span>
        </button>

        <div className="relative mt-12 sm:mt-16 md:mt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 sm:opacity-30 scale-150"></div>
          <img
            src={HandImage}
            alt="Hand pointing"
            width={200}
            height={200}
            className="w-32 sm:w-36 md:w-40 relative z-10"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
