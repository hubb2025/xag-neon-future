import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Settings, Wrench } from "lucide-react";

const PartsAccessoriesSection = () => {
  const handleWhatsAppClick = (productName: string) => {
    const phoneNumber = "559684156605";
    const message = `Olá! Gostaria de solicitar um orçamento para o ${productName}. Poderia me enviar mais informações sobre preços e condições?`; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const accessories = [
    {
      id: 1,
      name: "XAG P60",
      category: "Drone",
      description: "Pequenas Propriedades",
      image: "/lovable-uploads/80bab24b-15fb-47fe-ade1-dda75319c061.png",
      features: [
        "Cobertura: 12 hectares/hora",
        "Taxa de fluxo: 16 L/min",
        "Autonomia: 12 minutos",
        "30 Litros"
      ]
    },
    {
      id: 2,
      name: "XAG P100 PRO",
      category: "Drone",
      description: "Precisão Extrema",
      image: "/lovable-uploads/e004268f-665d-4e77-a00e-241c47a47044.png",
      features: [
        "Capacidade 50 L (60 L oficial)",
        "Taxa de aplicação de 22 L/min",
        "IA para detecção de obstáculos",
        "50 Litros"
      ]
    },
    {
      id: 3,
      name: "XAG P150",
      category: "Drone",
      description: "Modelo Premium",
      image: "/lovable-uploads/a716d702-40cb-40bb-a842-a73475fd5abe.png",
      features: [
        "Capacidade 100 L (115 L oficial)",
        "Taxa de aplicação de 30 L/min",
        "IA para detecção de obstáculos",
        "100 Litros"
      ]
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
            Modelos
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Drones
          </h2>
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

                  <div className="flex items-center justify-center mb-4">
                    <div className="text-center">
                      <span className="text-lg font-bold text-primary">Solicite seu Orçamento</span>
                      {item.category === "DESTAQUE" && (
                        <div className="flex justify-center mt-1">
                          <Shield className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleWhatsAppClick(item.name)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Wrench className="mr-2 h-4 w-4" />
                    Solicitar Orçamento
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartsAccessoriesSection;