import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroImage from "@/assets/img-hero.png";
import backgroundImage from "@/assets/agricultural-field-bg.jpg";

const HeroSection = () => {
  const [modelos, setModelos] = useState(0);
  const [precisao, setPrecisao] = useState(0);
  const [suporte, setSuporte] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const animateNumber = (start: number, end: number, duration: number, setValue: (value: number) => void, isDecimal: boolean = false) => {
    const startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = start + (end - start) * easeOutCubic;
      
      if (isDecimal) {
        setValue(Math.round(currentValue * 10) / 10);
      } else {
        setValue(Math.round(currentValue));
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!hasAnimated) {
      const timer = setTimeout(() => {
        animateNumber(0, 50, 2000, setModelos);
        animateNumber(0, 99.9, 2500, setPrecisao, true);
        animateNumber(0, 24, 1800, setSuporte);
        setHasAnimated(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [hasAnimated]);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src="https://www.youtube.com/embed/McMtw78RVN4?autoplay=1&mute=1&loop=1&playlist=McMtw78RVN4&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
          title="Hero Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Animated Background Grid - Disabled to prevent flickering */}

      {/* Cyber Circuit Lines - Static to prevent layout shifts */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden sm:block opacity-60"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent hidden sm:block opacity-50"></div>
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent hidden sm:block opacity-40"></div>
        <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-destructive/30 to-transparent hidden sm:block opacity-30"></div>
      </div>

      {/* Floating Geometric Shapes - Static positions to prevent layout shifts */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-20 left-4 sm:left-20 w-4 h-4 border border-primary/40 rotate-45 opacity-60"></div>
        <div className="absolute top-40 right-8 sm:right-32 w-6 h-6 border border-secondary/40 opacity-50"></div>
        <div className="absolute bottom-32 left-8 sm:left-40 w-3 h-3 bg-accent/30 rotate-45 opacity-40"></div>
        <div className="absolute bottom-20 right-4 sm:right-20 w-5 h-5 border border-destructive/40 rotate-12 opacity-50"></div>

        {/* Larger decorative elements - Static */}
        <div className="absolute top-1/3 left-2 sm:left-10 w-16 sm:w-20 h-16 sm:h-20 border border-primary/20 rotate-45 opacity-30"></div>
        <div className="absolute bottom-1/3 right-2 sm:right-10 w-12 sm:w-16 h-12 sm:h-16 border border-secondary/20 opacity-25"></div>
      </div>

      {/* Glowing Orbs - Static to prevent layout shift */}
      <div className="absolute top-1/4 left-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-1/3 right-1/3 w-32 sm:w-40 h-32 sm:h-40 bg-secondary/10 rounded-full blur-3xl opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8 relative">
            {/* Decorative corner elements */}
            <div className="absolute -top-4 sm:-top-8 -left-4 sm:-left-8 w-8 sm:w-16 h-8 sm:h-16 border-l-2 border-t-2 border-primary/40 hidden sm:block"></div>
            <div className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 w-8 sm:w-16 h-8 sm:h-16 border-r-2 border-b-2 border-secondary/40 hidden sm:block"></div>

            <div className="space-y-4 lg:space-y-6">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Animated text glow effect */}
                <div className="absolute inset-0 blur-md hidden md:block">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-cyber font-black leading-tight text-primary/20">
                    DRONES<br />DO<br />FUTURO
                  </h1>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-cyber font-black leading-tight relative">
                  <motion.span 
                    className="text-primary"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    A Tecnologia que põe
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-primary"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    dinheiro no bolso
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-primary"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    do Agricultor
                  </motion.span>
                </h1>

                {/* Scanning line effect disabled to prevent flickering */}
              </motion.div>

              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-tech max-w-2xl pl-0 relative">
                  Eficiência, precisão e retorno garantido
                  <span className="absolute -right-1 sm:-right-2 top-0 w-2 h-2 bg-primary/60 rounded-full hidden sm:block"></span>
                </p>
              </motion.div>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="absolute -top-2 -left-2 w-4 h-4 border border-primary/50 hidden sm:block"></div>
              <Button className="btn-cyber group text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <a href="#drones" className="relative flex items-center">
                  <span className="relative">Explorar Catálogo</span>
                  <ChevronRight className="ml-2 h-4 lg:h-5 w-4 lg:w-5 group-hover:translate-x-1 transition-transform relative" />
                </a>
              </Button>

              <Button variant="outline" className="btn-cyber-red text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-destructive/20 to-primary/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <a href="/demonstracao" className="relative flex items-center">
                  <Play className="mr-2 h-4 lg:h-5 w-4 lg:w-5 group-hover:scale-110 transition-transform relative" />
                  <span className="relative">Ver Demo</span>
                </a>
              </Button>
            </motion.div>

            {/* Tech Stats - Desktop Only with Animation */}
            <div className="hidden lg:flex gap-4 lg:gap-8 pt-4">
              <div className="text-center relative">
                <div className="absolute inset-0 bg-primary/5 blur-xl"></div>
                <div className="text-xl lg:text-2xl font-cyber font-bold text-primary relative">
                  {modelos}+
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground relative">Modelos</div>
              </div>
              <div className="text-center relative">
                <div className="absolute inset-0 bg-secondary/5 blur-xl"></div>
                <div className="text-xl lg:text-2xl font-cyber font-bold text-secondary relative">
                  {precisao}%
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground relative">Precisão</div>
              </div>
              <div className="text-center relative">
                <div className="absolute inset-0 bg-accent/5 blur-xl"></div>
                <div className="text-xl lg:text-2xl font-cyber font-bold text-accent relative">
                  {suporte}/7
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground relative">Suporte</div>
              </div>
            </div>
          </div>

          {/* Hero Image - Only visible on desktop */}
          <motion.div 
            className="relative order-first lg:order-last hidden lg:block"
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Hexagonal frame */}
            <div className="absolute inset-0 scale-110">
              <div className="cyber-hexagon opacity-30"></div>
            </div>

            {/* Main image container */}
            <div className="relative group">
              {/* Multiple layered glow effects */}
              <div className="absolute inset-0 bg-gradient-radial from-primary/30 via-transparent to-transparent rounded-full blur-3xl scale-150 group-hover:scale-[1.6] transition-transform duration-1000"></div>
              <div className="absolute inset-0 bg-gradient-radial from-secondary/20 via-transparent to-transparent rounded-full blur-2xl scale-125 group-hover:scale-[1.4] transition-transform duration-1000 delay-200"></div>

              {/* Scanning rings - static to prevent layout shift */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full scale-110 opacity-40"></div>
              <div className="absolute inset-0 border border-secondary/30 rounded-full scale-125 opacity-30"></div>

              <img
                src={heroImage}
                alt="Drone Futurista DRONES Xag - Tecnologia avançada com design cyberpunk"
                className="w-full h-auto max-w-2xl mx-auto relative z-10 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
              />

              {/* Circuit patterns around image */}
              <div className="absolute top-0 left-1/2 w-px h-20 bg-gradient-to-b from-primary to-transparent -translate-x-1/2 -translate-y-10"></div>
              <div className="absolute bottom-0 left-1/2 w-px h-20 bg-gradient-to-t from-secondary to-transparent -translate-x-1/2 translate-y-10"></div>
              <div className="absolute left-0 top-1/2 h-px w-20 bg-gradient-to-r from-accent to-transparent -translate-y-1/2 -translate-x-10"></div>
              <div className="absolute right-0 top-1/2 h-px w-20 bg-gradient-to-l from-destructive to-transparent -translate-y-1/2 translate-x-10"></div>
            </div>

            {/* Enhanced Floating Elements - Static positions to prevent overflow */}
            <div className="absolute top-2 right-2 w-8 h-8 border-2 border-primary/30 rounded-full opacity-60">
              <div className="absolute inset-1 bg-primary/20 rounded-full"></div>
            </div>
            <div className="absolute bottom-2 left-2 w-6 h-6 bg-secondary/30 rounded-full opacity-50">
              <div className="absolute inset-1 border border-background/50 rounded-full"></div>
            </div>

            {/* Tech readout elements - Positioned inside container */}
            <div className="absolute top-4 left-4 bg-background/90 border border-primary/30 rounded px-2 py-1 text-xs font-tech">
              <div className="text-primary">STATUS: ONLINE</div>
            </div>
            <div className="absolute bottom-4 right-4 bg-background/90 border border-secondary/30 rounded px-2 py-1 text-xs font-tech">
              <div className="text-secondary">SIGNAL: 100%</div>
            </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
