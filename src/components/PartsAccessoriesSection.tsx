import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Settings, Wrench } from "lucide-react";

const PartsAccessoriesSection = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5596841566605";
    const message = "Olá! Gostaria de saber mais sobre peças, acessórios e geradores Toyama.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const accessories = [
    {
      id: 1,
      name: "Gerador Toyama 6500W",
      category: "DESTAQUE",
      description: "Gerador a gasolina, ideal para alimentar drones e equipamentos em campo",
      image: "/lovable-uploads/c47e410b-0ff2-494f-8f54-149ca96a34fc.png",
      features: [
        "Potência 6500W",
        "Autonomia 8 horas",
        "Motor 4 tempos",
        "Sistema AVR"
      ],
      price: "R$ 2.899,00"
    },
    {
      id: 2,
      name: "Kit Baterias Extras",
      category: "ACESSÓRIO",
      description: "Conjunto de baterias sobressalentes para maior autonomia de voo",
      image: "/lovable-uploads/80bab24b-15fb-47fe-ade1-dda75319c061.png",
      features: [
        "4 baterias LiPo",
        "Carregador rápido",
        "Case protetor",
        "Indicador LED"
      ],
      price: "R$ 1.599,00"
    },
    {
      id: 3,
      name: "Sensores de Precisão",
      category: "PEÇA",
      description: "Sensores RTK para máxima precisão em aplicações agrícolas",
      image: "/lovable-uploads/a716d702-40cb-40bb-a842-a73475fd5abe.png",
      features: [
        "Precisão ±2.5cm",
        "Conexão 4G/5G",
        "À prova d'água",
        "Calibração automática"
      ],
      price: "R$ 3.299,00"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-sm font-semibold">
            PEÇAS & ACESSÓRIOS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Equipamentos e Acessórios
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Complete sua operação com nossos equipamentos de alta qualidade, 
            <span className="text-primary font-semibold"> destacando o gerador Toyama</span> para 
            máxima autonomia em campo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {accessories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant={item.category === "DESTAQUE" ? "default" : "secondary"}
                      className={item.category === "DESTAQUE" ? "bg-primary text-primary-foreground" : ""}
                    >
                      {item.category}
                    </Badge>
                  </div>
                  {item.category === "DESTAQUE" && (
                    <div className="absolute top-4 right-4">
                      <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">{item.price}</span>
                    {item.category === "DESTAQUE" && (
                      <Shield className="h-5 w-5 text-green-500" />
                    )}
                  </div>

                  <Button 
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Wrench className="mr-2 h-4 w-4" />
                    Consultar
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border">
            <h3 className="text-2xl font-bold mb-4">
              🔧 Precisa de uma peça específica?
            </h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe técnica pode ajudar você a encontrar exatamente o que precisa
            </p>
            <Button 
              onClick={handleWhatsAppClick}
              size="lg" 
              className="bg-primary hover:bg-primary/90"
            >
              <Settings className="mr-2 h-5 w-5" />
              Falar com Especialista
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartsAccessoriesSection;