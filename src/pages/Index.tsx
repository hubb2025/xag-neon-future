import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DroneCarousel from "@/components/DroneCarousel";
import AboutSection from "@/components/AboutSection";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <DroneCarousel />
        <AboutSection />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;