import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DroneCarousel from "@/components/DroneCarousel";
import DroneProductSection from "@/components/DroneProductSection";
import AboutSection from "@/components/AboutSection";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  const droneModels = [
    {
      id: "xag-phantom-pro",
      title: "XAG PHANTOM",
      subtitle: "PRO SERIES",
      description: "O drone mais avançado para operações comerciais e de vigilância. Equipado com tecnologia de ponta e sistema de navegação autônoma.",
      price: "R$ 15.999",
      originalPrice: "R$ 19.999",
      image: "/lovable-uploads/80bab24b-15fb-47fe-ade1-dda75319c061.png",
      badge: "MAIS VENDIDO",
      features: [
        "Sistema de navegação GPS avançado com precisão centimétrica",
        "Câmera 8K com estabilização em 3 eixos para imagens profissionais",
        "Resistência IP67 contra água e poeira para operação em qualquer clima",
        "Sistema anti-colisão com sensores 360° para máxima segurança",
        "Modo autônomo inteligente com planejamento de rota automatizado"
      ],
      specs: {
        flightTime: "65min",
        range: "15km",
        payload: "5kg",
        camera: "8K/60fps"
      }
    },
    {
      id: "xag-stealth-elite",
      title: "XAG STEALTH",
      subtitle: "ELITE EDITION",
      description: "Versão otimizada para missões táticas e operações noturnas. Design furtivo com tecnologia de camuflagem avançada.",
      price: "R$ 22.499",
      originalPrice: "R$ 26.999",
      image: "/lovable-uploads/a716d702-40cb-40bb-a842-a73475fd5abe.png",
      badge: "LANÇAMENTO",
      features: [
        "Tecnologia stealth com redução de assinatura radar e térmica",
        "Visão noturna infravermelha de alta resolução para operações 24h",
        "Sistema de comunicação criptografada para máxima segurança",
        "Modo silencioso com hélices especiais para operações discretas",
        "Bateria de longa duração com recarga rápida em 45 minutos"
      ],
      specs: {
        flightTime: "75min",
        range: "25km",
        payload: "3kg",
        camera: "8K+IR"
      }
    },
    {
      id: "xag-cargo-master",
      title: "XAG CARGO",
      subtitle: "MASTER CLASS",
      description: "Especialmente desenvolvido para transporte de cargas pesadas e entregas comerciais em larga escala.",
      price: "R$ 18.999",
      image: "/lovable-uploads/e004268f-665d-4e77-a00e-241c47a47044.png",
      badge: "PROFISSIONAL",
      features: [
        "Capacidade de carga útil de até 10kg para transporte pesado",
        "Sistema de liberação automática programável por GPS",
        "Compartimento de carga climatizado para produtos sensíveis",
        "Redundância dupla nos sistemas críticos para máxima confiabilidade",
        "Interface profissional com relatórios detalhados de missão"
      ],
      specs: {
        flightTime: "55min",
        range: "20km",
        payload: "10kg",
        camera: "4K/30fps"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="overflow-x-hidden">
        <HeroSection />
        <section id="drones" className="overflow-x-hidden">
          {droneModels.map((drone, index) => (
            <DroneProductSection
              key={drone.id}
              {...drone}
              isReversed={index % 2 !== 0}
            />
          ))}
        </section>
        <AboutSection />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;