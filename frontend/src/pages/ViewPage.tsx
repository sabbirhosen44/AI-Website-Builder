import { dummyProjects } from "@/assets/DummyData";
import LoadingSpinner from "@/components/LoadingSpinner";
import PreviewPanel from "@/components/PreviewPanel";
import type { Project } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { projectId } = useParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProject = dummyProjects.find(
      (project) => project.id === projectId
    );
    setTimeout(() => {
      if (foundProject) setCode(foundProject.current_code);
      setLoading(false);
    }, 2000);
  }, [projectId]);

  if (loading) return <LoadingSpinner />;

  if (!code)
    return (
      <div className="flex items-center justify-center h-full text-white">
        Project not found
      </div>
    );

  return (
    <div className="w-full h-screen bg-gray-900 fade-in">
      {code && (
        <PreviewPanel
          project={{ current_code: code } as Project}
          isGenerating={false}
          showEditorPanel={false}
        />
      )}
    </div>
  );
};

export default View;
