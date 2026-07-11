import { Link } from "react-router-dom";
import { Camera, Users, Target, Eye, Award, Heart, Star } from "lucide-react";
import SEO from "../components/ui/SEO";
import { FadeIn } from "../components/ui/Animations";
import Intro from "../components/home/Intro";

const timeline = [
  {
    year: "2014",
    title: "The Beginning",
    desc: "VG PHOTOSTUDIO founded with a passion for storytelling through light.",
  },
  {
    year: "2017",
    title: "First Award",
    desc: "Recognized as Emerging Wedding Photographer of the Year.",
  },
  {
    year: "2019",
    title: "Studio Expansion",
    desc: "Opened our flagship studio in Bandra West, Mumbai.",
  },
  {
    year: "2022",
    title: "500+ Clients",
    desc: "Celebrated documenting over 500 love stories and events.",
  },
  {
    year: "2024",
    title: "Industry Leader",
    desc: "Named among India's Top 10 Wedding Photographers.",
  },
];

// const team = [
//   {
//     name: "Vivek Ghoghari",
//     role: "Lead Photographer & Founder",
//     img: "https://images.unsplash.com/photo-1507003211169-e69fe0eb8f46?w=400&q=80",
//   },
//   {
//     name: "Dhruv Ghoghari",
//     role: "Photographer & Vedio Editor",
//     img: "frontend/public/images/Team Members/Dhruv.jpeg",
//   },
//   // { name: 'Rohan Mehta', role: 'Senior Retoucher', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
// ];

const team = [
  {
    name: "Vivek Ghoghari",
    role: "Lead Photographer & Founder",
    img: "/images/Team Members/Vivek.jpeg",
  },
  {
    name: "Dhruv Ghoghari",
    role: "Photographer & Video Editor",
    img: "/images/Team Members/Dhruv.jpeg",
  },
];

const equipment = [
  "Sony A7R V",
  "Canon EOS R5",
  "Profoto B10 Plus",
  "Godox AD600 Pro",
  "Sigma 85mm f/1.4",
  "Sony 24-70mm f/2.8 GM",
  "DJI Mavic 3 Pro",
  "Manfrotto Carbon Tripod",
];

