import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DroneCarousel from "@/components/DroneCarousel";
import DroneProductSection from "@/components/DroneProductSection";
import AboutSection from "@/components/AboutSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import TrainingSection from "@/components/TrainingSection";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  
  const advantagesRef = useScrollAnimation();
  const aboutRef = useScrollAnimation();
  const trainingRef = useScrollAnimation();
  const faqRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  const droneModels = [
    {
      id: "xag-phantom-pro",
      title: "XAG PHANTOM",
      subtitle: "PRO SERIES",
      description: "O drone mais avançado para operações comerciais e de vigilância. Equipado com tecnologia de ponta e sistema de navegação autônoma.",
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
        camera: "8K/60fps",
        capacity: "16L",
        coverage: "12ha/h",
        weight: "25kg"
      }
    },
    {
      id: "xag-stealth-elite",
      title: "XAG STEALTH",
      subtitle: "ELITE EDITION",
      description: "Versão otimizada para missões táticas e operações noturnas. Design furtivo com tecnologia de camuflagem avançada.",
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
        camera: "8K+IR",
        capacity: "12L",
        coverage: "15ha/h", 
        weight: "22kg"
      }
    },
    {
      id: "xag-cargo-master",
      title: "XAG CARGO",
      subtitle: "MASTER CLASS",
      description: "Especialmente desenvolvido para transporte de cargas pesadas e entregas comerciais em larga escala.",
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
        camera: "4K/30fps",
        capacity: "20L",
        coverage: "10ha/h",
        weight: "35kg"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background w-full">
      <Header />
      <main className="w-full">
        <HeroSection />
        <section id="drones" className="w-full">
          {droneModels.map((drone, index) => (
            <DroneProductSection
              key={drone.id}
              {...drone}
              isReversed={index % 2 !== 0}
            />
          ))}
        </section>
        
        <motion.div
          ref={advantagesRef.ref}
          initial={{ opacity: 0, y: 50 }}
          animate={advantagesRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AdvantagesSection />
        </motion.div>
        
        <motion.div
          ref={aboutRef.ref}
          initial={{ opacity: 0, y: 50 }}
          animate={aboutRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AboutSection />
        </motion.div>
        
        <motion.div
          ref={trainingRef.ref}
          initial={{ opacity: 0, y: 50 }}
          animate={trainingRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <TrainingSection />
        </motion.div>
        
        <motion.div
          ref={faqRef.ref}
          initial={{ opacity: 0, y: 50 }}
          animate={faqRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <FAQ />
        </motion.div>
        
        <motion.div
          ref={contactRef.ref}
          initial={{ opacity: 0, y: 50 }}
          animate={contactRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ContactForm />
        </motion.div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;