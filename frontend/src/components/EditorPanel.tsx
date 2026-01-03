import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface EditorPanelProps {
  selectedElement: {
    tagName: string;
    className: string;
    text: string;
    styles: {
      padding: string;
      margin: string;
      backgroundColor: string;
      color: string;
      fontSize: string;
    } | null;
  };
  onUpdate: (updates: any) => void;
  onClose: () => void;
}

const EditorPanel = ({
  selectedElement,
  onUpdate,
  onClose,
}: EditorPanelProps) => {
  const [values, setValues] = useState(selectedElement);

  useEffect(() => {
    setValues(selectedElement);
  }, [selectedElement]);

  if (!selectedElement || !values) return null;

  const handleTextChange = (text: string) => {
    setValues({ ...values, text });
    onUpdate({ text });
  };

  const handleClassChange = (className: string) => {
    setValues({ ...values, className });
    onUpdate({ className });
  };

  const handleStyleChange = (property: string, value: string) => {
    if (values.styles) {
      const newStyles = { ...values.styles, [property]: value };
      setValues({ ...values, styles: newStyles });
      onUpdate({ styles: newStyles });
    }
  };

  return (
    <div className="absolute right-0 top-0 h-full w-80 bg-gray-900 border-l border-gray-800 shadow-2xl z-50 overflow-y-auto scrollbar-hidden fade-in">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
        <div>
          <h2 className="text-white font-semibold text-lg">Edit Element</h2>
          <p className="text-gray-400 text-xs mt-0.5">{values.tagName}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Close editor"
        >
          <X className="size-5 font-extrabold text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Text Content */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Text Content
          </label>
          <textarea
            value={values.text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter text content..."
            rows={2}
            className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-lg p-3 text-sm resize-none outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
          />
        </div>

        {/* Class Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            CSS Classes
          </label>
          <input
            type="text"
            value={values.className}
            onChange={(e) => handleClassChange(e.target.value)}
            placeholder="e.g. text-center bg-blue-500"
            className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
          />
        </div>

        {/* Styles Section */}
        {values.styles && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-300 border-b border-gray-800 pb-2">
              Styles
            </h3>

            {/* Padding */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">
                Padding
              </label>
              <input
                type="text"
                value={values.styles.padding}
                onChange={(e) => handleStyleChange("padding", e.target.value)}
                placeholder="e.g. 10px, 1rem"
                className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
              />
            </div>

            {/* Margin */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">
                Margin
              </label>
              <input
                type="text"
                value={values.styles.margin}
                onChange={(e) => handleStyleChange("margin", e.target.value)}
                placeholder="e.g. 10px, 1rem"
                className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
              />
            </div>

            {/* Background Color */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={values.styles.backgroundColor || "#ffffff"}
                  onChange={(e) =>
                    handleStyleChange("backgroundColor", e.target.value)
                  }
                  className="w-12 h-10 rounded-lg cursor-pointer border border-gray-700"
                />
                <input
                  type="text"
                  value={values.styles.backgroundColor}
                  onChange={(e) =>
                    handleStyleChange("backgroundColor", e.target.value)
                  }
                  placeholder="#000000"
                  className="flex-1 bg-gray-800 text-white placeholder-gray-500 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
                />
              </div>
            </div>

            {/* Text Color */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">
                Text Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={values.styles.color || "#000000"}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer border border-gray-700"
                />
                <input
                  type="text"
                  value={values.styles.color}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  placeholder="#000000"
                  className="flex-1 bg-gray-800 text-white placeholder-gray-500 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
                />
              </div>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">
                Font Size
              </label>
              <input
                type="text"
                value={values.styles.fontSize}
                onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                placeholder="e.g. 16px, 1rem"
                className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
              />
            </div>
          </div>
        )}

        {/* Apply Button */}
        <div className="pt-4">
          <button
            onClick={onClose}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-medium transition-colors"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
