// VideoSection.tsx
import React from "react";

const VideoSection = () => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
      <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">Short-form vs. Long-form Audit</h2>
      <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">Watch this video to understand the key differences between these audits.</p>
      <div className="relative w-full h-0 pb-[56.25%]">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src="https://www.youtube.com/embed/G0dzLanYW1E"
          title="Audit Comparison"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoSection;
