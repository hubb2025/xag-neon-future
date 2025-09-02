import { useState, useEffect } from "react";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setIsFlying(true);
    
    // Create drone flying animation
    const droneElement = document.querySelector('.drone-icon');
    if (droneElement) {
      droneElement.classList.add('drone-takeoff');
    }
    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    
    // Reset flying state after animation
    setTimeout(() => {
      setIsFlying(false);
      if (droneElement) {
        droneElement.classList.remove('drone-takeoff');
      }
    }, 1500);
  };

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full btn-cyber p-0 transition-all duration-300 shadow-lg hover:shadow-xl group overflow-hidden",
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-16 opacity-0 pointer-events-none"
      )}
      aria-label="Voltar ao topo"
      style={{
        background: isFlying ? 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--primary-glow)))' : undefined
      }}
    >
      <Plane 
        className={cn(
          "h-6 w-6 drone-icon transition-all duration-1000 group-hover:text-neon-green",
          isFlying ? "animate-bounce scale-125 -translate-y-2" : "rotate-45"
        )} 
        style={{
          animation: isFlying ? 'dronefly 1.5s ease-out' : undefined
        }}
      />
      
      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes dronefly {
            0% { transform: rotate(45deg) scale(1); }
            25% { transform: rotate(0deg) scale(1.2); }
            50% { transform: rotate(-15deg) scale(1.4) translateY(-10px); }
            75% { transform: rotate(-30deg) scale(1.6) translateY(-20px); }
            100% { transform: rotate(-45deg) scale(1.8) translateY(-40px); }
          }
          
          .btn-cyber:hover .drone-icon:not(.animate-bounce) {
            animation: hover-float 2s ease-in-out infinite;
          }
          
          @keyframes hover-float {
            0%, 100% { transform: rotate(45deg) translateY(0px); }
            50% { transform: rotate(45deg) translateY(-3px); }
          }
        `
      }} />
    </Button>
  );
};

export default BackToTop;