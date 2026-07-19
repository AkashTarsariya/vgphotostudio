import { Link } from "react-router-dom";
import { FadeIn } from "../ui/Animations";
import { Award, Heart, Star } from "lucide-react";
import { Camera } from "lucide-react";

const Intro = () => (
  <section className="section-padding">
    <div className="container-custom">
      <section className="about-showcase">
        <div className="left-image">
          {/* <img src="/images/about-left.jpg" alt="Bride" /> */}
          <img src="/images/BIRTHDAY/HetANSH/post4.jpg" alt="Bride" />
        </div>

        <div className="center-content">
          {/* <div className="heading">
            <h2>
              WHERE MEMORIES
              <br />
              FIND THEIR MODERN
            </h2>

            <span className="script">masterpiece</span>
          </div> */}

          <div className="about-brand">
            <div className="premium-label">
              <Camera size={16} className="camera-icon" />
              <span>PREMIUM PHOTOGRAPHY</span>
            </div>

            <h2 className="brand-title">
              <span className="brand-white">VG PHOTO</span>
              <span className="brand-gold">STUDIO</span>
            </h2>
          </div>

          <div className="description">
            <p class="text-[17px] text-gray-500 lg:text-left leading-8 lg:leading-[42px] mb-6 lg:mb-12">
              Recognised for delivering premium wedding and lifestyle
              photography, VG PHOTOSTUDIO has built a reputation for capturing
              emotions with elegance, creativity, and authenticity. our journey
              has been driven by a passion for preserving life's most meaningful
              moments through timeless imagery, artistic storytelling, and
              cinematic excellence. every frame is thoughtfully crafted to
              reflect genuine emotions, beautiful connections, and unforgettable
              memories that will be cherished for generations.
            </p>
            {/* <p>
              Recognised as a leading voice in modern wedding photography and
              filmmaking, VG PHOTOSTUDIO has spent years shaping a visual style
              that blends emotion, artistry and cinematic elegance.
            </p> */}

            <p class="text-[17px] text-gray-500 lg:text-left leading-8 lg:leading-[42px] mb-6 lg:mb-12">
              Our journey has given us the privilege of creating photographs
              that become treasured heirlooms crafted with intention, depth and
              heart.
            </p>

            <p class="text-[17px] text-gray-500 lg:text-left leading-8 lg:leading-[42px] mb-6 lg:mb-12">
              We don't just document weddings. We create memories that live
              forever.
            </p>
          </div>
        </div>

        {/* <div className="right-image">
          <img src="/images/about-right.jpg" alt="Couple" />
        </div> */}
      </section>

      {/* <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <FadeIn>
          <div className="relative">
            <img
              // src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"
              src="/images/Team Members/Vivek.jpeg"
              alt="VG PHOTOSTUDIO photographer at work"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 hidden md:block">
              <img
                src="/images/Team Members/Dhruv.jpeg"
                alt="Behind the scenes"
                className="w-full h-full object-cover border-4 border-white dark:border-gray-900 shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={2}>
          <span className="text-sm tracking-[0.3em] uppercase text-brand-500 mb-4 block">
            About the Artist
          </span>
          <h2 className="heading-section mb-6">
            Where Vision Meets <em className="italic">Emotion</em>
          </h2>
          <p className="text-muted leading-relaxed mb-6">
            At VG PHOTOSTUDIO, we believe photography is more than capturing
            images — it's about preserving the raw, beautiful emotions that make
            life's moments unforgettable. With over a decade of experience,
            we've had the privilege of documenting hundreds of love stories,
            celebrations, and creative visions.
          </p>
          <p className="text-muted leading-relaxed mb-8">
            Our approach blends cinematic storytelling with editorial precision,
            ensuring every photograph feels like a work of art you'll treasure
            for generations.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: Award,
                label: "10+ Awards",
                value: "Industry Recognition",
              },
              { icon: Heart, label: "1000+ Clients", value: "Happy Couples" },
              { icon: Star, label: "10+ Years", value: "Experience" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon size={24} className="mx-auto mb-2 text-brand-500" />
                <p className="font-display text-lg">{label}</p>
                <p className="text-xs text-muted">{value}</p>
              </div>
            ))}
          </div>

          <Link to="/about" className="btn-outline">
            Our Story
          </Link>
        </FadeIn>
      </div> */}
    </div>
  </section>
);

export default Intro;
