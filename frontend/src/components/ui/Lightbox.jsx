import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const Lightbox = ({ images, currentIndex, onClose, onNavigate }) => {
  const [zoomed, setZoomed] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onNavigate(-1);
    if (e.key === 'ArrowRight') onNavigate(1);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-label="Image lightbox"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white z-10"
        aria-label="Close lightbox"
      >
        <X size={28} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
            className="absolute left-4 p-2 text-white/80 hover:text-white z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
            className="absolute right-4 p-2 text-white/80 hover:text-white z-10"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      <button
        onClick={(e) => { e.stopPropagation(); setZoomed(!zoomed); }}
        className="absolute top-4 left-4 p-2 text-white/80 hover:text-white z-10"
        aria-label="Toggle zoom"
      >
        <ZoomIn size={24} />
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className={`max-h-[90vh] max-w-[90vw] object-contain ${zoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'} transition-transform duration-300`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: zoomed ? 1.5 : 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); setZoomed(!zoomed); }}
        />
      </AnimatePresence>

      <div className="absolute bottom-4 text-white/60 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
};

export default Lightbox;
