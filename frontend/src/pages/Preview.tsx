import { dummyProjects } from "@/assets/DummyData";
import LoadingSpinner from "@/components/LoadingSpinner";
import PreviewPanel from "@/components/PreviewPanel";
import type { Project } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Preview = () => {
  const { projectId, versionId } = useParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCode = () => {
    const foundProject = dummyProjects.find(
      (project) => project.id === projectId
    );
    setTimeout(() => {
      if (foundProject) setCode(foundProject.current_code);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchCode();
  }, [projectId]);

  if (loading) <LoadingSpinner />;

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

export default Preview;
