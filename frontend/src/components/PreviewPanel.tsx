import React, { forwardRef, useRef, useEffect } from "react";
import type { Project } from "@/types";

interface ProjectPreviewProps {
  project: Project;
  isGenerating: boolean;
  device?: "phone" | "tablet" | "desktop";
  showEditorPanel?: boolean;
}

export interface ProjectPreviewRef {
  getCode: () => string | undefined;
}

const PreviewPanel = forwardRef<ProjectPreviewRef, ProjectPreviewProps>(
  (
    { project, isGenerating, device = "desktop", showEditorPanel = true },
    ref
  ) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
      if (iframeRef.current && project.current_code) {
        const iframe = iframeRef.current;
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow?.document;

        if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(project.current_code);
          iframeDoc.close();
        }
      }
    }, [project.current_code]);

    React.useImperativeHandle(ref, () => ({
      getCode: () => project.current_code,
    }));

    const getDeviceStyles = () => {
      switch (device) {
        case "phone":
          return "w-[375px] h-full";
        case "tablet":
          return "w-[768px] h-full";
        case "desktop":
        default:
          return "w-full h-full";
      }
    };

    return (
      <div className="relative h-full bg-gray-900 flex-1 overflow-hidden">
        {project.current_code ? (
          <div className="w-full h-full flex items-center justify-center py-2">
            <div
              className={`${getDeviceStyles()} bg-white  shadow-2xl overflow-auto transition-all duration-300`}
            >
              <iframe
                ref={iframeRef}
                className="w-full h-full border-0"
                title="Project Preview"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          </div>
        ) : isGenerating ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              <p className="text-gray-400 text-sm">Generating...</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-400 text-lg">No preview available</p>
              <p className="text-gray-500 text-sm mt-2">
                Start a conversation to generate your website
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PreviewPanel.displayName = "PreviewPanel";

export default PreviewPanel;
