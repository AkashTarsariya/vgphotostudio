import { useEffect, useState, useRef, useCallback } from "react";
// import { X } from "lucide-react";
import {
  X,
  RotateCcw,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Expand,
} from "lucide-react";

// const VideoLightbox = ({ video, onClose }) => {
const VideoLightbox = ({ videos, currentIndex, setCurrentIndex, onClose }) => {
  const [rotation, setRotation] = useState(0);

  const videoRef = useRef(null);

  if (!videos?.length) return null;

  const video = videos[currentIndex];

  if (!video) return null;

  //   const video = videos[currentIndex];

  //   if (!video) return null;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length, setCurrentIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length, setCurrentIndex]);

  //   const toggleFullscreen = async () => {
  //     if (!videoRef.current) return;

  //     if (!document.fullscreenElement) {
  //       await videoRef.current.requestFullscreen();
  //     } else {
  //       await document.exitFullscreen();
  //     }
  //   };

  const toggleFullscreen = async () => {
    const element = videoRef.current;

    if (!element) return;

    try {
      if (!document.fullscreenElement) {
        await element.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen failed:", err);
    }
  };

  useEffect(() => {
    setRotation(0);
  }, [currentIndex]);

  //   useEffect(() => {
  //     const handleKeyDown = (e) => {
  //       switch (e.key) {
  //         case "Escape":
  //           onClose();
  //           break;

  //         case "ArrowRight":
  //           goNext();
  //           break;

  //         case "ArrowLeft":
  //           goPrev();
  //           break;

  //         default:
  //           break;
  //       }
  //     };

  //     window.addEventListener("keydown", handleKeyDown);
  //     document.body.style.overflow = "hidden";

  //     return () => {
  //       window.removeEventListener("keydown", handleKeyDown);
  //       document.body.style.overflow = "auto";
  //     };
  //   }, [goNext, goPrev, onClose]);

  //   if (!video) return null;
  //   const video = videos[currentIndex];

  //   if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 text-white hover:text-brand-400 transition"
        >
          <X size={34} />
        </button>

        {/* <div className="flex justify-center gap-4 mb-5">
          <button
            onClick={() => setRotation((prev) => prev - 90)}
            className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition"
          >
            ↺ Rotate Left
          </button>

          <button
            onClick={() => setRotation((prev) => prev + 90)}
            className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition"
          >
            ↻ Rotate Right
          </button>
        </div> */}

        {/* Video */}
        <video
          key={video.publicId}
          ref={videoRef}
          src={video.url}
          controls
          autoPlay
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.3s ease",
          }}
          className="w-full max-h-[85vh] rounded-lg bg-black"
        />

        <p className="text-center text-white/60 text-sm tracking-widest mt-4">
          {currentIndex + 1} / {videos.length}
        </p>

        {/* <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={goPrev}
            className="px-5 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition"
          >
            ← Previous
          </button>

          <button
            onClick={goNext}
            className="px-5 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition"
          >
            Next →
          </button>
        </div> */}

        <div className="flex justify-center gap-4 mb-5">
          <button
            onClick={() => setRotation((prev) => prev - 90)}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <RotateCcw className="text-white" size={22} />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <Expand className="text-white" size={22} />
          </button>

          <button
            onClick={() => setRotation((prev) => prev + 90)}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <RotateCw className="text-white" size={22} />
          </button>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={goPrev}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>

          <button
            onClick={goNext}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ChevronRight size={28} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoLightbox;
