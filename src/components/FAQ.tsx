import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Qual a autonomia média dos drones DRONES Xag?",
      answer: "Nossos drones possuem autonomia que varia entre 30 a 60 minutos, dependendo do modelo. Os modelos profissionais como o Xag Cargo Master chegam a 60 minutos de voo contínuo, enquanto os modelos de corrida focam em performance com 30-35 minutos de autonomia."
    },
    {
      question: "Os drones vêm com garantia?",
      answer: "Sim! Todos os nossos drones vêm com garantia de 2 anos contra defeitos de fabricação. Além disso, oferecemos suporte técnico 24/7 e manutenção preventiva gratuita no primeiro ano."
    },
    {
      question: "É necessário registro na ANAC?",
      answer: "Para drones acima de 250g, sim. Auxiliamos nossos clientes com todo o processo de registro na ANAC e fornecemos orientações sobre as regulamentações brasileiras para uso de drones."
    },
    {
      question: "Vocês oferecem treinamento?",
      answer: "Absolutamente! Oferecemos cursos de pilotagem básica e avançada, além de treinamentos especializados para uso comercial. Nossos instrutores são certificados e utilizam simuladores de última geração."
    },
    {
      question: "Qual o prazo de entrega?",
      answer: "Para modelos em estoque, a entrega é feita em até 48h para São Paulo e até 5 dias úteis para todo o Brasil. Modelos customizados podem levar de 15 a 30 dias para produção."
    },
    {
      question: "Aceitam financiamento?",
      answer: "Sim! Trabalhamos com parcelamento em até 24x sem juros no cartão de crédito e também oferecemos financiamento através de nossos parceiros bancários com condições especiais para profissionais."
    }
  ];

  return (
    <section id="faq" className="py-20 relative section-dark">
      {/* Advanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-pattern h-full"></div>
      </div>
      <div className="cyber-lines absolute inset-0"></div>
      <div className="cyber-circuit absolute inset-0"></div>
      <div className="cyber-matrix absolute inset-0"></div>
      
      {/* Data Streams */}
      <div className="cyber-data-stream"></div>
      <div className="cyber-data-stream"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-cyber font-black">
            <span className="text-neon-green">PERGUNTAS</span>{" "}
            <span className="text-foreground">FREQUENTES</span>
          </h2>
          <p className="text-xl text-muted-foreground font-tech max-w-3xl mx-auto">
            Tire suas dúvidas sobre nossos drones e serviços
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="card-cyber px-6 py-2 border-border/30"
              >
                <AccordionTrigger className="text-left font-tech text-lg hover:text-primary transition-colors hover:no-underline">
                  <span className="text-neon-green mr-4 font-cyber font-bold">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-tech leading-relaxed pt-4 pl-12">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground font-tech mb-6">
            Não encontrou a resposta que procurava?
          </p>
          <a
            href="#contato"
            className="inline-flex items-center btn-cyber text-lg px-8 py-4 hover:no-underline"
          >
            Entre em Contato
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;