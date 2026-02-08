interface AIBuildingLoaderProps {
  message?: string;
  submessage?: string;
}

export default function AIBuildingLoader({
  message = "Building your website",
  submessage = "AI is crafting your design with precision ✨",
}: AIBuildingLoaderProps) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/95 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-8 px-6">
        <div className="relative">
          <div className="absolute inset-0 h-24 w-24 rounded-2xl bg-purple-500/20 blur-2xl animate-pulse" />

          <div className="relative h-24 w-24 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-2">
              <div
                className="w-2 h-2 rounded-sm bg-purple-500 animate-pulse"
                style={{ animationDelay: "0ms", animationDuration: "1.5s" }}
              />
              <div
                className="w-2 h-2 rounded-sm bg-purple-400 animate-pulse"
                style={{ animationDelay: "200ms", animationDuration: "1.5s" }}
              />
              <div
                className="w-2 h-2 rounded-sm bg-purple-300 animate-pulse"
                style={{ animationDelay: "400ms", animationDuration: "1.5s" }}
              />
              <div
                className="w-2 h-2 rounded-sm bg-purple-400 animate-pulse"
                style={{ animationDelay: "600ms", animationDuration: "1.5s" }}
              />
              <div
                className="w-2 h-2 rounded-sm bg-purple-500 animate-pulse"
                style={{ animationDelay: "800ms", animationDuration: "1.5s" }}
              />
              <div
                className="w-2 h-2 rounded-sm bg-purple-300 animate-pulse"
                style={{ animationDelay: "1000ms", animationDuration: "1.5s" }}
              />
              <div
                className="w-2 h-2 rounded-sm bg-purple-300 animate-pulse"
                style={{ animationDelay: "1200ms", animationDuration: "1.5s" }}
              />
              <div
                className="w-2 h-2 rounded-sm bg-purple-400 animate-pulse"
                style={{ animationDelay: "1400ms", animationDuration: "1.5s" }}
              />
              <div
                className="w-2 h-2 rounded-sm bg-purple-500 animate-pulse"
                style={{ animationDelay: "1600ms", animationDuration: "1.5s" }}
              />
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 max-w-sm">
          <h3 className="text-white text-xl font-semibold tracking-tight">
            {message}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">{submessage}</p>
          <p className="text-gray-500 text-xs mt-3">
            This may take 5-10 minutes
          </p>
        </div>

        <div className="flex gap-2">
          <div
            className="h-2 w-2 rounded-full bg-purple-500 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="h-2 w-2 rounded-full bg-purple-400 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="h-2 w-2 rounded-full bg-purple-300 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Analyzing
          </span>
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            Generating
          </span>
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
            Optimizing
          </span>
        </div>
      </div>
    </div>
  );
}