const About = () => (
  <>
    <SEO
      title="About Us"
      description="Learn about VG PHOTOSTUDIO — our story, team, equipment, and passion for premium photography."
    />

    <section className="relative h-[10vh] min-h-[400px] flex items-end">
      <img
        src="/images/hero-slider/our-story.png"
        alt="About VG PHOTOSTUDIO"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#F0EAE0]/100 to-black/0" />
      <div className="relative z-10 container-custom section-padding pb-100px text-gray-700">
        <h1 className="heading-display">Our Story</h1>
      </div>
    </section>

    {/* <section className="section-padding">
      <div className="container-custom max-w-4xl">
        <FadeIn>
          <p className="text-lg text-muted leading-relaxed mb-6">
            VG PHOTOSTUDIO was born from a simple belief: every moment deserves
            to be remembered beautifully. What started as a one-person passion
            project has evolved into a premier photography studio trusted by
            hundreds of couples, brands, and families across India.
          </p>
          <p className="text-lg text-muted leading-relaxed">
            We don't just take photographs — we craft visual narratives. Our
            team combines technical mastery with an artist's eye, delivering
            images that feel cinematic, timeless, and deeply personal.
          </p>
        </FadeIn>
      </div>
    </section> */}

    {/* <section className="section-padding bg-gray-50 dark:bg-gray-950"> */}
    {/* <section className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12">
          <FadeIn>
            <Target size={28} className="text-brand-500 mb-4" />
            <h2 className="heading-section mb-4">Our Mission</h2>
            <p className="text-muted leading-relaxed">
              To create photography that transcends the ordinary — images that
              evoke emotion, tell stories, and become heirlooms passed through
              generations.
            </p>
          </FadeIn>
          <FadeIn delay={2}>
            <Eye size={28} className="text-brand-500 mb-4" />
            <h2 className="heading-section mb-4">Our Vision</h2>
            <p className="text-muted leading-relaxed">
              To be recognized as India's most trusted premium photography
              brand, setting the standard for artistry, service, and innovation
              in visual storytelling.
            </p>
          </FadeIn>
        </div>
      </div>
    </section> */}

    {/* <FadeIn delay={2}>
      <span className="text-sm tracking-[0.3em] uppercase text-brand-500 mb-4 block">
        About the Artist
      </span>
      <h2 className="heading-section mb-6">
        Where Vision Meets <em className="italic">Emotion</em>
      </h2>
      <p className="text-muted leading-relaxed mb-6">
        At VG PHOTOSTUDIO, we believe photography is more than capturing images
        — it's about preserving the raw, beautiful emotions that make life's
        moments unforgettable. With over a decade of experience, we've had the
        privilege of documenting hundreds of love stories, celebrations, and
        creative visions.
      </p>
      <p className="text-muted leading-relaxed mb-8">
        Our approach blends cinematic storytelling with editorial precision,
        ensuring every photograph feels like a work of art you'll treasure for
        generations.
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
    </FadeIn> */}

    <section className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
              images — it's about preserving the raw, beautiful emotions that
              make life's moments unforgettable. With over a decade of
              experience, we've had the privilege of documenting hundreds of
              love stories, celebrations, and creative visions.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Our approach blends cinematic storytelling with editorial
              precision, ensuring every photograph feels like a work of art
              you'll treasure for generations.
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
        </div>
      </div>
    </section>

    {/* <section className="section-padding"> */}
    <section className="py-20">
      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <h2 className="heading-section">Our Journey</h2>
        </FadeIn>
        <div className="max-w-2xl mx-auto">
          {timeline.map((item, i) => (
            <FadeIn key={item.year} delay={i}>
              <div className="flex gap-6 pb-10 relative">
                {i < timeline.length - 1 && (
                  <div className="absolute left-[23px] top-12 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />
                )}
                <div className="w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-medium flex-shrink-0 z-10">
                  {item.year.slice(2)}
                </div>
                <div>
                  <h3 className="font-display text-xl mb-1">{item.title}</h3>
                  <p className="text-muted text-sm">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* <section className="section-padding bg-gray-50 dark:bg-gray-950"> */}
    <section className="section-padding bg-[#F0EAE0]">
      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <Users size={28} className="mx-auto text-brand-500 mb-4" />
          <h2 className="heading-section">Meet the Team</h2>
        </FadeIn>
        {/* <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <FadeIn key={member.name} delay={i}>
              <div className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
                  loading="lazy"
                />
                <h3 className="font-display text-xl">{member.name}</h3>
                <p className="text-muted text-sm">{member.role}</p>
              </div>
            </FadeIn>
          ))}
        </div> */}

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 justify-items-center">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i}>
                <div className="text-center group">
                  <img
                    src={member.img}
                    alt={member.name}
                    loading="lazy"
                    className="w-52 h-52 rounded-full object-cover mx-auto
                       border-4 border-[#9A7D66]
                       shadow-xl
                       transition-all duration-500
                       group-hover:scale-105"
                  />

                  <h3 className="font-display text-2xl mt-6">{member.name}</h3>

                  <p className="text-brand-500 mt-2">{member.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-custom">
        <FadeIn className="text-center mb-12">
          <Camera size={28} className="mx-auto text-brand-500 mb-4" />
          <h2 className="heading-section">Our Equipment</h2>
          <p className="text-muted mt-2">
            Professional-grade gear for exceptional results
          </p>
        </FadeIn>
        <div className="flex flex-wrap justify-center gap-3">
          {equipment.map((item) => (
            <span
              key={item}
              className="px-4 py-2 border border-gray-200 dark:border-gray-800 text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding text-center">
      <FadeIn>
        <h2 className="heading-section mb-6">Let's Create Together</h2>
        <Link to="/book" className="btn-primary">
          Book a Session
        </Link>
      </FadeIn>
    </section>
  </>
);

export default About;
