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
    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    
    // Reset flying state after scroll animation completes
    setTimeout(() => {
      setIsFlying(false);
    }, 2000);
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
            0% { 
              transform: rotate(45deg) scale(1); 
              opacity: 1;
            }
            20% { 
              transform: rotate(15deg) scale(1.1) translateY(-5px); 
              opacity: 0.9;
            }
            40% { 
              transform: rotate(-10deg) scale(1.2) translateY(-15px); 
              opacity: 0.7;
            }
            60% { 
              transform: rotate(-25deg) scale(1.3) translateY(-30px); 
              opacity: 0.5;
            }
            80% { 
              transform: rotate(-35deg) scale(1.4) translateY(-50px); 
              opacity: 0.3;
            }
            100% { 
              transform: rotate(-45deg) scale(1.5) translateY(-70px); 
              opacity: 0;
            }
          }
          
          .btn-cyber:hover .drone-icon:not(.animate-bounce) {
            animation: hover-float 2.5s ease-in-out infinite;
          }
          
          @keyframes hover-float {
            0%, 100% { 
              transform: rotate(45deg) translateY(0px) scale(1); 
            }
            25% { 
              transform: rotate(40deg) translateY(-2px) scale(1.05); 
            }
            50% { 
              transform: rotate(45deg) translateY(-4px) scale(1.1); 
            }
            75% { 
              transform: rotate(50deg) translateY(-2px) scale(1.05); 
            }
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
            @keyframes dronefly {
              0% { 
                transform: rotate(45deg) scale(1); 
                opacity: 1;
              }
              20% { 
                transform: rotate(15deg) scale(1.05) translateY(-3px); 
                opacity: 0.9;
              }
              40% { 
                transform: rotate(-10deg) scale(1.1) translateY(-10px); 
                opacity: 0.7;
              }
              60% { 
                transform: rotate(-25deg) scale(1.15) translateY(-20px); 
                opacity: 0.5;
              }
              80% { 
                transform: rotate(-35deg) scale(1.2) translateY(-35px); 
                opacity: 0.3;
              }
              100% { 
                transform: rotate(-45deg) scale(1.25) translateY(-50px); 
                opacity: 0;
              }
            }
          }
        `
      }} />
    </Button>
  );
};

export default BackToTop;