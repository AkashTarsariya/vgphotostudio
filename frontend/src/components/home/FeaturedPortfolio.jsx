import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FadeIn } from "../ui/Animations";
import LazyImage from "../ui/LazyImage";
import { GridSkeleton } from "../ui/Skeleton";
import api from "../../services/api";

const FeaturedPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/projects?featured=true&limit=4")
      .then(({ data }) => setProjects(data.data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    // <section className="section-padding bg-gray-50 dark:bg-gray-950">
    <section className="section-padding bg-[#f0eae0] dark:bg-[#f0eae0]">
      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] uppercase text-brand-500 mb-4 block">
            Selected Works
          </span>
          <h2 className="heading-section mb-4">Featured Portfolio</h2>
          <p className="text-muted max-w-2xl mx-auto">
            A curated collection of our finest work across weddings, fashion,
            portraits, and commercial photography.
          </p>
        </FadeIn>

        {loading ? (
          <GridSkeleton count={4} />
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {projects.map((project, i) => (
              <FadeIn key={project._id} delay={i}>
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="group block relative overflow-hidden"
                >
                  <LazyImage
                    // src={project.coverImage}
                    src={`${import.meta.env.VITE_API_URL}${project.coverImage}`}
                    alt={project.title}
                    className="aspect-[5/7]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="text-brand-300 text-xs tracking-widest uppercase mb-1">
                      {project.category?.name}
                    </span>
                    <h3 className="text-white font-display text-xl">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">
                      {project.location}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Sunset Garden Wedding",
                cat: "Weddings",
                img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
              },
              {
                title: "Coastal Romance",
                cat: "Pre-Wedding",
                img: "https://images.unsplash.com/photo-1522673606300-8d9631a15b24?w=600&q=80",
              },
              {
                title: "Vogue Editorial",
                cat: "Fashion",
                img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i}>
                <Link
                  to="/portfolio"
                  className="group block relative overflow-hidden"
                >
                  <LazyImage
                    src={item.img}
                    alt={item.title}
                    className="aspect-[4/5]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="text-brand-300 text-xs tracking-widest uppercase">
                      {item.cat}
                    </span>
                    <h3 className="text-white font-display text-xl">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}

        <FadeIn className="text-center mt-12">
          <Link to="/portfolio" className="btn-outline">
            View All Work
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};

export default FeaturedPortfolio;
