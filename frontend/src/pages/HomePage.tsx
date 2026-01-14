import Footer from "@/sections/FooterSection";
import BuildProcess from "@/sections/BuildProcessSection";
import CallToAction from "@/sections/CallToActionSection";
import FeaturesSection from "@/sections/FeaturesSection";
import HeroSection from "@/sections/HeroSection";
import OurTestimonials from "@/sections/OurTestimonialsSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <BuildProcess />
      <OurTestimonials />
      <CallToAction />
      <Footer />
    </>
  );
};

export default Home;
