import { useState } from "react";
import { useInView } from "react-intersection-observer";

const LazyImage = ({
  src,
  alt,
  className = "",
  aspectRatio,
  onClick,
  priority = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });

  const shouldLoad = priority || inView;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 skeleton animate-pulse" />
      )}
      {shouldLoad && !error && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } ${onClick ? "cursor-pointer hover:scale-105" : ""}`}
        />
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-muted text-sm">
          Image unavailable
        </div>
      )}
    </div>
  );
};

export default LazyImage;
