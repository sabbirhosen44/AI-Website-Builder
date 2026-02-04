import LoadingSpinner from "@/components/LoadingSpinner";
import ConfirmModal from "@/components/ConfirmModal";
import type { Project } from "@/types";
import { Plus, Folder, ExternalLink, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteProject, useGetUserProjects } from "@/hooks/useProjects";

const MyProjects = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const { data, isLoading } = useGetUserProjects();
  const projects = data?.data || [];
  const deleteProjectMutation = useDeleteProject();

  const handleDeleteClick = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjectToDelete(projectId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      deleteProjectMutation.mutate(projectToDelete);
      setProjectToDelete(null);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-12 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      {projects.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                My Projects
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Manage and view all your AI-generated websites
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/25"
            >
              <Plus className="w-5 h-5" />
              Create Project
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project: Project) => (
              <div
                onClick={() => navigate(`/projects/${project.id}`)}
                key={project.id}
                className="w-80 group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer"
              >
                <div className="relative w-full h-48 bg-gray-900 overflow-hidden">
                  {project.current_code ? (
                    <iframe
                      srcDoc={project.current_code}
                      className="absolute top-0 left-0 w-full h-full border-0 pointer-events-none"
                      sandbox="allow-scripts"
                      title={`Preview of ${project.name}`}
                      style={{
                        transform: "scale(0.33)",
                        transformOrigin: "top left",
                        width: "300%",
                        height: "300%",
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                      <div className="text-center">
                        <Folder className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">No Preview</p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={(e) => handleDeleteClick(project.id, e)}
                    disabled={deleteProjectMutation.isPending}
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 bg-white backdrop-blur-sm rounded-lg transition-all opacity-0 group-hover:opacity-100 hover:bg-gray-100 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 truncate">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-4 line-clamp-2 min-h-[40px]">
                    {project.initial_prompt}
                  </p>

                  <div className="flex justify-between items-center flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="text-xs text-gray-500 text-center sm:text-left">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/preview/${project.id}`);
                        }}
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-300/10 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-all text-xs sm:text-sm"
                      >
                        <Eye className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        Preview
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/projects/${project.id}`);
                        }}
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-300/10 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-all text-xs sm:text-sm"
                      >
                        <ExternalLink className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto text-center py-12 sm:py-20 px-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Folder className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
            No Projects Yet
          </h2>
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
            Start building your first website with AI. Just describe your idea
            and watch it come to life.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-purple-500/25 w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            Create Your First Project
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDanger={true}
      />
    </div>
  );
};

export default MyProjects;
