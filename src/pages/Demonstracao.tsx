import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { motion } from 'framer-motion';

const Demonstracao = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-cyber font-black mb-6">
                <span className="text-neon-green">DEMONSTRAÇÃO</span>
                <br />
                <span className="text-foreground">EM AÇÃO</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Veja nossos drones em operação real. Tecnologia de ponta em movimento para você escolher o modelo ideal.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                poster="/lovable-uploads/hero-drone.jpg"
              >
                <source 
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
                  type="video/mp4" 
                />
                Seu navegador não suporta a reprodução de vídeo.
              </video>
              
              {/* Overlay com informações */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-white font-bold text-lg mb-2">
                    Demonstração XAG P Series
                  </h3>
                  <p className="text-white/80 text-sm">
                    Veja a precisão e eficiência dos nossos drones em operações reais de pulverização agrícola
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modelos em Destaque */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-cyber font-bold mb-4">
                <span className="text-neon-green">MODELOS</span> EM DESTAQUE
              </h2>
              <p className="text-muted-foreground text-lg">
                Conheça as especificações técnicas dos nossos principais modelos
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "XAG P60",
                  image: "/lovable-uploads/80bab24b-15fb-47fe-ade1-dda75319c061.png",
                  specs: ["12 hectares/hora", "Câmera 8K", "Autonomia 65min"]
                },
                {
                  name: "XAG P100 PRO",
                  image: "/lovable-uploads/a716d702-40cb-40bb-a842-a73475fd5abe.png",
                  specs: ["15 hectares/hora", "Visão noturna", "Autonomia 75min"]
                },
                {
                  name: "XAG P150",
                  image: "/lovable-uploads/e004268f-665d-4e77-a00e-241c47a47044.png",
                  specs: ["10 hectares/hora", "Carga 10kg", "Autonomia 55min"]
                }
              ].map((drone, index) => (
                <motion.div
                  key={drone.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img 
                    src={drone.image} 
                    alt={drone.name}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h3 className="text-xl font-bold mb-3 text-center">{drone.name}</h3>
                  <ul className="space-y-2">
                    {drone.specs.map((spec, specIndex) => (
                      <li key={specIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Demonstracao;