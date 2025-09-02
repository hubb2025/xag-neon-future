import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Shield, Clock, ArrowRight } from "lucide-react";

interface DroneProductSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  originalPrice?: string;
  features: string[];
  image: string;
  isReversed?: boolean;
  badge?: string;
  specs: {
    flightTime: string;
    range: string;
    payload: string;
    camera: string;
  };
}

const DroneProductSection = ({
  title,
  subtitle,
  description,
  price,
  originalPrice,
  features,
  image,
  isReversed = false,
  badge,
  specs
}: DroneProductSectionProps) => {
  return (
    <section className="py-24 relative overflow-hidden section-light">
      {/* Light Background Effects */}
      <div className="absolute inset-0 grid-pattern-light opacity-30"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="cyber-corner absolute inset-0 opacity-50"></div>
      
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
                <span className="text-foreground">{subtitle}</span>
              </h2>
              <p className="text-xl text-muted-foreground font-tech leading-relaxed max-w-xl">
                {description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-tech">{feature}</span>
                </div>
              ))}
            </div>

            {/* Specs Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="card-cyber-light p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-gray-500 font-tech">Autonomia</div>
                    <div className="font-cyber font-bold text-primary">{specs.flightTime}</div>
                  </div>
                </div>
              </Card>
              
              <Card className="card-cyber-light p-4">
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-gray-500 font-tech">Alcance</div>
                    <div className="font-cyber font-bold text-primary">{specs.range}</div>
                  </div>
                </div>
              </Card>
              
              <Card className="card-cyber-light p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-gray-500 font-tech">Carga</div>
                    <div className="font-cyber font-bold text-primary">{specs.payload}</div>
                  </div>
                </div>
              </Card>
              
              <Card className="card-cyber-light p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-primary/20 rounded border border-primary/30 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-tech">Câmera</div>
                    <div className="font-cyber font-bold text-primary">{specs.camera}</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Price and CTA */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-cyber font-black text-primary">
                  {price}
                </div>
                {originalPrice && (
                  <div className="text-xl text-gray-500 line-through">
                    {originalPrice}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-cyber text-lg px-8 py-4 group">
                  Comprar Agora
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="btn-cyber-red text-lg px-8 py-4">
                  Ver Especificações
                </Button>
              </div>
              
              <p className="text-sm text-gray-500 font-tech">
                💳 Parcelamento em até 24x sem juros | 🚚 Frete grátis para todo Brasil
              </p>
            </div>
          </div>

          {/* Image */}
          <div className={`relative ${isReversed ? 'lg:col-start-1' : ''}`}>
            <div className="relative group">
              <img
                src={image}
                alt={`${title} ${subtitle}`}
                className="w-full h-auto max-w-2xl mx-auto animate-float group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-lg blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-transparent to-transparent rounded-lg blur-xl"></div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-primary rounded-full animate-ping"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/80 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 border border-primary/50 rounded-full animate-cyber-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DroneProductSection;