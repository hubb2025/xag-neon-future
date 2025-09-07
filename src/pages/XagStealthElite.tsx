import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import DroneInfoCircles from "@/components/DroneInfoCircles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";

const XagStealthElite = () => {
  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no drone XAG STEALTH ELITE EDITION. Gostaria de mais informações sobre disponibilidade e condições.`
  );

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/5511999999999?text=${whatsappMessage}`, '_blank');
  };

  const specs = {
    flightTime: "75min",
    range: "25km", 
    payload: "3kg",
    capacity: "12L",
    coverage: "15ha/h",
    weight: "22kg"
  };

  const features = [
    "Tecnologia stealth com redução de assinatura radar e térmica",
    "Visão noturna infravermelha de alta resolução para operações 24h", 
    "Sistema de comunicação criptografada para máxima segurança",
    "Modo silencioso com hélices especiais para operações discretas",
    "Bateria de longa duração com recarga rápida em 45 minutos",
    "Revestimento especial anti-detecção para operações sigilosas",
    "Sistema de navegação inercial para voo sem GPS",
    "Câmera termal FLIR integrada com zoom óptico 30x"
  ];

  const testimonials = [
    {
      name: "Major Roberto",
      role: "Força Tática Militar",
      content: "O XAG Stealth Elite é uma ferramenta excepcional para operações noturnas. A tecnologia stealth funciona perfeitamente.",
      rating: 5
    },
    {
      name: "Dr. Fernanda",
      role: "Pesquisadora INPE",
      content: "Para monitoramento ambiental noturno, este drone é incomparável. A qualidade das imagens termais é impressionante.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 section-dark relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="cyber-corner absolute inset-0 opacity-60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="bg-secondary/20 text-secondary border-secondary/30 mb-4">
                  LANÇAMENTO
                </Badge>
                <h1 className="text-5xl md:text-7xl font-cyber font-black leading-tight">
                  <span className="text-neon-green">XAG P100 PRO</span>
                  <br />
                  <span className="text-foreground">ELITE EDITION</span>
                </h1>
                <p className="text-xl font-tech leading-relaxed text-muted-foreground mt-6">
                  Versão otimizada para missões táticas e operações noturnas. Design furtivo com tecnologia de camuflagem avançada.
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
                droneImage="/lovable-uploads/a716d702-40cb-40bb-a842-a73475fd5abe.png"
                droneAlt="XAG Stealth Elite"
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
              <span className="text-neon-green">Tecnologia</span> <span className="text-white">Stealth</span>
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
            <span className="text-neon-green">Depoimentos</span> <span className="text-white">Profissionais</span>
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
            <span className="text-neon-green">Tecnologia</span> de Ponta
            <br />
            para Operações Especiais
          </h2>
          <p className="text-xl font-tech text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como o XAG Stealth Elite pode atender às suas necessidades mais exigentes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-cyber text-lg px-8 py-4 group">
              <MessageCircle className="mr-2 h-5 w-5" />
              Solicitar Orçamento
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="btn-cyber-red text-lg px-8 py-4">
              <Mail className="mr-2 h-5 w-5" />
              contato@dronesxag.com.br
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default XagStealthElite;