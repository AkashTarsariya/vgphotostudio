import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // <footer className="bg-gray-900 dark:bg-black text-gray-300">
    //   <div className="container-custom section-padding">
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          <div>
            <h3 className="font-display text-2xl text-white tracking-[0.15em] mb-4">
              VG <span className="text-brand-400">PHOTO</span>STUDIO
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Crafting timeless visual stories through premium photography.
              Every frame tells a story worth remembering.
            </p>
            <div className="flex gap-4">
              <a
                href={
                  import.meta.env.VITE_INSTAGRAM_URL ||
                  "https://www.instagram.com/vg_photostudio?igsh=MTg2eW1tbWV0bjU3Yw=="
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.instagram.com/vg_photostudio?igsh=MTg2eW1tbWV0bjU3Yw=="
                className="hover:text-brand-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/vg_photostudio?igsh=MTg2eW1tbWV0bjU3Yw=="
                className="hover:text-brand-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium tracking-widest uppercase text-sm mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 ">
              {[
                "Portfolio",
                "Services",
                "About",
                "Book a Session",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/ /g, "-").replace("book-a-session", "book")}`}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium tracking-widest uppercase text-sm mb-6">
              Services
            </h4>
            <ul className="space-y-3 text-gray-400">
              {/* {['Wedding Photography', 'Pre-Wedding', 'Fashion', 'Corporate', 'Maternity', 'Product'].map((s) => (
                <li key={s}>
                  <Link to="/portfolio" className="hover:text-white transition-colors">{s}</Link>
                </li>
              ))} */}
              {["Wedding Photography"].map((s) => (
                <li key={s}>
                  <Link
                    to="http://localhost:5173/portfolio/pre-wedding-shoot-in-rajasthan"
                    className="hover:text-white transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
              {["Birthday"].map((s) => (
                <li key={s}>
                  <Link
                    to="http://localhost:5173/portfolio/birthday"
                    className="hover:text-white transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium tracking-widest uppercase text-sm mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-brand-400"
                />
                <span>
                  123 VGPHOTOSTUDIO, Shivalik, Nr. Bhumipark Soc, Dabholi Rd,
                  Dabholi, Surat, Gujarat - 395004
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-400" />
                <a
                  href="tel:+91 8140442508"
                  className="hover:text-white transition-colors"
                >
                  Vivek Ghoghari - +91 81404 42508
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-400" />
                <a
                  href="tel:+91 7041649995"
                  className="hover:text-white transition-colors"
                >
                  Dhruv Ghoghari - +91 70416 49995
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-400" />
                <a
                  href="mailto:hello@vgphotostudio.com"
                  className="hover:text-white transition-colors"
                >
                  hello@vgphotostudio.com
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              Mon–Sat: 10:00 AM – 7:00 PM
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} VG PHOTOSTUDIO. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
