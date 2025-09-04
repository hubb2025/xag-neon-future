import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const whatsappNumber = "5511999999999"; // Substitua pelo número real
  const message = "Olá! Gostaria de saber mais informações sobre os drones.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Container para desktop */}
      <div className="hidden md:flex items-center gap-3">
        {/* Mensagem desktop */}
        <motion.div
          className="bg-white text-primary px-4 py-2 rounded-full shadow-lg border border-border"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="font-medium text-sm">Falar agora!</span>
        </motion.div>
        
        {/* Botão WhatsApp desktop */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#22c55e] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 group flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        </motion.a>
      </div>

      {/* Container para mobile */}
      <div className="md:hidden relative">
        {/* Mensagem mobile */}
        <motion.div
          className="absolute -top-14 right-0 bg-white text-primary px-3 py-2 rounded-lg shadow-lg border border-border text-xs font-medium whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Falar agora!
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </motion.div>
        
        {/* Botão WhatsApp mobile */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#22c55e] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 group block"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default WhatsAppButton;