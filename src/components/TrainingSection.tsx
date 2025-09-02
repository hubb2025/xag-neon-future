import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Zap, Shield, Award, ArrowRight, BookOpen, Target, Headphones } from "lucide-react";

const TrainingSection = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Tenho interesse nos serviços de Treinamento e Consultoria. Gostaria de mais informações sobre os cursos disponíveis."
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const services = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Curso Básico de Pilotagem",
      description: "Aprenda os fundamentos da pilotagem de drones com segurança e eficiência.",
      duration: "40h",
      level: "Iniciante",
      features: [
        "Regulamentação ANAC",
        "Técnicas de voo básicas",
        "Manutenção preventiva",
        "Certificado reconhecido"
      ]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Curso Avançado Profissional",
      description: "Especialização em operações comerciais e técnicas avançadas de voo.",
      duration: "80h",
      level: "Avançado",
      features: [
        "Operações BVLOS",
        "Mapeamento aéreo",
        "Inspeções técnicas",
        "Análise de dados"
      ]
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Consultoria Especializada",
      description: "Consultoria técnica personalizada para implementação de projetos com drones.",
      duration: "Personalizado",
      level: "Empresarial",
      features: [
        "Análise de viabilidade",
        "Planejamento operacional",
        "Treinamento in-company",
        "Suporte técnico 24/7"
      ]
    }
  ];

  const stats = [
    { value: "500+", label: "Alunos Formados" },
    { value: "98%", label: "Taxa de Aprovação" },
    { value: "50+", label: "Empresas Atendidas" },
    { value: "24/7", label: "Suporte Técnico" }
  ];

  return (
    <section id="treinamento" className="py-24 relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="cyber-corner absolute inset-0 opacity-40"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 cyber-hexagon opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 border border-primary/30 rotate-45"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <Badge className="bg-primary/20 text-primary border-primary/30 text-sm px-4 py-2 mb-6">
            EDUCAÇÃO PROFISSIONAL
          </Badge>
          <h2 className="text-4xl md:text-6xl font-cyber font-black leading-tight mb-6">
            <span className="text-neon-green">TREINAMENTO</span>
            <br />
            <span className="text-foreground">& CONSULTORIA</span>
          </h2>
          <p className="text-xl font-tech leading-relaxed text-muted-foreground">
            Capacitação profissional e consultoria especializada para maximizar o potencial 
            dos seus projetos com drones. Do básico ao avançado, oferecemos soluções completas.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="relative">
                <div className="text-3xl md:text-4xl font-cyber font-black text-primary mb-2">
                  {stat.value}
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-md opacity-50"></div>
              </div>
              <div className="font-tech text-sm text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="card-cyber-light h-full group hover:bg-primary/90 hover:border-primary/50 hover:shadow-[0_8px_32px_hsl(var(--primary)/0.3)] transition-all duration-500">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors duration-300">
                    <div className="text-primary group-hover:text-primary-foreground transition-colors duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground group-hover:border-primary-foreground/30 transition-colors duration-300">{service.duration}</Badge>
                    <Badge variant="secondary" className="text-xs group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground transition-colors duration-300">{service.level}</Badge>
                  </div>
                  <CardTitle className="text-xl font-cyber text-foreground group-hover:text-primary-foreground transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="font-tech text-muted-foreground group-hover:text-primary-foreground/90 transition-colors duration-300 text-center">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 group-hover:bg-primary-foreground transition-colors duration-300"></div>
                        <span className="font-tech text-sm text-foreground group-hover:text-primary-foreground transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl md:text-3xl font-cyber font-bold text-foreground mb-4">
              Pronto para se tornar um <span className="text-neon-green">especialista</span>?
            </h3>
            <p className="font-tech text-muted-foreground">
              Entre em contato conosco e descubra como nossos treinamentos podem alavancar sua carreira ou negócio.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="btn-cyber text-lg px-8 py-4 group"
              onClick={handleWhatsAppClick}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Solicitar Informações
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="btn-cyber-red text-lg px-8 py-4"
              onClick={handleWhatsAppClick}
            >
              <Users className="mr-2 h-5 w-5" />
              Consultoria Empresarial
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingSection;