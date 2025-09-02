import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve. Obrigado pelo interesse!",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contato" className="py-20 relative section-light">
      {/* Light Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-background to-secondary/3"></div>
      <div className="absolute inset-0 grid-pattern-light opacity-20"></div>
      <div className="cyber-corner absolute inset-0 opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-cyber font-black">
            <span className="text-neon-green">ENTRE EM</span>{" "}
            <span className="text-neon-red">CONTATO</span>
          </h2>
          <p className="text-xl text-muted-foreground font-tech max-w-3xl mx-auto">
            Pronto para decolar? Fale conosco e descubra o drone perfeito para você
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="card-cyber-light">
              <CardHeader>
                <CardTitle className="font-cyber text-2xl text-primary">
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/20 rounded-lg border border-primary/30">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-tech font-semibold text-gray-800">Telefone</p>
                    <p className="text-gray-600">(11) 9999-8888</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/20 rounded-lg border border-primary/30">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-tech font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">contato@dronesxag.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/20 rounded-lg border border-primary/30">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-tech font-semibold text-gray-800">Endereço</p>
                    <p className="text-gray-600">
                      Av. Paulista, 1000<br />
                      São Paulo - SP, 01310-100
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="card-cyber-light">
              <CardHeader>
                <CardTitle className="font-cyber text-xl text-secondary">
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-tech text-gray-600">Segunda - Sexta</span>
                  <span className="text-gray-800">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-tech text-gray-600">Sábado</span>
                  <span className="text-gray-800">9:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-tech text-gray-600">Domingo</span>
                  <span className="text-secondary">Fechado</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="card-cyber-light">
            <CardHeader>
              <CardTitle className="font-cyber text-2xl text-primary">
                Envie sua Mensagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-tech font-semibold text-gray-800 mb-2">
                      Nome *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-50/50 border-gray-300 focus:border-primary"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-tech font-semibold text-gray-800 mb-2">
                      Telefone
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-gray-50/50 border-gray-300 focus:border-primary"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-tech font-semibold text-gray-800 mb-2">
                    Email *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-50/50 border-gray-300 focus:border-primary"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-tech font-semibold text-gray-800 mb-2">
                    Mensagem *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-gray-50/50 border-gray-300 focus:border-primary resize-none"
                    placeholder="Conte-nos sobre seu interesse em drones..."
                  />
                </div>

                <Button type="submit" className="btn-cyber w-full text-lg py-3">
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;