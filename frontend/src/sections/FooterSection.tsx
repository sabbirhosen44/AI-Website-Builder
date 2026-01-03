import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-gray-900 border-t border-white/5">
      {/* Background Logo */}
      <div className="absolute -bottom-32 -left-80 opacity-5 w-full h-full pointer-events-none">
        <Sparkles className="w-96 h-96 text-gray-800" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-12 md:pt-16 pb-6 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12  gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-5">
            <Link
              to="/"
              className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity w-fit"
            >
              <img
                src={Logo}
                alt="AI Builder Logo"
                width={68}
                height={26}
                className="h-6 sm:h-7 w-auto"
              />
              <span className="font-bold text-lg sm:text-xl text-white">
                AI Builder
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 pr-0 lg:pr-8">
              AI Builder is an AI-powered website builder that transforms your
              ideas into production-ready code instantly. Build, customize, and
              deploy beautiful websites in seconds.
            </p>
          </div>

          {/* Company Links */}
          <div className="md:col-span-3">
            <h2 className="font-semibold mb-4 text-white text-base">Company</h2>
            <div className="flex flex-col space-y-3 text-sm">
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-colors w-fit"
              >
                About us
              </Link>
              <Link
                to="/careers"
                className="text-gray-400 hover:text-white transition-colors w-fit"
              >
                Careers
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition-colors w-fit"
              >
                Contact us
              </Link>
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors w-fit"
              >
                Privacy policy
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-4 w-full">
            <h2 className="font-semibold text-white mb-4 text-base">
              Subscribe to our newsletter
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              The latest updates, articles, and resources, sent to your inbox
              weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                className="flex-1  p-2 md:p-4 rounded-lg bg-white/5 border border-white/10 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all text-sm"
                type="email"
                placeholder="Enter your email"
                aria-label="Email for newsletter"
              />
              <button
                className=" p-2 sm:p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all text-white rounded-lg font-medium whitespace-nowrap text-sm shadow-lg shadow-purple-500/25"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-white/5 mt-12">
          <p className="text-center sm:text-left text-xs sm:text-sm text-gray-500">
            Copyright {new Date().getFullYear()} ©{" "}
            <span className="text-white font-medium">AI Builder</span>. All
            Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-gray-500 text-xs sm:text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
