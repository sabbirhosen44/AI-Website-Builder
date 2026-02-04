import LoadingSpinner from "@/components/LoadingSpinner";
import PreviewPanel from "@/components/PreviewPanel";
import type { Project } from "@/types";
import { useParams } from "react-router-dom";
import { useGetProjectPreview } from "@/hooks/useProjects";

const Preview = () => {
  const { projectId } = useParams();

  const { data, isLoading } = useGetProjectPreview(projectId || "");
  const project = data?.data;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full h-screen bg-gray-900 fade-in">
      {project?.current_code && (
        <PreviewPanel
          project={{ current_code: project.current_code } as Project}
          isGenerating={false}
          showEditorPanel={false}
        />
      )}
    </div>
  );
};

export default Preview;
