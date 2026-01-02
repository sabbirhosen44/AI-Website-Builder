import {
  dummyConversations,
  dummyProjects,
  dummyVersion,
} from "@/assets/DummyData";
import Logo from "@/assets/logo.svg";
import LoadingSpinner from "@/components/LoadingSpinner";
import ChatSidebar from "@/components/ChatSidebar";
import PreviewPanel, {
  type ProjectPreviewRef,
} from "@/components/PreviewPanel";
import type { Project } from "@/types";
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
import { useEffect, useRef, useState } from "react";
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
  const previewRef = useRef<ProjectPreviewRef>(null);

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

  useEffect(() => {
    if (previewRef.current) {
      // console.log(previewRef.current.getCode());
    }
  }, [project?.current_code]);

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
          setProject={setProject}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
        <PreviewPanel
          ref={previewRef}
          project={project}
          isGenerating={isGenerating}
          device={device}
        />
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
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
