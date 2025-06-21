import { useState, useEffect } from "react";
import { FileText, X, Download, ExternalLink } from "lucide-react";

const ResumePreview = ({
  cloudinaryUrl = "https://res.cloudinary.com/demo/image/upload/sample.pdf",
  name = "John Doe",
  position = "Software Developer",
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark class exists on html element
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Watch for changes to the dark class
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const openPreview = () => {
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = cloudinaryUrl;
    link.download = `${name}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openInNewTab = () => {
    window.open(cloudinaryUrl, "_blank");
  };

  return (
    <>
      <div
        className="flex items-center group gap-2 cursor-pointer w-fit"
        onClick={openPreview}
      >
        <div className={`relative bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group-hover:from-red-600 group-hover:to-red-700 ${isDark ? 'shadow-red-900/20' : ''}`}>
          <FileText className="w-4 h-4 text-white" />
          <div className={`absolute -top-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'} flex items-center justify-center`}>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        <div className={`mt-1 text-xs ${isDark ? 'text-red-400' : 'text-red-600'} opacity-0 group-hover:opacity-100 transition-opacity`}>
          preview
        </div>
      </div>

      {/* Modal Overlay */}
      {isPreviewOpen && (
        <div className={`fixed inset-0 ${isDark ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50'} flex items-center justify-center z-50 p-4`}>
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col`}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-3">
                <FileText className={`w-6 h-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {name}'s Resume
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {position}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={downloadResume}
                  className={`p-2 ${isDark ? 'text-gray-300 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'} rounded-lg transition-colors`}
                  title="Download Resume"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={openInNewTab}
                  className={`p-2 ${isDark ? 'text-gray-300 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'} rounded-lg transition-colors`}
                  title="Open in New Tab"
                >
                  <ExternalLink className="w-5 h-5" />
                </button>
                <button
                  onClick={closePreview}
                  className={`p-2 ${isDark ? 'text-gray-300 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'} rounded-lg transition-colors`}
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Preview */}
            <div className="flex-1 p-4 overflow-hidden">
              <div className={`w-full h-[500px] ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg overflow-hidden`}>
                <iframe
                  src={`${cloudinaryUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                  className="w-full h-full border-0"
                  title={`${name} Resume Preview`}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`p-4 border-t ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'} rounded-b-lg`}>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={downloadResume}
                    className={`px-4 py-2 ${isDark ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'} text-white rounded-lg transition-colors flex items-center space-x-2`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={closePreview}
                    className={`px-4 py-2 ${isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-600 hover:bg-gray-700'} text-white rounded-lg transition-colors`}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const Resume = () => {
  const candidate = {
    name: "Alice Johnson",
    position: "Frontend Developer",
    cloudinaryUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
  };

  return (
    <ResumePreview
      key={12}
      name={candidate.name}
      position={candidate.position}
      cloudinaryUrl={candidate.cloudinaryUrl}
    />
  );
};