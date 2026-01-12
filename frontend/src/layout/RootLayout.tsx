import Navbar from "@/components/Navbar";
import { Providers } from "@/providers";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

const RootLayout = () => {
  const { pathname } = useLocation();
  const hideNavbar =
    (pathname.startsWith("/projects") && pathname !== "/projects") ||
    pathname.startsWith("/view/") ||
    pathname.startsWith("/preview/");

  return (
    <Providers>
      <div className="w-full overflow-x-hidden">
        <Toaster />
        {!hideNavbar && <Navbar />}

        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </Providers>
  );
};

export default RootLayout;
