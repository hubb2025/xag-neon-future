import { Clock, Zap, Shield, Weight, Radar, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

interface DroneInfoCircle {
  icon: React.ReactNode;
  value: string;
  label: string;
  position: string;
  delay?: string;
}

interface DroneInfoCirclesProps {
  droneImage: string;
  droneAlt: string;
  specs: {
    flightTime: string;
    range: string;
    payload: string;
    capacity: string;
    coverage: string;
    weight: string;
  };
  className?: string;
}

const DroneInfoCircles = ({ droneImage, droneAlt, specs, className }: DroneInfoCirclesProps) => {
  const infoCircles: DroneInfoCircle[] = [
    {
      icon: <Clock className="h-3 w-3 md:h-4 md:w-4" />,
      value: specs.flightTime,
      label: "Autonomia",
      position: "top-4 left-8 md:top-8 md:left-16",
      delay: "animation-delay-100"
    },
    {
      icon: <Radar className="h-3 w-3 md:h-4 md:w-4" />,
      value: specs.range,
      label: "Alcance",
      position: "top-4 right-8 md:top-8 md:right-16",
      delay: "animation-delay-200"
    },
    {
      icon: <Droplets className="h-3 w-3 md:h-4 md:w-4" />,
      value: specs.capacity,
      label: "Capacidade",
      position: "top-1/2 -translate-y-1/2 right-0 md:-right-8",
      delay: "animation-delay-300"
    },
    {
      icon: <Weight className="h-3 w-3 md:h-4 md:w-4" />,
      value: specs.weight,
      label: "Peso",
      position: "bottom-4 left-8 md:bottom-8 md:left-16",
      delay: "animation-delay-400"
    },
    {
      icon: <Zap className="h-3 w-3 md:h-4 md:w-4" />,
      value: specs.coverage,
      label: "Cobertura",
      position: "bottom-4 right-8 md:bottom-8 md:right-16",
      delay: "animation-delay-500"
    },
    {
      icon: <Shield className="h-3 w-3 md:h-4 md:w-4" />,
      value: specs.payload,
      label: "Carga Útil",
      position: "top-1/2 -translate-y-1/2 left-0 md:-left-8",
      delay: "animation-delay-600"
    }
  ];

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      {/* Central Drone Image */}
      <div className="relative group">
        {/* Main drone container */}
        <div className="relative z-10 p-8 md:p-16">
          <img
            src={droneImage}
            alt={droneAlt}
            className="w-full h-auto max-w-lg mx-auto group-hover:scale-105 transition-transform duration-700"
            style={{
              filter: 'drop-shadow(8px 8px 16px rgba(0, 0, 0, 0.4)) drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.6)) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8))',
            }}
          />
          
          {/* Central glow effect */}
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-xl"></div>
        </div>

        {/* Info Circles */}
        {infoCircles.map((circle, index) => (
          <div
            key={index}
            className={cn(
              "absolute animate-fade-in hover-scale cursor-pointer group/circle",
              circle.position,
              circle.delay
            )}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Circle Container */}
            <div className="relative">
              {/* Main Circle */}
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-background/90 backdrop-blur-sm border-2 border-primary/30 flex flex-col items-center justify-center group-hover/circle:border-primary group-hover/circle:bg-primary/10 transition-all duration-300 shadow-lg">
                <div className="text-primary group-hover/circle:text-neon-green transition-colors duration-300 mb-0.5">
                  {circle.icon}
                </div>
                <div className="text-[8px] md:text-[10px] font-tech font-bold text-center leading-tight text-primary group-hover/circle:text-neon-green transition-colors duration-300">
                  {circle.value}
                </div>
              </div>
              
              {/* Pulse Animation Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse"></div>
              
              {/* Outer Glow Ring */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-md opacity-0 group-hover/circle:opacity-100 transition-opacity duration-300"></div>
              
              {/* Info Label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 min-w-max opacity-0 group-hover/circle:opacity-100 transition-opacity duration-300">
                <div className="bg-background/90 backdrop-blur-sm border border-primary/30 rounded-lg px-2 py-1 text-center">
                  <div className="font-tech text-xs text-muted-foreground">
                    {circle.label}
                  </div>
                </div>
                
                {/* Tooltip Arrow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-background/90 border-l border-t border-primary/30 rotate-45"></div>
              </div>
              
              {/* Connection Line to Center */}
              <div className="absolute top-1/2 left-1/2 w-px h-8 md:h-12 bg-gradient-to-b from-primary/30 to-transparent -translate-x-1/2 opacity-30 group-hover/circle:opacity-60 transition-opacity duration-300"></div>
            </div>
          </div>
        ))}

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Rotating Border */}
          <div className="absolute inset-8 md:inset-16 border border-primary/10 rounded-full animate-pulse"></div>
          
          {/* Corner Accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/20"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/20"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/20"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/20"></div>
        </div>
      </div>
      
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none"></div>
    </div>
  );
};

export default DroneInfoCircles;