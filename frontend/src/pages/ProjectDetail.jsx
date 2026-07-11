import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Camera, ArrowLeft, Share2 } from "lucide-react";
import SEO from "../components/ui/SEO";
import { FadeIn } from "../components/ui/Animations";
import LazyImage from "../components/ui/LazyImage";
import Lightbox from "../components/ui/Lightbox";
import { GridSkeleton } from "../components/ui/Skeleton";
import api from "../services/api";
const API_URL = "http://localhost:5000";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    api
      .get(`/projects/slug/${slug}`)
      .then(({ data }) => {
        setProject(data.data);
        const viewed = JSON.parse(localStorage.getItem("vg_recent") || "[]");
        const updated = [
          data.data._id,
          ...viewed.filter((id) => id !== data.data._id),
        ].slice(0, 6);
        localStorage.setItem("vg_recent", JSON.stringify(updated));
      })
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: project.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading)
    return (
      <div className="pt-32 section-padding">
        <GridSkeleton count={1} />
      </div>
    );
  if (!project)
    return (
      <div className="pt-32 section-padding text-center">
        <h1 className="heading-section mb-4">Project Not Found</h1>
        <Link to="/portfolio" className="btn-outline">
          Back to Portfolio
        </Link>
      </div>
    );

  // const gallery = project.gallery?.length
  //   ? project.gallery
  //   : [project.coverImage];

  const gallery =
    project.gallery?.length > 0
      ? project.gallery.map((img) => `${API_URL}${img}`)
      : [`${API_URL}${project.coverImage}`];

  return (
    <>
      {/* <SEO
        title={project.seo?.metaTitle || project.title}
        description={
          project.seo?.metaDescription || project.story?.slice(0, 160)
        }
        image={project.coverImage}
      /> */}

      <SEO
        title={project.seo?.metaTitle || project.title}
        description={
          project.seo?.metaDescription || project.story?.slice(0, 160)
        }
        image={`${API_URL}${project.coverImage}`}
      />

      <section className="relative h-[70vh] min-h-[500px]">
        {/* <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
        /> */}

        <img
          src={`${API_URL}${project.coverImage}`}
          alt={project.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <span className="text-brand-300 text-sm tracking-widest uppercase block mb-2">
            {project.category?.name}
          </span>
          <h1 className="heading-display text-white mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-gray-300">
            <span className="flex items-center gap-2">
              <MapPin size={16} /> {project.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />{" "}
              {new Date(project.shootDate).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
        <button
          onClick={handleShare}
          className="absolute top-32 right-8 p-3 glass text-white hover:bg-white/20 transition-colors"
          aria-label="Share"
        >
          <Share2 size={20} />
        </button>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="heading-section mb-6">The Story</h2>
            <p className="text-muted leading-relaxed text-lg whitespace-pre-line">
              {project.story}
            </p>
          </FadeIn>

          {project.equipment?.camera && (
            <FadeIn className="mt-12 p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Camera size={20} className="text-brand-500" />
                <h3 className="font-display text-xl">Equipment</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted">
                <p>
                  <strong className="text-gray-900 dark:text-gray-100">
                    Camera:
                  </strong>{" "}
                  {project.equipment.camera}
                </p>
                {project.equipment.lenses?.length > 0 && (
                  <p>
                    <strong className="text-gray-900 dark:text-gray-100">
                      Lenses:
                    </strong>{" "}
                    {project.equipment.lenses.join(", ")}
                  </p>
                )}
                {project.equipment.lighting && (
                  <p>
                    <strong className="text-gray-900 dark:text-gray-100">
                      Lighting:
                    </strong>{" "}
                    {project.equipment.lighting}
                  </p>
                )}
              </div>
            </FadeIn>
          )}

          {project.testimonial?.content && (
            <FadeIn className="mt-12 p-8 bg-gray-50 dark:bg-gray-900 italic text-center">
              <p className="text-lg mb-4">"{project.testimonial.content}"</p>
              <p className="text-sm text-muted">
                — {project.testimonial.clientName}
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      <section className="section-padding bg-[#f0eae0] dark:bg-gray-950">
        <div className="container-custom">
          <FadeIn className="mb-10">
            <h2 className="heading-section">Gallery</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((img, i) => (
              <FadeIn key={i} delay={i % 3}>
                <LazyImage
                  src={img}
                  alt={`${project.title} - ${i + 1}`}
                  className="aspect-[4/5] cursor-pointer"
                  onClick={() => setLightboxIndex(i)}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {project.relatedProjects?.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="heading-section mb-10">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.relatedProjects.map((rp) => (
                <Link
                  key={rp._id}
                  to={`/portfolio/${rp.slug}`}
                  className="group"
                >
                  <LazyImage
                    // src={rp.coverImage}
                    src={`${API_URL}${rp.coverImage}`}
                    alt={rp.title}
                    className="aspect-[4/5] mb-3"
                  />
                  <h3 className="font-display text-lg group-hover:text-brand-500 transition-colors">
                    {rp.title}
                  </h3>
                  <p className="text-sm text-muted">{rp.location}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding text-center bg-gray-900 dark:bg-black text-white">
        <h2 className="heading-section text-white mb-4">Love This Style?</h2>
        <p className="text-gray-400 mb-8">
          Book a similar session and let's create something extraordinary
          together.
        </p>
        <Link
          to={`/book?type=${project.category?.name || ""}`}
          className="btn-primary bg-white text-gray-900"
        >
          Book Similar Session
        </Link>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={gallery}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={(dir) =>
              setLightboxIndex(
                (prev) => (prev + dir + gallery.length) % gallery.length,
              )
            }
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;
