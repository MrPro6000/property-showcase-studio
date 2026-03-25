import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import StatsBar from "@/components/StatsBar";
import Services from "@/components/Services";
import FeaturedProperties from "@/components/FeaturedProperties";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Navbar />
    <HeroSlider />
    <StatsBar />
    <Services />
    <FeaturedProperties />
    <AboutSection />
    <Testimonials />
    <ContactSection />
    <Footer />
  </>
);

export default Index;
