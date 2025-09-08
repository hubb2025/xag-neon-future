import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import DroneInfoCircles from "@/components/DroneInfoCircles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";

import demoVideo from "@/assets/xagp60.mp4"

const XagPhantomPro = () => {
  const whatsappMessage = encodeURIComponent(
    `Olá! Espero que esteja bem. Gostaria de saber mais informações sobre o XAG P60 e solicitar um orçamento personalizado. Poderia me ajudar?`
  );

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/559684156605?text=${whatsappMessage}`, '_blank');
  };

  const specs = {
    flightTime: "65min",
    range: "15km",
    payload: "25kg",
    camera: "8K/60fps",
    capacity: "16L",
    coverage: "12ha/h",
    weight: "25kg"
  };

  const features = [
    "Cobertura: 12 hectares/hora",
    "Câmera 8K com estabilização em 3 eixos para imagens profissionais",
    "Taxa de fluxo: 16 L/min",
    "Sistema anti-colisão com sensores 360° para máxima segurança",
    "Capacidade do tanque: 30L",
    "Autonomia: 12 minutos"
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Fazenda Santa Maria",
      content: "O XAG Phantom Pro revolucionou nossa operação. A precisão na aplicação de defensivos aumentou nossa produtividade em 30%.",
      rating: 5
    },
    {
      name: "Ana Paula",
      role: "Cooperativa AgroTech",
      content: "Equipamento excepcional! A autonomia de voo e a qualidade das imagens são impressionantes. Recomendo para qualquer produtor sério.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Video Section */}
      <section className="pt-24 pb-8 section-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-cyber font-bold text-center mb-8">
            <span className="text-neon-green">Vídeo</span> Demonstração
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <video
                src={demoVideo}
                autoPlay
                muted
                loop
                controls
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pt-16 pb-16 section-green relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="cyber-corner absolute inset-0 opacity-40"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
                  MAIS VENDIDO
                </Badge>
                <h1 className="text-5xl md:text-7xl font-cyber font-black leading-tight">
                  <span className="text-neon-green">XAG P60</span>
                  <br />
                  <span className="text-white">Pequenas Propriedades</span>
                </h1>
                <p className="text-xl font-tech leading-relaxed text-white/90 mt-6">
                  O XAG P60 é o drone ideal para quem inicia no agronegócio. Com capacidade de 30 L, cobre até 12 hectares por hora e oferece autonomia de 12 minutos. Equipado com sensor Radar 4D e design compacto de apenas 25 kg, reduz custos operacionais e o amassamento da lavoura.
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
                <Button variant="outline" className="btn-cyber-red text-lg px-8 py-4"
                  onClick={handleWhatsAppClick}>
                  <Phone className="mr-2 h-5 w-5" />
                  Falar com Especialista
                </Button>
              </div>
            </div>

            <div>
              <DroneInfoCircles
                droneImage="/lovable-uploads/80bab24b-15fb-47fe-ade1-dda75319c061.png"
                droneAlt="XAG Phantom Pro"
                specs={specs}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-cyber font-bold text-center mb-12">
              <span className="text-neon-green">Características</span> Principais
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <span className="font-tech text-foreground leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-24 section-green">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-cyber font-bold text-center mb-12">
            <span className="text-neon-green">Especificações</span> <span className="text-white">Técnicas</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="card-cyber-green p-6 text-center">
              <div className="text-3xl font-cyber font-bold text-primary mb-2">{specs.flightTime}</div>
              <div className="font-tech text-white/80">Tempo de Voo</div>
            </Card>
            <Card className="card-cyber-green p-6 text-center">
              <div className="text-3xl font-cyber font-bold text-primary mb-2">{specs.range}</div>
              <div className="font-tech text-white/80">Alcance</div>
            </Card>
            <Card className="card-cyber-green p-6 text-center">
              <div className="text-3xl font-cyber font-bold text-primary mb-2">{specs.payload}</div>
              <div className="font-tech text-white/80">Carga Útil</div>
            </Card>
            <Card className="card-cyber-green p-6 text-center">
              <div className="text-3xl font-cyber font-bold text-primary mb-2">{specs.capacity}</div>
              <div className="font-tech text-white/80">Capacidade do Tanque</div>
            </Card>
            <Card className="card-cyber-green p-6 text-center">
              <div className="text-3xl font-cyber font-bold text-primary mb-2">{specs.coverage}</div>
              <div className="font-tech text-white/80">Cobertura por Hora</div>
            </Card>
            <Card className="card-cyber-green p-6 text-center">
              <div className="text-3xl font-cyber font-bold text-primary mb-2">{specs.weight}</div>
              <div className="font-tech text-white/80">Peso Total</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 section-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-cyber font-bold text-center mb-12">
            <span className="text-neon-green">Depoimentos</span> de Clientes
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-cyber p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="font-tech text-muted-foreground mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-cyber font-bold text-primary">{testimonial.name}</div>
                  <div className="font-tech text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 section-green">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-cyber font-bold mb-6">
            <span className="text-neon-green">Pronto para</span> <span className="text-white">Revolucionar</span>
            <br />
            <span className="text-white">sua Operação?</span>
          </h2>
          <p className="text-xl font-tech text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como o XAG Phantom Pro pode aumentar sua produtividade e reduzir seus custos operacionais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="btn-cyber text-lg px-8 py-4 group"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Solicitar Orçamento
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="btn-cyber-red text-lg px-8 py-4"
              onClick={() => window.open('mailto:contato@dronesxag.com.br')}
            >
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

export default XagPhantomPro;