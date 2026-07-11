import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  "/images/hero-slider/01.jpg",
  "/images/hero-slider/02.jpg",
  "/images/hero-slider/03.jpg",
  //   "/images/hero-slider/04.jpg",
  "/images/hero-slider/05.jpg",
];

export default function HeroSlider() {
  return (
    // <section className="relative h-screen">
    // <section className="relative h-screen">
    <section className="relative h-[100svh] min-h-[700px]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="h-full"
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen">
              {/* <img src={image} className="w-full h-full object-cover" alt="" /> */}
              <div className="hero-slide w-full h-full overflow-hidden">
                <img
                  src={image}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/35"></div>

              {/* Hero Text */}
              {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className="text-6xl font-display">VG PHOTOSTUDIO</h1>

                <p className="mt-6 text-lg">Capturing Timeless Memories</p>
              </div> */}

              {/* Hero Content */}
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center justify-center gap-2 mb-6"
                  >
                    <Camera size={20} className="text-brand-300" />
                    <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-brand-200">
                      Premium Photography
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="
        font-display
        text-5xl
        sm:text-6xl
        md:text-7xl
        lg:text-8xl
        font-medium
        tracking-tight
        leading-none
        mb-6
      "
                  >
                    VG PHOTO<span className="text-brand-300">STUDIO</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="
        text-base
        sm:text-lg
        md:text-xl
        text-gray-200
        font-light
        max-w-2xl
        mx-auto
        mb-10
        leading-relaxed
      "
                  >
                    Capturing life's most precious moments with cinematic
                    artistry, timeless elegance, and uncompromising quality.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <Link
                      to="/portfolio"
                      className="btn-primary bg-white text-gray-900 hover:bg-brand-100"
                    >
                      View Portfolio
                    </Link>

                    <Link
                      to="/book"
                      className="btn-outline border-white text-white hover:bg-white hover:text-gray-900"
                    >
                      Book a Session
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
