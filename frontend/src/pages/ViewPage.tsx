import LoadingSpinner from "@/components/LoadingSpinner";
import PreviewPanel from "@/components/PreviewPanel";
import { useGetProjectById } from "@/hooks/useProjects";
import type { Project } from "@/types";
import { useNavigate, useParams } from "react-router-dom";

const ViewPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetProjectById(projectId || "");
  const project = data?.data as Project | undefined;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !project) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <p className="text-2xl font-medium text-white mb-4">
            Project not found or not published!
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (!project.current_code) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <p className="text-2xl font-medium text-white mb-4">
            This project has no content yet!
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-900 fade-in">
      <PreviewPanel
        project={project}
        isGenerating={false}
        showEditorPanel={false}
      />
    </div>
  );
};

export default ViewPage;
