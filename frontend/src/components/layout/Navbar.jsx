import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHome = location.pathname === "/";
  const transparentNavbar = isHome && !scrolled;

  return (
    // <header
    //   className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    //     scrolled || !isHome ? "glass shadow-sm py-3" : "bg-transparent py-5"
    //   }`}
    // >
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-[#f0eae0]/50 backdrop-blur-2xl border-b border-white/30 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="container-custom flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* <Link
          to="/"
          className="font-display text-xl md:text-2xl tracking-[0.2em] font-medium"
        > */}
        <Link
          to="/"
          className={`font-display text-xl md:text-2xl tracking-[0.2em] font-medium transition-colors ${
            transparentNavbar ? "text-white" : "text-gray-900 dark:text-white"
          }`}
        >
          VG <span className="text-brand-500">PHOTO</span>STUDIO
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              // className={({ isActive }) =>
              //   `text-sm tracking-widest uppercase transition-colors hover:text-brand-500 ${
              //     isActive
              //       ? "text-brand-500"
              //       : "text-gray-700 dark:text-gray-300"
              //   }`
              // }
              className={({ isActive }) =>
                `text-sm tracking-widest uppercase transition-colors ${
                  isActive
                    ? "text-brand-500"
                    : transparentNavbar
                      ? "text-white hover:text-brand-300"
                      : "text-gray-700 dark:text-gray-300 hover:text-brand-500"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* <button
            onClick={toggleTheme}
            // className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            className={`p-2 rounded-full transition-colors ${
              transparentNavbar
                ? "text-white hover:bg-white/10"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button> */}

          {/* <Link
            to="/book"
            className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-6"
          >
            Book Now
          </Link> */}

          {/* <a
            href={`https://wa.me/${
              import.meta.env.VITE_WHATSAPP_NUMBER || "919876543210"
            }?text=${encodeURIComponent(
              "Hi VG PHOTOSTUDIO! I would like to inquire about your photography services.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center gap-2
  bg-[#9A7D66]
  text-white
  px-7 py-3
  rounded-md
  shadow-lg
  hover:shadow-xl
  hover:bg-[#876B57]
  hover:-translate-y-0.5
  transition-all duration-300"
          >
            Inquire Now
          </a> */}

          {/* <a
            href={`https://wa.me/${
              import.meta.env.VITE_WHATSAPP_NUMBER || "919876543210"
            }?text=${encodeURIComponent(
              "Hi VG PHOTOSTUDIO! I would like to inquire about your photography services.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
    hidden sm:inline-flex
    items-center
    justify-center
    px-10
    py-4
    border
    border-white
    text-white
    text-lg
    font-semibold
    tracking-wide
    bg-transparent
    backdrop-blur-sm
    transition-all
    duration-300
    hover:bg-white
    hover:text-black
    hover:shadow-xl
  "
          >
            Inquire Now
          </a> */}

          <a
            href={`https://wa.me/${
              import.meta.env.VITE_WHATSAPP_NUMBER || "919876543210"
            }?text=${encodeURIComponent(
              "Hi VG PHOTOSTUDIO! I would like to inquire about your photography services.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`
    hidden sm:inline-flex
    items-center
    justify-center
    gap-2
    px-6
    py-3
    rounded-md
    border-2
    text-sm
    font-medium
    tracking-[0.15em]
    uppercase
    transition-all
    duration-300
    backdrop-blur-md
    hover:scale-105
    ${
      transparentNavbar
        ? `
          border-white/80
          text-white
          bg-white/10
          hover:bg-white
          hover:text-black
          hover:border-white
        `
        : `
          border-[#B08D66]
          text-gray-700
          dark:text-gray-300
          bg-transparent
          hover:bg-[#B08D66]
          hover:text-white
          hover:border-[#B08D66]
          hover:shadow-xl
        `
    }
  `}
          >
            INQUIRE NOW
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            // className="lg:hidden p-2"
            className={`lg:hidden p-2 transition-colors ${
              transparentNavbar
                ? "text-white"
                : "text-gray-700 dark:text-gray-300"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-gray-200/20"
          >
            <div className="container-custom px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-lg tracking-widest uppercase py-2 ${
                      isActive ? "text-brand-500" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {/* <Link to="/book" className="btn-primary text-center mt-2">
                Book Now
              </Link> */}
              {/* <Link
                to="/book"
                className="hidden sm:inline-flex items-center justify-center
             bg-[#9A7D66]
             text-white
             px-7 py-3
             rounded-md
             shadow-lg
             hover:shadow-xl
             hover:bg-[#876B57]
             hover:-translate-y-0.5
             transition-all duration-300"
              >
                Book Now
              </Link> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
