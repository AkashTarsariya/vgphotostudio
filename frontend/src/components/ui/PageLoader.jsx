// const PageLoader = () => (
//   <div className="fixed inset-0 flex items-center justify-center bg-surface-light dark:bg-surface-dark z-50">
//     <div className="text-center">
//       <div className="w-12 h-12 border-2 border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-white rounded-full animate-spin mx-auto mb-4" />
//       <p className="font-display text-lg tracking-widest text-muted">VG PHOTOSTUDIO</p>
//     </div>
//   </div>
// );

// export default PageLoader;

import { motion } from "framer-motion";

const shutterPieces = Array.from({ length: 8 });

const PageLoader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#F5EFE5] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Camera Shutter */}
      <div className="relative w-44 h-44 flex items-center justify-center">
        {shutterPieces.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-24 bg-[#C8A46B] rounded-full origin-bottom"
            style={{
              rotate: `${i * 45}deg`,
            }}
            animate={{
              rotate: `${i * 45 + 20}deg`,
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="w-20 h-20 rounded-full bg-[#111827] border-4 border-[#C8A46B]"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      <motion.h1
        className="mt-12 text-5xl font-display tracking-wider text-white"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* VG PHOTO */}
        {/* <span className="text-[#C8A46B]">VG PHOTOSTUDIO</span> */}
        VG <span className="text-brand-500">PHOTO</span>STUDIO
      </motion.h1>

      <motion.p
        className="mt-4 uppercase tracking-[0.35em] text-[#D8C2A4] text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Premium Photography
      </motion.p>

      <motion.p
        className="mt-8 italic text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Every Frame Tells A Story
      </motion.p>

      {/* Progress Line */}

      <div className="mt-12 w-72 h-[3px] bg-white/10 overflow-hidden rounded-full">
        <motion.div
          className="h-full bg-[#C8A46B]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 3.5,
            ease: "linear",
          }}
        />
      </div>

      <motion.p
        className="mt-6 text-gray-500 tracking-widest text-xs uppercase"
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
        }}
      >
        Loading your memories...
      </motion.p>
    </motion.div>
  );
};

export default PageLoader;
