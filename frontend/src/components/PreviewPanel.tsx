import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
} from "react";
import type { Project } from "@/types";
import EditorPanel from "./EditorPanel";

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
    ref,
  ) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [selectedElement, setSelectedElement] = useState<any>(null);

    const iframeOrigin = window.location.origin;

    useEffect(() => {
      const iframe = iframeRef.current;
      if (!iframe || !project.current_code) return;

      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;

      iframeDoc.open();
      iframeDoc.write(project.current_code);
      iframeDoc.close();

      const injectScript = () => {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc?.body) {
          const existingScript = doc.getElementById("editor-script");
          if (existingScript) existingScript.remove();

          if (!showEditorPanel) return;

          const script = doc.createElement("script");
          script.id = "editor-script";
          script.textContent = `
        const allowedOrigin = "${iframeOrigin}";
        let selectedElement = null;

        document.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          const element = e.target;
          if (selectedElement) selectedElement.style.outline = '';
          selectedElement = element;
          element.style.outline = '2px solid #9333ea';
          const computedStyles = window.getComputedStyle(element);
          window.parent.postMessage({
            type: 'ELEMENT_SELECTED',
            payload: {
              tagName: element.tagName,
              className: element.className || '',
              text: element.innerText || element.textContent || '',
              styles: {
                padding: computedStyles.padding,
                margin: computedStyles.margin,
                backgroundColor: computedStyles.backgroundColor,
                color: computedStyles.color,
                fontSize: computedStyles.fontSize
              }
            }
          }, allowedOrigin);
        }, true);

        window.addEventListener('message', function(event) {
          if (event.origin !== allowedOrigin) return;

          if (event.data.type === 'UPDATE_ELEMENT' && selectedElement) {
            const updates = event.data.payload;
            if (updates.text !== undefined) selectedElement.textContent = updates.text;
            if (updates.className !== undefined) selectedElement.className = updates.className;
            if (updates.styles) Object.keys(updates.styles).forEach(k => selectedElement.style[k] = updates.styles[k]);
          }

          if (event.data.type === 'CLEAR_SELECTION_REQUEST' && selectedElement) {
            selectedElement.style.outline = '';
            selectedElement = null;
          }
        });
      `;
          doc.body.appendChild(script);
        } else setTimeout(injectScript, 50);
      };

      setTimeout(injectScript, 0);
    }, [showEditorPanel, project.current_code]);

    useEffect(() => {
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== iframeOrigin) return;

        if (event.data.type === "ELEMENT_SELECTED")
          setSelectedElement(event.data.payload);
        else if (event.data.type === "CLEAR_SELECTION")
          setSelectedElement(null);
      };

      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }, []);

    const handleUpdate = (updates: any) => {
      iframeRef.current?.contentWindow?.postMessage(
        { type: "UPDATE_ELEMENT", payload: updates },
        iframeOrigin,
      );
    };

    const handleClose = () => {
      setSelectedElement(null);
      iframeRef.current?.contentWindow?.postMessage(
        { type: "CLEAR_SELECTION_REQUEST" },
        iframeOrigin,
      );
    };

    useImperativeHandle(ref, () => ({
      getCode: () => {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return project.current_code;

        const editorScript = doc.getElementById("editor-script");
        if (editorScript) editorScript.remove();

        const html = `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
        return html;
      },
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

    console.log(isGenerating);

    return (
      <div className="relative h-full bg-gray-900 flex-1 overflow-hidden">
        {project.current_code ? (
          <>
            <div className="w-full h-full flex items-center justify-center ">
              <div
                className={`${getDeviceStyles()} bg-white shadow-2xl overflow-auto transition-all duration-300 `}
              >
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-0 "
                  title="Project Preview"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                />
              </div>
            </div>
            {showEditorPanel && selectedElement && (
              <EditorPanel
                selectedElement={selectedElement}
                onUpdate={handleUpdate}
                onClose={handleClose}
              />
            )}
          </>
        ) : isGenerating ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-900/80 backdrop-blur-md">
            <div className="flex flex-col items-center gap-6">
              {/* Big loader */}
              <div className="relative">
                <div className="h-20 w-20 rounded-full border-4 border-purple-500/30" />
                <div className="absolute inset-0 h-20 w-20 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
              </div>

              {/* Copy */}
              <div className="text-center space-y-1">
                <p className="text-white text-lg font-semibold">
                  Generating preview
                </p>
                <p className="text-gray-400 text-sm">
                  This may take a few seconds
                </p>
              </div>
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
  },
);

PreviewPanel.displayName = "PreviewPanel";

export default PreviewPanel;
