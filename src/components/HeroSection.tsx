import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-drone-removebg-preview.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-cyber font-black leading-tight">
                <span className="text-black animate-neon-flicker">DRONES</span>
                <br />
                <span className="text-black">DO</span>
                <br />
                <span className="text-neon-red">FUTURO</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground font-tech max-w-2xl text-black">
                Descubra a nova era da tecnologia de drones com designs cyberpunk e performance revolucionária.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-cyber group text-lg px-8 py-4">
                Explorar Catálogo
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button variant="outline" className="btn-cyber-red text-lg px-8 py-4 group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Ver Demo
              </Button>
            </div>

            {/* Stats */}
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative group">
              <img
                src={heroImage}
                alt="Drone Futurista DRONES Xag"
                className="w-full h-auto max-w-2xl mx-auto"
              />

              {/* Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-lg blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-transparent rounded-lg blur-xl"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-primary rounded-full animate-ping"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
