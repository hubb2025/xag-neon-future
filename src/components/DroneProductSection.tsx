import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Shield, Clock, ArrowRight } from "lucide-react";
import DroneInfoCircles from "./DroneInfoCircles";

interface DroneProductSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  isReversed?: boolean;
  badge?: string;
  specs: {
    flightTime: string;
    range: string;
    payload: string;
    camera: string;
    capacity: string;
    coverage: string;
    weight: string;
  };
}

const DroneProductSection = ({
  id,
  title,
  subtitle,
  description,
  features,
  image,
  isReversed = false,
  badge,
  specs
}: DroneProductSectionProps) => {
  const whatsappMessage = encodeURIComponent(
    `Olá, desejo um atendimento!`
  );

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/5548984806556?text=${whatsappMessage}`, '_blank');
  };

  const handleSpecsClick = () => {
    let route = '';
    switch(id) {
      case 'XAG P60':
        route = '/drones/xag-phantom-pro';
        break;
      case 'XAG P100 PRO':
        route = '/drones/xag-stealth-elite';
        break;
      case 'XAG P150':
        route = '/drones/xag-cargo-master';
        break;
      default:
        route = '/';
    }
    window.location.href = route;
  };
  // Alternar entre verde (0,2,4...) e branco (1,3,5...)
  const sectionClass = isReversed ? 'section-light' : 'section-green';
  
  return (
    <section className={`py-24 relative overflow-hidden ${sectionClass}`}>
      {/* Dynamic Background Effects based on section type */}
      {isReversed ? (
        // Light section backgrounds
        <>
          <div className="absolute inset-0 grid-pattern-light opacity-30"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="cyber-corner absolute inset-0 opacity-40"></div>
          <div className="cyber-circuit absolute inset-0"></div>
        </>
      ) : (
        // Green section backgrounds  
        <>
          <div className="absolute inset-0 grid-pattern-light opacity-40"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="cyber-corner absolute inset-0 opacity-60"></div>
          <div className="cyber-circuit absolute inset-0"></div>
        </>
      )}
      
      {/* Additional Cyber Elements */}
      <div className="absolute top-10 sm:top-20 left-2 sm:left-10 w-16 sm:w-20 h-16 sm:h-20 cyber-hexagon opacity-30"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-2 sm:right-10 w-12 sm:w-16 h-12 sm:h-16 border border-primary/30 rotate-45"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Content */}
          <div className={`space-y-8 ${isReversed ? 'lg:col-start-2' : ''}`}>
            {/* Badge */}
            {badge && (
              <div>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-sm px-4 py-1">
                  {badge}
                </Badge>
              </div>
            )}

            {/* Title */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-cyber font-black leading-tight">
                <span className="text-neon-green">{title}</span>
                <br />
                <span className={isReversed ? "text-foreground" : "text-white"}>{subtitle}</span>
              </h2>
              <p className={`text-xl font-tech leading-relaxed max-w-xl ${isReversed ? "text-muted-foreground" : "text-white/90"}`}>
                {description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className={`font-tech ${isReversed ? "text-foreground" : "text-white"}`}>{feature}</span>
                </div>
              ))}
            </div>

            {/* Specs Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className={isReversed ? "card-cyber-light p-4" : "card-cyber-green p-4"}>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className={`text-sm font-tech ${isReversed ? "text-muted-foreground" : "text-white/70"}`}>Autonomia</div>
                    <div className="font-cyber font-bold text-primary">{specs.flightTime}</div>
                  </div>
                </div>
              </Card>
              
              <Card className={isReversed ? "card-cyber-light p-4" : "card-cyber-green p-4"}>
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <div>
                    <div className={`text-sm font-tech ${isReversed ? "text-muted-foreground" : "text-white/70"}`}>Alcance</div>
                    <div className="font-cyber font-bold text-primary">{specs.range}</div>
                  </div>
                </div>
              </Card>
              
              <Card className={isReversed ? "card-cyber-light p-4" : "card-cyber-green p-4"}>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <div className={`text-sm font-tech ${isReversed ? "text-muted-foreground" : "text-white/70"}`}>Carga</div>
                    <div className="font-cyber font-bold text-primary">{specs.payload}</div>
                  </div>
                </div>
              </Card>
              
              <Card className={isReversed ? "card-cyber-light p-4" : "card-cyber-green p-4"}>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-primary/20 rounded border border-primary/30 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <div className={`text-sm font-tech ${isReversed ? "text-muted-foreground" : "text-white/70"}`}>Câmera</div>
                    <div className="font-cyber font-bold text-primary">{specs.camera}</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="btn-cyber text-lg px-8 py-4 group"
                  onClick={handleSpecsClick}
                >
                  Saiba Mais
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              <p className={`text-sm font-tech ${isReversed ? "text-muted-foreground" : "text-white/80"}`}>
              </p>
            </div>
          </div>

          {/* Image with Info Circles */}
          <div className={`relative ${isReversed ? 'lg:col-start-1' : ''}`}>
            <DroneInfoCircles 
              droneImage={image}
              droneAlt={`${title} ${subtitle}`}
              specs={{
                flightTime: specs.flightTime,
                range: specs.range,
                payload: specs.payload,
                capacity: specs.capacity,
                coverage: specs.coverage,
                weight: specs.weight
              }}
              className="py-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DroneProductSection;