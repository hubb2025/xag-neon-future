import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-drone.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-dark">
      {/* Advanced Cyberpunk Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="cyber-lines absolute inset-0"></div>
      <div className="cyber-corner absolute inset-0"></div>
      <div className="cyber-circuit absolute inset-0"></div>
      <div className="cyber-matrix absolute inset-0"></div>
      
      {/* Data Streams */}
      <div className="cyber-data-stream"></div>
      <div className="cyber-data-stream"></div>
      <div className="cyber-data-stream"></div>
      <div className="cyber-data-stream"></div>
      <div className="cyber-data-stream"></div>
      
      {/* Geometric Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 cyber-hexagon opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-secondary/30 rotate-45 animate-cyber-pulse"></div>
      <div className="absolute top-1/2 right-10 w-2 h-20 bg-gradient-to-b from-primary via-transparent to-secondary opacity-50"></div>
      <div className="absolute bottom-10 left-1/3 w-40 h-2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
      
      {/* Additional Cyber Elements */}
      <div className="absolute top-32 right-32 w-16 h-16 border border-primary/40 transform rotate-45"></div>
      <div className="absolute bottom-32 left-16 w-12 h-12 cyber-hexagon opacity-40"></div>
      <div className="absolute top-64 left-64 w-1 h-32 bg-gradient-to-b from-secondary to-transparent opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-cyber font-black leading-tight">
                <span className="text-neon-green animate-neon-flicker">DRONES</span>
                <br />
                <span className="text-foreground">DO</span>
                <br />
                <span className="text-neon-red">FUTURO</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground font-tech max-w-2xl">
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
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-cyber font-bold text-neon-green">50+</div>
                <div className="text-sm text-muted-foreground font-tech uppercase tracking-wide">Modelos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-cyber font-bold text-neon-red">24/7</div>
                <div className="text-sm text-muted-foreground font-tech uppercase tracking-wide">Suporte</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-cyber font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground font-tech uppercase tracking-wide">Garantia</div>
              </div>
            </div>
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

      {/* Bottom Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronRight className="h-8 w-8 text-primary animate-bounce rotate-90" />
      </div>
    </section>
  );
};

export default HeroSection;