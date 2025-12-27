import { User } from "lucide-react";

export default function PreviewPanel() {
  return (
    <div className="hidden lg:flex flex-1 flex-col bg-white overflow-hidden">
      <nav className="border-b border-gray-200 bg-white px-8 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h2 className="text-2xl font-bold">LOGO</h2>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Testimonials
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Contact
              </a>
            </div>
          </div>
          <button className="size-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <User className="size-5 text-gray-600" />
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-20 text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            Excellence in
            <br />
            Minimalism
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the power of clean design and high contrast aesthetics
          </p>
          <button className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium transition-colors">
            Get Started Today
          </button>
          <div className="pt-32 space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold">
              Simplicity That Speaks Volumes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our design philosophy focuses on what matters most. By eliminating
              distractions and focusing on essential elements, we create
              experiences that are not only beautiful but also highly effective.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
