import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-drone-removebg-preview.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      
      {/* Cyber Circuit Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse hidden sm:block"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent animate-pulse delay-1000 hidden sm:block"></div>
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent animate-pulse delay-500 hidden sm:block"></div>
        <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-destructive/30 to-transparent animate-pulse delay-1500 hidden sm:block"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-20 left-4 sm:left-20 w-4 h-4 border border-primary/40 rotate-45 animate-float"></div>
        <div className="absolute top-40 right-8 sm:right-32 w-6 h-6 border border-secondary/40 animate-float delay-1000"></div>
        <div className="absolute bottom-32 left-8 sm:left-40 w-3 h-3 bg-accent/30 rotate-45 animate-float delay-500"></div>
        <div className="absolute bottom-20 right-4 sm:right-20 w-5 h-5 border border-destructive/40 rotate-12 animate-float delay-1500"></div>
        
        {/* Larger decorative elements */}
        <div className="absolute top-1/3 left-2 sm:left-10 w-16 sm:w-20 h-16 sm:h-20 border border-primary/20 rotate-45 animate-cyber-pulse"></div>
        <div className="absolute bottom-1/3 right-2 sm:right-10 w-12 sm:w-16 h-12 sm:h-16 border border-secondary/20 animate-cyber-pulse delay-1000"></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/3 w-32 sm:w-40 h-32 sm:h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8 relative">
            {/* Decorative corner elements */}
            <div className="absolute -top-4 sm:-top-8 -left-4 sm:-left-8 w-8 sm:w-16 h-8 sm:h-16 border-l-2 border-t-2 border-primary/40 hidden sm:block"></div>
            <div className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 w-8 sm:w-16 h-8 sm:h-16 border-r-2 border-b-2 border-secondary/40 hidden sm:block"></div>
             
            <div className="space-y-4 lg:space-y-6">
              <div className="relative">
                {/* Animated text glow effect */}
                <div className="absolute inset-0 blur-md hidden md:block">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-cyber font-black leading-tight text-primary/20">
                    DRONES<br />DO<br />FUTURO
                  </h1>
                </div>
                 
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-cyber font-black leading-tight relative">
                  <span className="text-foreground animate-neon-flicker glow-green">DRONES</span>
                  <br />
                  <span className="text-foreground">DO</span>
                  <br />
                  <span className="text-neon-red glow-red">FUTURO</span>
                </h1>
                 
                {/* Scanning line effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full h-2 animate-cyber-scan hidden md:block"></div>
              </div>

              <div className="relative">
                <div className="absolute -left-2 sm:-left-4 top-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent opacity-60 hidden sm:block"></div>
                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-tech max-w-2xl pl-0 sm:pl-8 relative">
                  Descubra a nova era da tecnologia de drones com designs cyberpunk e performance revolucionária.
                  <span className="absolute -right-1 sm:-right-2 top-0 w-2 h-2 bg-primary animate-ping hidden sm:block"></span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 relative">
              <div className="absolute -top-2 -left-2 w-4 h-4 border border-primary/50 hidden sm:block"></div>
              <Button className="btn-cyber group text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative">Explorar Catálogo</span>
                <ChevronRight className="ml-2 h-4 lg:h-5 w-4 lg:w-5 group-hover:translate-x-1 transition-transform relative" />
              </Button>

              <Button variant="outline" className="btn-cyber-red text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-destructive/20 to-primary/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Play className="mr-2 h-4 lg:h-5 w-4 lg:w-5 group-hover:scale-110 transition-transform relative" />
                <span className="relative">Ver Demo</span>
              </Button>
            </div>

            {/* Tech Stats */}
            <div className="flex gap-4 lg:gap-8 pt-4">
              <div className="text-center relative">
                <div className="absolute inset-0 bg-primary/5 blur-xl"></div>
                <div className="text-xl lg:text-2xl font-cyber font-bold text-primary relative">50+</div>
                <div className="text-xs lg:text-sm text-muted-foreground relative">Modelos</div>
              </div>
              <div className="text-center relative">
                <div className="absolute inset-0 bg-secondary/5 blur-xl"></div>
                <div className="text-xl lg:text-2xl font-cyber font-bold text-secondary relative">99.9%</div>
                <div className="text-xs lg:text-sm text-muted-foreground relative">Precisão</div>
              </div>
              <div className="text-center relative">
                <div className="absolute inset-0 bg-accent/5 blur-xl"></div>
                <div className="text-xl lg:text-2xl font-cyber font-bold text-accent relative">24/7</div>
                <div className="text-xs lg:text-sm text-muted-foreground relative">Suporte</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative order-first lg:order-last">
            {/* Hexagonal frame */}
            <div className="absolute inset-0 scale-110 hidden md:block">
              <div className="cyber-hexagon opacity-30"></div>
            </div>
            
            {/* Main image container */}
            <div className="relative group">
              {/* Multiple layered glow effects */}
              <div className="absolute inset-0 bg-gradient-radial from-primary/30 via-transparent to-transparent rounded-full blur-3xl scale-150 group-hover:scale-[1.6] transition-transform duration-1000 hidden md:block"></div>
              <div className="absolute inset-0 bg-gradient-radial from-secondary/20 via-transparent to-transparent rounded-full blur-2xl scale-125 group-hover:scale-[1.4] transition-transform duration-1000 delay-200 hidden md:block"></div>
              
              {/* Scanning rings */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping scale-110 hidden md:block"></div>
              <div className="absolute inset-0 border border-secondary/30 rounded-full animate-pulse scale-125 hidden md:block"></div>
              
              <img
                src={heroImage}
                alt="Drone Futurista DRONES Xag - Tecnologia avançada com design cyberpunk"
                className="w-full h-auto max-w-2xl mx-auto relative z-10 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
              />

              {/* Circuit patterns around image - hidden on mobile */}
              <div className="absolute top-0 left-1/2 w-px h-10 lg:h-20 bg-gradient-to-b from-primary to-transparent -translate-x-1/2 -translate-y-5 lg:-translate-y-10 hidden md:block"></div>
              <div className="absolute bottom-0 left-1/2 w-px h-10 lg:h-20 bg-gradient-to-t from-secondary to-transparent -translate-x-1/2 translate-y-5 lg:translate-y-10 hidden md:block"></div>
              <div className="absolute left-0 top-1/2 h-px w-10 lg:w-20 bg-gradient-to-r from-accent to-transparent -translate-y-1/2 -translate-x-5 lg:-translate-x-10 hidden md:block"></div>
              <div className="absolute right-0 top-1/2 h-px w-10 lg:w-20 bg-gradient-to-l from-destructive to-transparent -translate-y-1/2 translate-x-5 lg:translate-x-10 hidden md:block"></div>
            </div>

            {/* Enhanced Floating Elements - hidden on mobile */}
            <div className="absolute -top-4 lg:-top-8 -right-4 lg:-right-8 w-8 lg:w-12 h-8 lg:h-12 border-2 border-primary rounded-full animate-ping hidden md:block">
              <div className="absolute inset-2 bg-primary rounded-full animate-pulse"></div>
            </div>
            <div className="absolute -bottom-4 lg:-bottom-8 -left-4 lg:-left-8 w-6 lg:w-8 h-6 lg:h-8 bg-secondary rounded-full animate-pulse glow-green hidden md:block">
              <div className="absolute inset-1 border border-background rounded-full"></div>
            </div>
            
            {/* Tech readout elements - hidden on mobile */}
            <div className="absolute top-10 lg:top-20 -left-5 lg:-left-10 bg-background/90 border border-primary/30 rounded px-2 lg:px-3 py-1 text-xs font-tech hidden md:block">
              <div className="text-primary">STATUS: ONLINE</div>
            </div>
            <div className="absolute bottom-10 lg:bottom-20 -right-5 lg:-right-10 bg-background/90 border border-secondary/30 rounded px-2 lg:px-3 py-1 text-xs font-tech hidden md:block">
              <div className="text-secondary">SIGNAL: 100%</div>
            </div>
            
            {/* Data stream elements - hidden on mobile */}
            <div className="absolute top-1/3 -left-10 lg:-left-20 cyber-data-stream opacity-60 hidden lg:block"></div>
            <div className="absolute bottom-1/3 -right-10 lg:-right-20 cyber-data-stream opacity-40 hidden lg:block"></div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
