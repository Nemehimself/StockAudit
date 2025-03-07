import React from "react";
import YouTube from "react-youtube";

const videoId = "G0dzLanYW1E";

const opts = {
  height: "100%",
  width: "100%",
  playerVars: {
    autoplay: 0,
    controls: 1,
    modestbranding: 1,
  },
};

interface VideoModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, closeModal }) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[700px] h-[24rem] max-w-full relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-2xl font-bold"
        >
          ✖
        </button>

        {/* YouTube Video */}
        <div className="flex justify-center h-full">
          <YouTube videoId={videoId} opts={opts} className="w-full h-full rounded-lg m-2" />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
