import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";

interface NavLink {
  name: string;
  href: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const navLinks: NavLink[] = [
    { name: "Home", href: "/#home" },
    { name: "Features", href: "/#features" },
    { name: "Process", href: "/#process" },
    { name: "Pricing", href: "/#pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY.current && currentScroll > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 bg-gray-900/50 backdrop-blur-xl border-b border-white/10 transition-transform duration-400 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-3 sm:py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <img
                  src={Logo}
                  alt="Logo"
                  width={68}
                  height={26}
                  className="h-6 sm:h-7 w-auto"
                />
              </div>
              <span className="font-bold text-lg sm:text-xl text-white">
                AI Builder
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-gray-400">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <Link
              to="/login"
              className="px-4 lg:px-6 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/"
              className="px-4 lg:px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/25 text-sm whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="transition active:scale-90 md:hidden text-white p-1"
            aria-label="Open menu"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`flex flex-col items-center justify-center gap-8 text-lg font-medium fixed inset-0 bg-gray-900/98 backdrop-blur-xl z-50 transition-all duration-300 p-6 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-lg bg-white/10 hover:bg-white/20 p-2 text-white transition-colors"
          aria-label="Close menu"
        >
          <XIcon className="w-6 h-6" />
        </button>

        {/* Logo in Mobile Menu */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 flex items-center justify-center">
            <img
              src={Logo}
              alt="Logo"
              width={68}
              height={26}
              className="h-7 w-auto"
            />
          </div>
          <span className="font-bold text-2xl text-white">AI Builder</span>
        </div>

        {/* Mobile Navigation Links */}
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-purple-300 transition-colors text-xl"
          >
            {link.name}
          </Link>
        ))}

        {/* Mobile Buttons */}
        <Link
          to="/login"
          onClick={() => setIsOpen(false)}
          className="px-8 py-3 text-white hover:text-purple-300 transition-colors text-lg"
        >
          Login
        </Link>

        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 text-white rounded-lg font-semibold transition-all shadow-xl shadow-purple-500/25 text-lg"
        >
          Get Started
        </Link>
      </div>

      {/* Spacer */}
      <div className="h-16 sm:h-18" />
    </>
  );
}
