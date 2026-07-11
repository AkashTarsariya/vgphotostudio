import { FadeIn } from "../ui/Animations";
import LazyImage from "../ui/LazyImage";
import { Instagram } from "lucide-react";

const instagramPosts = [
  "/images/hero-slider/01.jpg",
  "/images/hero-slider/02.jpg",
  "/images/hero-slider/03.jpg",
  "/images/hero-slider/06.jpg",
  "/images/hero-slider/05.jpg",
  "/images/hero-slider/Hetansh.jpg",
  "/images/hero-slider/07.jpg",
  "/images/hero-slider/08.jpg",
  "/images/hero-slider/09.jpg",
];

const InstagramFeed = () => (
  // <section className="section-padding bg-gray-50 dark:bg-gray-950">
  // <section className="section-padding bg-[#f0eae0] dark:bg-[#f0eae0]">
  //   <div className="container-custom">
  //     <FadeIn className="text-center mb-12">
  //       <span className="text-sm tracking-[0.3em] uppercase text-brand-500 mb-4 block">
  //         Follow Along
  //       </span>
  //       <h2 className="heading-section mb-4">@vgphotostudio</h2>
  //       <a
  //         href={
  //           import.meta.env.VITE_INSTAGRAM_URL ||
  //           "https://www.instagram.com/vg_photostudio?igsh=MTg2eW1tbWV0bjU3Yw=="
  //         }
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="inline-flex items-center gap-2 text-muted hover:text-brand-500 transition-colors"
  //       >
  //         <Instagram size={18} />
  //         Follow on Instagram
  //       </a>
  //     </FadeIn>

  //     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
  //       {instagramPosts.map((img, i) => (
  //         <FadeIn key={i} delay={i}>
  //           <a
  //             href={import.meta.env.VITE_INSTAGRAM_URL || "#"}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="block group relative overflow-hidden aspect-square"
  //           >
  //             <LazyImage
  //               src={img}
  //               alt={`Instagram post ${i + 1}`}
  //               className="w-full h-full"
  //             />
  //             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
  //               <Instagram size={24} className="text-white" />
  //             </div>
  //           </a>
  //         </FadeIn>
  //       ))}
  //     </div>
  //   </div>
  // </section>
  <section className="section-padding bg-[#f0eae0]">
    {/* <div className="container-custom"> */}
    {/* <div className="max-w-7xl mx-auto pt-20 px-6"> */}
    {/* <div className="w-full px-6 lg:px-12 pt-20 "> */}
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20">
      {/* <div className="grid lg:grid-cols-2 gap-20 items-center"> */}
      {/* <div className="grid lg:grid-cols-[685px_1fr] gap-28 items-center"> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT - Instagram Grid */}
        <FadeIn>
          {/* <div className="grid grid-cols-3 gap-1 max-w-xl mx-auto"> */}
          {/* <div className="grid grid-cols-3 gap-[2px] w-[700px] "> */}
          <div className="grid grid-cols-3 gap-1 w-full max-w-[700px] mx-auto">
            {instagramPosts.map((img, i) => (
              <a
                key={i}
                href={
                  import.meta.env.VITE_INSTAGRAM_URL ||
                  "https://www.instagram.com/vg_photostudio/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden"
              >
                <LazyImage
                  src={img}
                  alt={`Instagram ${i + 1}`}
                  // className="w-full h-52 object-cover transition duration-700 group-hover:scale-110"
                  className="w-full aspect-square object-cover transition duration-700 group-hover:scale-110"
                />
              </a>
            ))}
          </div>
        </FadeIn>

        {/* RIGHT - Content */}
        <FadeIn delay={2}>
          {/* <div className="text-center lg:text-left"> */}
          {/* <div className="max-w-xl text-center lg:text-left"> */}
          <div className="w-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <span className="uppercase tracking-[0.35em] text-brand-500 text-sm">
              Follow Along
            </span>

            {/* <h2 className="font-display text-5xl lg:text-6xl mt-8 mb-8 leading-tight"> */}
            {/* <h2 className="font-display text-[52px] leading-[72px] tracking-tight mt-6 mb-8"> */}
            <h2
              className="
font-display
text-4xl
sm:text-5xl
lg:text-6xl
leading-tight
mt-6
mb-6
"
            >
              Join Our Visual Journey
            </h2>

            <p className="text-[17px] text-gray-500 lg:text-left leading-[42px] mb-12">
              Every photograph is a blend of emotion, light, and storytelling
              crafted with care. Follow us to experience moments that turn into
              timeless memories.
              {/* <br />
              <br /> */}
              Follow us to experience moments that turn into timeless memories.
            </p>

            <div className="uppercase tracking-[0.3em] text-gray-400 mb-2">
              Instagram
            </div>

            <a
              href={
                import.meta.env.VITE_INSTAGRAM_URL ||
                "https://www.instagram.com/vg_photostudio/"
              }
              target="_blank"
              rel="noopener noreferrer"
              // className="inline-flex items-center gap-3 text-3xl font-semibold hover:text-brand-500 transition"
              className="inline-flex items-center gap-3 text-2xl sm:text-3xl lg:text-4xl font-medium font-display"
            >
              @vgphotostudio
              <Instagram size={28} />
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

export default InstagramFeed;
