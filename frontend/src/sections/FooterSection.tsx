import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 w-full text-sm text-gray-400 bg-gray-900 border-t border-white/5 pt-12 sm:pt-16 pb-6 sm:pb-8">
      {/* Background Logo */}
      <div className="absolute -bottom-32 -left-80 opacity-5 w-full h-full pointer-events-none -z-10">
        <Sparkles className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-14 relative z-10">
        {/* Brand Section */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src={Logo}
                alt="Logo"
                width={68}
                height={26}
                className="h-6 sm:h-7 w-auto"
              />
              <span className="font-bold text-lg sm:text-xl text-white">
                AI Builder
              </span>
            </Link>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 max-w-md">
            AI Builder is an AI-powered website builder that transforms your
            ideas into production-ready code instantly. Build, customize, and
            deploy beautiful websites in seconds.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col lg:items-center lg:justify-center">
          <div className="flex flex-col text-sm space-y-2.5 sm:space-y-3">
            <h2 className="font-semibold mb-2 sm:mb-3 text-white text-base">
              Company
            </h2>
            <Link to="#" className="hover:text-white transition-colors">
              About us
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Careers
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Contact us
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Privacy policy
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="font-semibold text-white mb-4 sm:mb-5 text-base">
            Subscribe to our newsletter
          </h2>
          <div className="text-sm space-y-4 sm:space-y-6 max-w-sm">
            <p className="text-gray-400">
              The latest updates, articles, and resources, sent to your inbox
              weekly.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0">
              <input
                className="rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-white/5 border border-white/10 sm:border-r-0 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 w-full h-11 px-4 text-white placeholder-gray-500 transition-colors text-sm"
                type="email"
                placeholder="Enter your email"
                aria-label="Email for newsletter"
              />
              <button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all px-5 h-11 text-white rounded-lg sm:rounded-l-none sm:rounded-r-lg font-medium whitespace-nowrap text-sm"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 sm:py-6 border-t border-white/5 mt-8 sm:mt-12 relative z-10">
        <p className="text-center md:text-left text-xs sm:text-sm text-gray-500">
          Copyright 2025 ©{" "}
          <span className="text-white font-medium">AI Builder</span> All Rights
          Reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-gray-500 text-xs sm:text-sm">
          <Link
            to="#"
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            Privacy Policy
          </Link>
          <Link
            to="#"
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            Terms of Service
          </Link>
          <Link
            to="#"
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
