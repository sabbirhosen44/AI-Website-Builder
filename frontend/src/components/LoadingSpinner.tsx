const LoadingSpinner = () => {
  return (
    <div className="flex mt-8 justify-center min-h-screen w-full">
      <div className="inline-flex items-center flex-col gap-4">
        <svg className="size-0">
          <defs>
            <linearGradient
              id="spinnerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          className="size-10 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="url(#spinnerGradient)"
            strokeWidth="3"
          />
          <path
            fill="url(#spinnerGradient)"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>

        <p className="font-semibold tracking-widest text-white text-sm">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
