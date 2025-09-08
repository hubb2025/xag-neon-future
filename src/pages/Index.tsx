import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DroneCarousel from "@/components/DroneCarousel";
import DroneProductSection from "@/components/DroneProductSection";
import PartsAccessoriesSection from "@/components/PartsAccessoriesSection";
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
  const partsRef = useScrollAnimation();
  const aboutRef = useScrollAnimation();
  const trainingRef = useScrollAnimation();
  const faqRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  const droneModels = [
    {
      id: "XAG P60",
      title: "XAG P60",
      subtitle: "Pequenas Propriedades",
      description:
        "O XAG P60 é o drone ideal para quem inicia no agronegócio. Com capacidade de 30 L, cobre até 12 hectares por hora e oferece autonomia de 12 minutos. Equipado com sensor Radar 4D e design compacto de apenas 25 kg, reduz custos operacionais e o amassamento da lavoura. Versátil, permite pulverização líquida e distribuição de sólidos em um único equipamento, garantindo retorno financeiro rápido e preciso.",
      image: "/lovable-uploads/80bab24b-15fb-47fe-ade1-dda75319c061.png",
      badge: "MAIS VENDIDO",
      features: [
        "Cobertura: 12 hectares/hora",
        "Câmera 8K com estabilização em 3 eixos para imagens profissionais",
        "Taxa de fluxo: 16 L/min",
        "Sistema anti-colisão com sensores 360° para máxima segurança",
        "Capacidade do tanque: 30L",
        "Autonomia: 12 minutos",
      ],
      specs: {
        flightTime: "12min",
        range: "15km",
        payload: "30 Litros",
        camera: "8K/60fps",
        capacity: "30L",
        coverage: "12ha/h",
        weight: "25kg",
      },
    },
    {
      id: "XAG P100 PRO",
      title: "XAG P100 PRO",
      subtitle: "Precisão Extrema",
      description:
        "O XAG P100 Pro oferece capacidade de 50 L (60 L opcional), cobertura de até 20 hectares por hora e autonomia de 19 minutos. Equipado com sensor Radar 4D e RTK com precisão de ±2,5 cm, garante máxima exatidão nas operações. Com peso de 46 kg, é o modelo intermediário ideal para propriedades médias, reduzindo em até 7% o amassamento da lavoura e otimizando a aplicação de líquidos e sólidos em um único voo, assegurando um ROI consistente e elevado.",
      image: "/lovable-uploads/a716d702-40cb-40bb-a842-a73475fd5abe.png",
      badge: "LANÇAMENTO",
      features: [
        "Capacidade 50 L (60 L oficial)",
        "Taxa de aplicação de 22 L/min",
        "Carga útil de pulverização de 50 kg",
        "Radar 4D + RTK + precisão 2,5 cm",
        "IA para detecção de obstáculos",
        "Mapeamento em tempo real",
      ],
      specs: {
        flightTime: "75min",
        range: "25km",
        payload: "50 Litros",
        camera: "8K+IR",
        capacity: "50L",
        coverage: "15ha/h",
        weight: "22kg",
      },
    },
    {
      id: "XAG P150",
      title: "XAG P150",
      subtitle: "Modelo Premium",
      description:
        "O XAG P150 é o drone premium ideal para grandes áreas, com tanque de 100 L, taxa de aplicação de 40 L/min e cobertura de até 22 hectares por hora em 25 minutos de autonomia. Equipado com Radar 4D e RTK com precisão de ±1,5 cm, aliado a um robusto chassi de 65 kg, garante eficiência mesmo em solos desafiadores. Versátil, realiza pulverização líquida e distribuição de sólidos em um único voo, entregando produtividade superior e um retorno de investimento incomparável.",
      image: "/lovable-uploads/e004268f-665d-4e77-a00e-241c47a47044.png",
      badge: "PROFISSIONAL",
      features: [
        "Capacidade 100 L (115 L oficial)",
        "Taxa de aplicação de 30 L/min",
        "Carga útil de pulverização de 65 kg",
        "Radar 4D + RTK + precisão 2,5 cm",
        "IA para detecção de obstáculos",
        "Mapeamento em tempo real",
      ],
      specs: {
        flightTime: "55min",
        range: "20km",
        payload: "100 Litros",
        camera: "4K/30fps",
        capacity: "100L",
        coverage: "10ha/h",
        weight: "65kg",
      },
    },
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
          ref={partsRef.ref}
          initial={{ opacity: 0, y: 50 }}
          animate={partsRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <PartsAccessoriesSection />
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