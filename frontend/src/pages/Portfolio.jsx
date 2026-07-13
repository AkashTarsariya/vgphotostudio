import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useInView } from "react-intersection-observer";
import SEO from "../components/ui/SEO";
import { FadeIn } from "../components/ui/Animations";
import LazyImage from "../components/ui/LazyImage";
import { GridSkeleton } from "../components/ui/Skeleton";
import api from "../services/api";

// const API_URL = "http://localhost:5000";
const API_URL = import.meta.env.VITE_API_URL;
const API_URL = "https://vg-photostudio-api.onrender.com";

const getImageUrl = (image) => {
  if (!image) return "";

  // External URL (Unsplash, etc.)
  if (image.startsWith("http")) {
    return image;
  }

  // Local uploaded image
  return `${API_URL}${image}`;
};

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    api
      .get("/categories")
      .then(({ data }) => setCategories(data.data))
      .catch(() => {});
  }, []);

  const fetchProjects = useCallback(
    async (pageNum, reset = false) => {
      if (reset) setLoading(true);
      else setLoadingMore(true);

      try {
        const params = new URLSearchParams({ page: pageNum, limit: 12 });
        if (activeCategory) params.append("category", activeCategory);
        if (search) params.append("search", search);

        const { data } = await api.get(`/projects?${params}`);
        setProjects((prev) => (reset ? data.data : [...prev, ...data.data]));
        setHasMore(data.pagination.hasMore);
      } catch {
        if (reset) setProjects([]);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [activeCategory, search],
  );

  useEffect(() => {
    setPage(1);
    fetchProjects(1, true);
  }, [activeCategory, search, fetchProjects]);

  useEffect(() => {
    if (inView && hasMore && !loading && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProjects(nextPage);
    }
  }, [inView, hasMore, loading, loadingMore, page, fetchProjects]);

  return (
    <>
      <SEO
        title="Portfolio"
        description="Browse our premium photography portfolio — weddings, portraits, events, and commercial work."
      />

      <section className="pt-32 pb-12 section-padding">
        <div className="container-custom">
          <FadeIn className="text-center mb-12">
            <span className="text-sm tracking-[0.3em] uppercase text-brand-500 mb-4 block">
              Our Work
            </span>
            <h1 className="heading-display mb-4">Portfolio</h1>
            <p className="text-muted max-w-2xl mx-auto">
              Explore our collection of visual stories across weddings, fashion,
              portraits, and more.
            </p>
          </FadeIn>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-11"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("")}
              className={`px-4 py-2 text-sm tracking-wider uppercase transition-colors ${
                !activeCategory
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "border border-gray-300 dark:border-gray-700 hover:border-brand-500"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className={`px-4 py-2 text-sm tracking-wider uppercase transition-colors ${
                  activeCategory === cat._id
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "border border-gray-300 dark:border-gray-700 hover:border-brand-500"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {loading ? (
            <GridSkeleton count={9} />
          ) : projects.length > 0 ? (
            <div className="masonry-grid">
              {projects.map((project, i) => (
                <FadeIn
                  key={project._id}
                  delay={i % 4}
                  className="masonry-item"
                >
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="group block relative overflow-hidden"
                  >
                    <LazyImage
                      // src={project.coverImage}
                      src={getImageUrl(project.coverImage)}
                      alt={project.title}
                      className="w-full"
                      aspectRatio={
                        i % 3 === 0 ? "3/4" : i % 3 === 1 ? "4/5" : "1/1"
                      }
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                      <span className="text-brand-300 text-xs tracking-widest uppercase">
                        {project.category?.name}
                      </span>
                      <h3 className="text-white font-display text-lg">
                        {project.title}
                      </h3>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted text-lg">
                No projects found. Try adjusting your filters.
              </p>
            </div>
          )}

          {loadingMore && (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 dark:border-t-white rounded-full animate-spin" />
            </div>
          )}
          <div ref={ref} className="h-4" />
        </div>
      </section>
    </>
  );
};

export default Portfolio;
