import { useState, useEffect } from "react";
import { FileText, X, ExternalLink } from "lucide-react";

const ResumePreview = ({ cloudinaryUrl, name = "John Doe" }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const openPreview = () => setIsPreviewOpen(true);
  const closePreview = () => setIsPreviewOpen(false);
  const openInNewTab = () => window.open(cloudinaryUrl, "_blank");

  return (
    <>
      <div
        className="flex items-center group gap-2 cursor-pointer w-fit"
        onClick={openPreview}
      >
        <div
          className={`relative bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group-hover:from-red-600 group-hover:to-red-700 ${
            isDark ? "shadow-red-900/20" : ""
          }`}
        >
          <FileText className="w-4 h-4 text-white" />
          <div
            className={`absolute -top-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 ${
              isDark ? "border-gray-800" : "border-white"
            } flex items-center justify-center`}
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        <div
          className={`mt-1 text-xs ${
            isDark ? "text-red-400" : "text-red-600"
          } opacity-0 group-hover:opacity-100 transition-opacity`}
        >
          preview
        </div>
      </div>

      {isPreviewOpen && (
        <div
          className={`fixed inset-0 ${
            isDark ? "bg-black bg-opacity-70" : "bg-black bg-opacity-50"
          } flex items-center justify-center z-50 p-4`}
        >
          <div
            className={`${
              isDark ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between p-4 border-b ${
                isDark ? "border-gray-600" : "border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <FileText
                  className={`w-6 h-6 ${
                    isDark ? "text-red-400" : "text-red-600"
                  }`}
                />
                <h3
                  className={`text-lg font-semibold ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {name}'s Resume
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <IconBtn
                  icon={<ExternalLink className="w-5 h-5" />}
                  onClick={openInNewTab}
                  isDark={isDark}
                  title="Open in New Tab"
                />
                <IconBtn
                  icon={<X className="w-5 h-5" />}
                  onClick={closePreview}
                  isDark={isDark}
                  title="Close"
                />
              </div>
            </div>

            {/* PDF Preview (or fallback message) */}
            <div className="flex-1 p-4 overflow-hidden">
              <div
                className={`w-full h-[500px] ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                } rounded-lg overflow-hidden flex items-center justify-center`}
              >
                {cloudinaryUrl.endsWith(".pdf") ? (
                  <iframe
                    src={cloudinaryUrl}
                    className="w-full h-full border-0"
                    title={`${name} Resume Preview`}
                    loading="lazy"
                  />
                ) : (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-300">
                    Unable to preview this file.{" "}
                    <button
                      onClick={openInNewTab}
                      className="underline text-red-500 hover:text-red-600"
                    >
                      Open in new tab
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div
              className={`p-4 border-t ${
                isDark ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-gray-50"
              } rounded-b-lg text-right`}
            >
              <button
                onClick={closePreview}
                className={`px-4 py-2 ${
                  isDark
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-gray-600 hover:bg-gray-700"
                } text-white rounded-lg transition-colors`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const IconBtn = ({ icon, onClick, isDark, title }) => (
  <button
    onClick={onClick}
    className={`p-2 ${
      isDark
        ? "text-gray-300 hover:text-red-400 hover:bg-red-900/20"
        : "text-gray-600 hover:text-red-600 hover:bg-red-50"
    } rounded-lg transition-colors`}
    title={title}
  >
    {icon}
  </button>
);

export default ResumePreview;
