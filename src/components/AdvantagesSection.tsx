import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Mountain, Droplets, Zap, Battery, Monitor } from "lucide-react";

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: DollarSign,
      title: "Custo Competitivo",
      description: "Redução significativa nos custos operacionais comparado aos métodos tradicionais de operação e monitoramento."
    },
    {
      icon: Mountain,
      title: "Acesso a Terrenos Difíceis",
      description: "Acesso facilitado a terrenos difíceis e declives acentuados, onde equipamentos terrestres não conseguem operar."
    },
    {
      icon: Droplets,
      title: "Precisão de Aplicação",
      description: "Aplicação precisa e controlada reduz o desperdício em até 30%, preservando recursos e o meio ambiente."
    },
    {
      icon: Zap,
      title: "Alta Produtividade",
      description: "Cobertura superior a 20 hectares por hora, aumentando drasticamente a eficiência operacional."
    },
    {
      icon: Battery,
      title: "Autonomia e Recarga Rápida",
      description: "Baterias de longa duração com sistema de recarga rápida para operação contínua no campo."
    },
    {
      icon: Monitor,
      title: "Monitoramento Real-time",
      description: "Acompanhamento em tempo real das operações com dados precisos de cobertura e aplicação."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden section-dark">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="cyber-corner absolute inset-0 opacity-40"></div>
      <div className="cyber-circuit absolute inset-0"></div>
      
      {/* Additional Cyber Elements */}
      <div className="absolute top-10 sm:top-20 right-2 sm:right-10 w-16 sm:w-20 h-16 sm:h-20 cyber-hexagon opacity-20"></div>
      <div className="absolute bottom-10 sm:bottom-20 left-2 sm:left-10 w-12 sm:w-16 h-12 sm:h-16 border border-secondary/30 rotate-45"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl md:text-6xl font-cyber font-black">
            <span className="text-neon-green">VANTAGENS DOS</span>
            <br />
            <span className="text-foreground">DRONES AVANÇADOS</span>
          </h2>
          <p className="text-xl font-tech text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Tecnologia de ponta que revoluciona operações modernas com eficiência, 
            precisão e sustentabilidade.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <Card key={index} className="card-cyber group hover:scale-105 transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  {/* Icon */}
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-cyber font-bold text-foreground group-hover:text-neon-green transition-colors duration-300">
                      {advantage.title}
                    </h3>
                    <p className="text-muted-foreground font-tech leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-primary/60 transition-all duration-300"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-lg font-tech text-muted-foreground">
            Descubra como nossa tecnologia pode transformar suas operações
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;