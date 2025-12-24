import LenisScroll from "@/components/Lenis";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <LenisScroll />

      <main className="w-full">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default RootLayout;
