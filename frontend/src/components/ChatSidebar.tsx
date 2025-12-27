import { Send, Sparkles, User, UserIcon, Zap } from "lucide-react";
import type { Project } from "@/types";
import { useState } from "react";
import type { Message } from "@/types";

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
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm here to help you build your website. Describe what you want to create or how you'd like to modify the current design.",
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleSubmit = () => {
    if (!prompt.trim() || isGenerating) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setPrompt("");
    setIsGenerating(true);

    setTimeout(() => {
      const statusMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "status",
        content: "analyzing your request...",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, statusMessage]);

      setTimeout(() => {
        const responseMessage: Message = {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content:
            "I've updated your website based on your request. The changes have been applied to the preview.",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev.slice(0, -1), responseMessage]);
        setIsGenerating(false);
      }, 2000);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={`h-full sm:max-w-sm  bg-gray-900 border-gray-800 transition-all ${
        isMenuOpen ? "max-sm:w-0 overflow-hidden" : "w-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto no-scrollbar  px-3  flex flex-col gap-4">
          {[...project?.conversation, ...project?.versions]
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
                    className={`flex items-start gap-3 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="size-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 ">
                        <Zap className="size-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-2 px-4 rounded-2xl shadow-sm text-sm mt-5 leading-relaxed  text-white ${
                        isUser
                          ? "bg-purple-600 rounded-tr-none"
                          : "bg-gray-800/50 rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {isUser && (
                      <div className="size-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <UserIcon className="size-5 text-white" />
                      </div>
                    )}
                  </div>
                );
              }
            })}
          {/* {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              {message.role === "assistant" && (
                <div className="flex gap-3">
                  <div className="size-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="size-4" />
                  </div>
                  <div className="flex-1 bg-gray-800/50 rounded-lg p-3 text-sm text-gray-300 leading-relaxed">
                    {message.content}
                  </div>
                </div>
              )}

              {message.role === "user" && (
                <div className="flex gap-3 justify-end">
                  <div className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-3 text-sm text-white leading-relaxed max-w-[85%] ml-auto">
                    {message.content}
                  </div>
                  <div className="size-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <User className="size-4" />
                  </div>
                </div>
              )}

              {message.role === "status" && (
                <div className="flex justify-center">
                  <div className="bg-gray-800/30 rounded-full px-4 py-2 text-xs text-gray-400 italic">
                    {message.content}
                  </div>
                </div>
              )}
            </div>
          ))} */}
        </div>

        {/* Input area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="p-4 border-t border-gray-700"
        >
          <div className="flex items-end gap-2">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your website or request changes..."
              rows={3}
              disabled={isGenerating}
              className="flex-1 bg-gray-800 text-white placeholder-gray-500 rounded-lg p-3 text-sm resize-none outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-all"
            >
              <Send className="size-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatSidebar;
