import { useState, useEffect } from "react";
import { FadeIn } from "../ui/Animations";
import { Star, Quote } from "lucide-react";
import api from "../../services/api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    api
      .get("/testimonials?featured=true&limit=3")
      .then(({ data }) => setTestimonials(data.data))
      .catch(() => setTestimonials([]));
  }, []);

  const fallback = [
    {
      clientName: "Priya & Rahul",
      clientRole: "Wedding Clients",
      content:
        "VG PHOTOSTUDIO captured our wedding day beyond our wildest dreams. Every frame tells our story beautifully.",
      rating: 5,
    },
    {
      clientName: "Ananya Sharma",
      clientRole: "Fashion Model",
      content:
        "The editorial quality of the images elevated my portfolio significantly. An incredible experience.",
      rating: 5,
    },
    {
      clientName: "The Mehta Family",
      clientRole: "Birthday Celebration",
      content:
        "They made our daughter's birthday so special. The photos are vibrant, creative, and full of joy.",
      rating: 5,
    },
  ];

  const items = testimonials.length ? testimonials : fallback;

  return (
    <section className="py-28 bg-[#111827] text-white relative overflow-hidden">
      <div className="container-custom">
        {/* <FadeIn className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] uppercase text-brand-400 mb-4 block">
            Client Love
          </span>
          <h2 className="heading-section text-white mb-4">
            What Our Clients Say
          </h2>
        </FadeIn> */}

        <FadeIn className="text-center mb-20">
          <span className="text-sm tracking-[0.35em] uppercase text-brand-400 block mb-5">
            CLIENT TESTIMONIALS
          </span>

          <h2 className="font-display text-5xl lg:text-6xl text-white mb-6">
            Loved by
            <span className="text-brand-300"> Happy Clients</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-8">
            Every celebration has a story. Here's what our wonderful clients say
            about their experience with us VG PHOTOSTUDIO.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((t, i) => (
            <FadeIn key={t._id || t.clientName} delay={i}>
              {/* <div className="glass-dark p-8 h-full flex flex-col">
                <Quote size={32} className="text-brand-400 mb-4 opacity-50" />
                <p className="text-gray-300 leading-relaxed flex-1 mb-6 italic">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="fill-brand-400 text-brand-400"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-medium">{t.clientName}</p>
                  <p className="text-sm text-gray-500">
                    {t.clientRole || t.eventType}
                  </p>
                </div>
              </div> */}

              <div className="relative bg-[#0E1320] border border-white/10 rounded-2xl p-8 h-full transition-all duration-500 hover:-translate-y-3 hover:border-brand-400 hover:shadow-2xl">
                <Quote size={42} className="text-brand-400 opacity-80 mb-6" />

                <p className="text-gray-300 italic leading-8 text-lg flex-1">
                  "{t.content}"
                </p>

                <div className="flex gap-1 mt-8 mb-6">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="fill-brand-400 text-brand-400"
                    />
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-brand-400 text-black font-bold flex items-center justify-center text-lg">
                    {t.clientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white">
                      {t.clientName}
                    </h4>

                    <p className="text-gray-400">
                      {t.clientRole || t.eventType}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
