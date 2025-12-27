import LenisScroll from "@/components/Lenis";
import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const RootLayout = () => {
  const { pathname } = useLocation();
  const hideNavbar =
    (pathname.startsWith("/projects") && pathname !== "/projects") ||
    pathname.startsWith("/view/") ||
    pathname.startsWith("/preview/");

  return (
    <div className="w-full overflow-x-hidden">
      {!hideNavbar && <Navbar />}
      <LenisScroll />

      <main className="w-full">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default RootLayout;
