import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DroneCard from "./DroneCard";
import surveillanceImage from "@/assets/surveillance-drone.jpg";
import racingImage from "@/assets/racing-drone.jpg";
import deliveryImage from "@/assets/delivery-drone.jpg";

const DroneCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const drones = [
    {
      id: "1",
      name: "Xag Stealth Pro",
      image: surveillanceImage,
      price: "R$ 12.999",
      originalPrice: "R$ 15.999",
      description: "Drone de vigilância avançado com câmeras 4K e sistema de navegação autônoma.",
      features: ["4K Camera", "GPS Avançado", "45min Voo"],
      category: "Vigilância",
      isNew: true
    },
    {
      id: "2", 
      name: "Xag Racing Fury",
      image: racingImage,
      price: "R$ 8.499",
      description: "Drone de corrida ultra-rápido com design aerodinâmico e controles responsivos.",
      features: ["Alta Velocidade", "Frame Carbono", "Controle Preciso"],
      category: "Racing",
      isNew: false
    },
    {
      id: "3",
      name: "Xag Cargo Master",
      image: deliveryImage,
      price: "R$ 18.999",
      originalPrice: "R$ 22.999",
      description: "Drone de entrega com grande capacidade de carga e sistema de navegação inteligente.",
      features: ["5kg Carga", "Sistema Anti-Queda", "60min Autonomia"],
      category: "Entrega",
      isNew: true
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % drones.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + drones.length) % drones.length);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-cyber font-black">
            <span className="text-neon-green">MODELOS</span>{" "}
            <span className="text-foreground">EM</span>{" "}
            <span className="text-neon-red">DESTAQUE</span>
          </h2>
          <p className="text-xl text-muted-foreground font-tech max-w-3xl mx-auto">
            Descubra nossa seleção premium de drones com tecnologia de ponta e design futurista
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary/20"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline" 
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary/20"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Carousel Content */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {drones.map((drone) => (
                <div key={drone.id} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-md mx-auto">
                    <DroneCard {...drone} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {drones.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary glow-green"
                    : "bg-border hover:bg-primary/50"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button className="btn-cyber text-lg px-8 py-4">
            Ver Todos os Modelos
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DroneCarousel;