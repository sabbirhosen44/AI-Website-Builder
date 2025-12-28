import {
  dummyConversations,
  dummyProjects,
  dummyVersion,
} from "@/assets/DummyData";
import Logo from "@/assets/logo.svg";
import LoadingSpinner from "@/components/LoadingSpinner";
import ChatSidebar from "@/components/ChatSidebar";
import PreviewPanel from "@/components/PreviewPanel";
import type { Project, Message } from "@/types";
import {
  Download,
  Eye,
  EyeOff,
  Laptop,
  Maximize,
  Menu,
  Save,
  Smartphone,
  Tablet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProjectBuilder() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [device, setDevice] = useState<"phone" | "tablet" | "desktop">(
    "desktop"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "I've enhanced your prompt to: 'Create a modern portfolio website with clean design, responsive layout, and smooth animations. Include sections for projects, skills, and contact information. Use a professional color scheme with proper typography and accessibility features.'",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      role: "status",
      content: "now generating your website...",
      timestamp: new Date().toISOString(),
    },
  ]);

  const fetchProjects = async () => {
    const foundProject = dummyProjects.find((p) => p.id === projectId);
    if (foundProject) {
      setProject({
        ...foundProject,
        conversation: dummyConversations,
        versions: dummyVersion,
      });
      setLoading(false);
    }
  };

  const saveProject = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const downloadCode = () => {
    console.log("Downloading code...");
  };

  const togglePublish = async () => {
    if (project) {
      setProject({ ...project, isPublished: !project.isPublished });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [projectId]);

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

    // Simulate AI processing
    setTimeout(() => {
      const statusMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "status",
        content: "analyzing your request...",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, statusMessage]);

      // Simulate completion
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

  if (loading) return <LoadingSpinner />;

  return project ? (
    <div className="h-screen w-full flex flex-col bg-gray-50 overflow-hidden">
      <div className="px-4 py-3 border-b bg-gray-900 border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <img
            src={Logo}
            alt="Logo"
            width={68}
            height={26}
            className="h-6 w-auto"
          />
          <div className="max-w-64 sm:max-w-xs">
            <p className="text-sm font-medium capitalize truncate text-white">
              {project.name}
            </p>
            <p className="text-xs text-gray-400 -mt-0.5">
              Previewing last saved version
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setDevice("phone")}
            className={`p-2 rounded transition-all ${
              device === "phone"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={`p-2 rounded transition-all ${
              device === "tablet"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice("desktop")}
            className={`p-2 rounded transition-all ${
              device === "desktop"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            title="Desktop View"
          >
            <Laptop className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={saveProject}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all text-sm"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save"}</span>
          </button>
          <Link
            target="_blank"
            to={`/preview/${projectId}`}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all text-sm"
          >
            <Maximize className="w-4 h-4" />
            <span>Preview</span>
          </Link>
          <button
            onClick={downloadCode}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          <button
            onClick={togglePublish}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all text-sm"
          >
            {project.isPublished ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            <span>{project.isPublished ? "Unpublish" : "Publish"}</span>
          </button>
        </div>

        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-1 min-h-0">
        <ChatSidebar
          isMenuOpen={isMenuOpen}
          project={project}
          setProject={(p) => {
            setProject(p);
          }}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
        <PreviewPanel />
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className="absolute right-0 top-0 h-full w-64 bg-gray-900 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-semibold text-white">Menu</h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-6 text-gray-400" />
              </button>
            </div>
            <nav className="space-y-4">
              <button
                onClick={() => {
                  saveProject();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all text-sm"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save"}</span>
              </button>
              <Link
                target="_blank"
                to={`/preview/${projectId}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 w-full px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all text-sm"
              >
                <Maximize className="w-4 h-4" />
                <span>Preview</span>
              </Link>
              <button
                onClick={() => {
                  downloadCode();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={() => {
                  togglePublish();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all text-sm"
              >
                {project.isPublished ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                <span>{project.isPublished ? "Unpublish" : "Publish"}</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <p className="text-2xl font-medium text-white">Unable to load project!</p>
    </div>
  );
}
