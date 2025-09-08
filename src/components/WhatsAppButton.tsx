import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const whatsappNumber = "554884742150"; // Número do WhatsApp
  const message = "Olá! Espero que esteja bem. Gostaria de saber mais informações sobre os drones XAG. Poderia me ajudar?";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Layout Desktop */}
      <div className="hidden md:flex items-center gap-3">
        <motion.div
          className="bg-white/95 backdrop-blur-sm text-primary px-4 py-2 rounded-full shadow-lg border border-border/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="font-medium text-sm whitespace-nowrap">Falar agora!</span>
        </motion.div>
        
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#22c55e] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
        </motion.a>
      </div>

      {/* Layout Mobile */}
      <div className="md:hidden">
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#22c55e] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl group relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
          
          {/* Tooltip Mobile */}
          <div className="absolute bottom-full right-0 mb-2 bg-white/95 backdrop-blur-sm text-primary px-3 py-1 rounded-lg shadow-lg border border-border/50 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Falar agora!
            <div className="absolute top-full right-3 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-white/95"></div>
          </div>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default WhatsAppButton;