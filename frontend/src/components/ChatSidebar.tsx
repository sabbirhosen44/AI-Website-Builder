import type { Message, Project, Version } from "@/types";
import { ArrowUp, EyeIcon, Loader2Icon, UserIcon, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface ChatSidebarProps {
  isMenuOpen: boolean;
  project: Project;
  setProject: (project: Project) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

const ChatSidebar = ({
  isMenuOpen,
  project,
  setProject,
  isGenerating,
  setIsGenerating,
}: ChatSidebarProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleRollback = async (versionId: string) => {
    // Implement rollback logic
  };

  useEffect(() => {
    console.log(messageRef);
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [project.conversation?.length, project.versions?.length, isGenerating]);

  return (
    <div
      className={`h-full sm:max-w-sm bg-[#1a1d2e] border-r border-gray-800 transition-all ${
        isMenuOpen ? "max-sm:w-0 overflow-hidden" : "w-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Messages container */}
        <div className="flex-1 px-2 py-4 flex flex-col gap-4 scrollbar-hidden overflow-y-auto">
          {[...(project?.conversation || []), ...(project?.versions || [])]
            .sort(
              (a, b) =>
                new Date(a.timestamp).getTime() -
                new Date(b.timestamp).getTime()
            )
            .map((message) => {
              const isMessage = "content" in message;

              if (isMessage) {
                const msg = message as Message;
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3  ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="size-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                        <Zap className="size-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed text-white ${
                        isUser
                          ? "bg-purple-600 rounded-tr-none"
                          : "bg-gray-700/70 rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {isUser && (
                      <div className="size-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <UserIcon className="size-4 text-white" />
                      </div>
                    )}
                  </div>
                );
              } else {
                const version = message as Version;
                return (
                  <div
                    key={version.id}
                    className="w-4/5 mx-auto my-2 p-3 rounded-xl bg-gray-700/70 border border-gray-700/50 text-gray-100 shadow-lg flex flex-col gap-3"
                  >
                    <div className="text-xs font-medium">
                      <div className="text-purple-500 font-semibold">
                        Code Updated
                      </div>
                      <div className="text-gray-400 mt-1">
                        {new Date(version.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      {project.current_version_index === version.id ? (
                        <button className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-700/50 text-gray-300 cursor-default">
                          Current Version
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRollback(version.id)}
                          className="px-3 py-1.5 rounded-md text-xs font-medium bg-pink-600 hover:bg-pink-700 text-white transition-all"
                        >
                          Roll back
                        </button>
                      )}
                      <Link
                        target="_blank"
                        to={`/preview/${project.id}/${version.id}`}
                        className="p-1.5 bg-gray-500/50 hover:bg-purple-600 transition-colors rounded"
                      >
                        <EyeIcon className="size-4 text-gray-300" />
                      </Link>
                    </div>
                  </div>
                );
              }
            })}

          {isGenerating && (
            <div className="flex items-start gap-3 justify-start">
              <div className="size-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                <Zap className="size-4 text-white" />
              </div>
              <div className="flex gap-1.5 items-center py-2">
                <span
                  className="size-2 rounded-full animate-bounce bg-gray-500"
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className="size-2 rounded-full animate-bounce bg-gray-500"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="size-2 rounded-full animate-bounce bg-gray-500"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          )}

          <div ref={messageRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="m-3 relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your website or request changes..."
            rows={3}
            disabled={isGenerating}
            className="w-full bg-gray-800/50 text-white placeholder-gray-500 rounded-xl p-3 pr-12 text-sm resize-none outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700/50 scrollbar-hidden"
          />
          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="absolute bottom-3 right-3 rounded-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-2 transition-all"
          >
            {isGenerating ? (
              <Loader2Icon className="size-5 animate-spin text-white" />
            ) : (
              <ArrowUp className="size-5 text-white" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatSidebar;
