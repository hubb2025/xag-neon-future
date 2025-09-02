import { Shield, Zap, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Qualidade Garantida",
      description: "Todos os nossos drones passam por rigorosos testes de qualidade e vêm com garantia de 2 anos."
    },
    {
      icon: Zap,
      title: "Tecnologia Avançada",
      description: "Utilizamos os componentes mais modernos e sistemas de navegação de última geração."
    },
    {
      icon: Users,
      title: "Suporte 24/7",
      description: "Nossa equipe especializada está sempre pronta para ajudar, todos os dias da semana."
    },
    {
      icon: Award,
      title: "Líderes do Mercado",
      description: "Somos referência em drones no Brasil com mais de 5 anos de experiência no setor."
    }
  ];

  return (
    <section id="sobre" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-primary/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-cyber font-black">
            <span className="text-foreground">SOBRE A</span>{" "}
            <span className="text-neon-green">DRONES</span>{" "}
            <span className="text-neon-red">XAG</span>
          </h2>
          <p className="text-xl text-muted-foreground font-tech max-w-4xl mx-auto leading-relaxed">
            Pioneiros em tecnologia de drones no Brasil, combinamos inovação, qualidade 
            e design futurista para entregar experiências únicas de voo.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-cyber font-bold text-neon-green">
                Nossa Missão
              </h3>
              <p className="text-lg text-muted-foreground font-tech leading-relaxed">
                Revolucionar o mercado de drones no Brasil através da tecnologia mais 
                avançada disponível, oferecendo produtos que combinam performance 
                excepcional com design cyberpunk único.
              </p>
              <p className="text-lg text-muted-foreground font-tech leading-relaxed">
                Desde nossa fundação, já entregamos mais de 10.000 drones para clientes 
                em todo o país, desde entusiastas até grandes empresas que confiam em 
                nossa expertise.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 card-cyber">
                <div className="text-3xl font-cyber font-bold text-neon-green mb-2">10K+</div>
                <div className="text-sm text-muted-foreground font-tech uppercase tracking-wide">
                  Drones Vendidos
                </div>
              </div>
              <div className="text-center p-6 card-cyber">
                <div className="text-3xl font-cyber font-bold text-neon-red mb-2">5+</div>
                <div className="text-sm text-muted-foreground font-tech uppercase tracking-wide">
                  Anos de Experiência
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-cyber hover:glow-green transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/20 rounded-lg border border-primary/30 flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-tech font-bold text-lg text-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground font-tech leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Values */}
        <div className="text-center space-y-8">
          <h3 className="text-3xl font-cyber font-bold">
            <span className="text-neon-green">NOSSOS</span>{" "}
            <span className="text-foreground">VALORES</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/30">
                <span className="text-2xl font-cyber font-bold text-primary">I</span>
              </div>
              <h4 className="font-cyber text-xl text-neon-green">INOVAÇÃO</h4>
              <p className="text-muted-foreground font-tech">
                Sempre na vanguarda da tecnologia, buscando as melhores soluções para nossos clientes.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto border border-secondary/30">
                <span className="text-2xl font-cyber font-bold text-secondary">Q</span>
              </div>
              <h4 className="font-cyber text-xl text-neon-red">QUALIDADE</h4>
              <p className="text-muted-foreground font-tech">
                Compromisso com a excelência em cada produto que oferecemos ao mercado.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto border border-border">
                <span className="text-2xl font-cyber font-bold text-primary">P</span>
              </div>
              <h4 className="font-cyber text-xl text-neon-green">PAIXÃO</h4>
              <p className="text-muted-foreground font-tech">
                Amor genuíno pela tecnologia de drones e pela satisfação de nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;