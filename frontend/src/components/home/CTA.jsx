import { Link } from "react-router-dom";
import { FadeIn } from "../ui/Animations";

const CTA = () => (
  <section className="relative pt-32 pb-32 overflow-hidden">
    <img
      src="/images/BIRTHDAY/HetANSH/covor hetansh.jpg.jpeg"
      alt="Book your photography session"
      className="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-black/40" />
    <div className="relative z-10 container-custom text-center text-white px-4">
      <FadeIn>
        <h2 className="heading-display mb-6">
          Ready to Create <em className="italic">Magic</em>?
        </h2>
        <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-10">
          Let's turn your vision into timeless photographs. Book your session
          today and experience photography at its finest.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/book"
            className="btn-primary bg-white text-gray-900 hover:bg-brand-100"
          >
            Book Your Session
          </Link>
          <Link
            to="/contact"
            className="btn-outline border-white text-white hover:bg-white hover:text-gray-900"
          >
            Get in Touch
          </Link>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default CTA;
