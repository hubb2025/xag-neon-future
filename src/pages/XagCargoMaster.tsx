import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import DroneInfoCircles from "@/components/DroneInfoCircles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";

const XagCargoMaster = () => {
  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no drone XAG CARGO MASTER CLASS. Gostaria de mais informações sobre disponibilidade e condições.`
  );

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/5511999999999?text=${whatsappMessage}`, '_blank');
  };

  const specs = {
    flightTime: "55min",
    range: "20km", 
    payload: "10kg",
    capacity: "20L",
    coverage: "10ha/h",
    weight: "35kg"
  };

  const features = [
    "Capacidade de carga útil de até 10kg para transporte pesado",
    "Sistema de liberação automática programável por GPS", 
    "Compartimento de carga climatizado para produtos sensíveis",
    "Redundância dupla nos sistemas críticos para máxima confiabilidade",
    "Interface profissional com relatórios detalhados de missão",
    "Sistema de ancoragem segura para diferentes tipos de carga",
    "Monitoramento em tempo real da temperatura e umidade",
    "Certificação para transporte de materiais especiais"
  ];

  const testimonials = [
    {
      name: "João Santos",
      role: "Logística AgroExpress",
      content: "O XAG Cargo Master transformou nossa operação de entrega em áreas rurais. Conseguimos reduzir custos em 40% e aumentar a velocidade.",
      rating: 5
    },
    {
      name: "Marina Costa",
      role: "Cooperativa Central",
      content: "Para transporte de sementes e insumos, este drone é perfeito. A capacidade de carga e confiabilidade são excepcionais.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 section-light relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-light opacity-30"></div>
        <div className="cyber-corner absolute inset-0 opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
                  PROFISSIONAL
                </Badge>
                <h1 className="text-5xl md:text-7xl font-cyber font-black leading-tight">
                  <span className="text-neon-green">XAG CARGO</span>
                  <br />
                  <span className="text-foreground">MASTER CLASS</span>
                </h1>
                <p className="text-xl font-tech leading-relaxed text-muted-foreground mt-6">
                  Especialmente desenvolvido para transporte de cargas pesadas e entregas comerciais em larga escala.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="btn-cyber text-lg px-8 py-4 group"
                  onClick={handleWhatsAppClick}
                >
                  Comprar Agora
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="btn-cyber-red text-lg px-8 py-4">
                  <Phone className="mr-2 h-5 w-5" />
                  Falar com Especialista
                </Button>
              </div>
            </div>
            
            <div>
              <DroneInfoCircles 
                droneImage="/lovable-uploads/e004268f-665d-4e77-a00e-241c47a47044.png"
                droneAlt="XAG Cargo Master"
                specs={specs}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 section-green">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-cyber font-bold text-center mb-12">
              <span className="text-neon-green">Capacidades</span> <span className="text-white">de Carga</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <span className="font-tech text-white leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-24 section-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-cyber font-bold text-center mb-12">
            <span className="text-neon-green">Especificações</span> Técnicas
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="card-cyber p-6 text-center">
              <div className="text-3xl font-cyber font-bold text-primary mb-2">{specs.flightTime}</div>
              <div className="font-tech text-muted-foreground">Tempo de Voo</div>
            </Card>
            <Card className="card-cyber p-6 text-center">
              <div className="text-3xl font-cyber font-bold text-primary mb-2">{specs.range}</div>
              <div className="font-tech text-muted-foreground">Alcance</div>
            </Card>
            <Card className="card-cyber p-6 text-center">
              <div className="text-3xl font-cyber font-bold text-primary mb-2">{specs.payload}</div>
              <div className="font-tech text-muted-foreground">Carga Útil</div>
            </Card>
            <Card className="card-cyber p-6 text-center">
              <div className="text-3xl font-cyber font-bold text-primary mb-2">{specs.capacity}</div>
              <div className="font-tech text-muted-foreground">Capacidade do Tanque</div>
            </Card>
            <Card className="card-cyber p-6 text-center">
              <div className="text-3xl font-cyber font-bold text-primary mb-2">{specs.coverage}</div>
              <div className="font-tech text-muted-foreground">Cobertura por Hora</div>
            </Card>
            <Card className="card-cyber p-6 text-center">
              <div className="text-3xl font-cyber font-bold text-primary mb-2">{specs.weight}</div>
              <div className="font-tech text-muted-foreground">Peso Total</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 section-green">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-cyber font-bold text-center mb-12">
            <span className="text-neon-green">Depoimentos</span> <span className="text-white">de Clientes</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-cyber-green p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="font-tech text-white/90 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-cyber font-bold text-primary">{testimonial.name}</div>
                  <div className="font-tech text-sm text-white/70">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 section-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-cyber font-bold mb-6">
            <span className="text-neon-green">Revolucione</span> sua Logística
            <br />
            com Drones de Carga
          </h2>
          <p className="text-xl font-tech text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como o XAG Cargo Master pode otimizar suas operações de transporte e entrega.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-cyber text-lg px-8 py-4 group">
              <MessageCircle className="mr-2 h-5 w-5" />
              Solicitar Orçamento
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="btn-cyber-red text-lg px-8 py-4">
              <Mail className="mr-2 h-5 w-5" />
              contato@agricampdrones.com
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default XagCargoMaster;