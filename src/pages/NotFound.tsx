import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="absolute top-20 left-20 w-32 h-32 border border-primary/30 rounded-full animate-cyber-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border border-secondary/30 rounded-full animate-cyber-pulse delay-1000"></div>
      
      <div className="text-center space-y-8 relative z-10 max-w-2xl mx-auto px-4">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="p-6 bg-secondary/20 rounded-full border border-secondary/30 glow-red">
            <AlertTriangle className="h-16 w-16 text-secondary animate-pulse" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-cyber font-black text-neon-red animate-neon-flicker">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-cyber font-bold text-foreground">
            PÁGINA NÃO ENCONTRADA
          </h2>
          <p className="text-xl text-muted-foreground font-tech max-w-lg mx-auto leading-relaxed">
            Ops! Parece que esta página decolou para outra dimensão. 
            Que tal retornar à base e explorar nossos drones incríveis?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="btn-cyber text-lg px-8 py-4">
            <a href="/">
              <Home className="mr-2 h-5 w-5" />
              Voltar ao Início
            </a>
          </Button>
          
          <Button asChild variant="outline" className="btn-cyber-red text-lg px-8 py-4">
            <a href="#contato">
              Reportar Problema
            </a>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-8 border-t border-border/30">
          <p className="text-muted-foreground font-tech mb-4">
            Precisa de ajuda para encontrar algo específico?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#drones" className="text-primary hover:text-neon-green transition-colors font-tech">
              Ver Drones
            </a>
            <a href="#sobre" className="text-primary hover:text-neon-green transition-colors font-tech">
              Sobre Nós
            </a>
            <a href="#faq" className="text-primary hover:text-neon-green transition-colors font-tech">
              FAQ
            </a>
            <a href="#contato" className="text-primary hover:text-neon-green transition-colors font-tech">
              Contato
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;