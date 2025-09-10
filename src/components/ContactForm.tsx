import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { contactFormSchema, sanitizeInput, formatPhoneNumber, type ContactFormData } from "@/lib/validation";

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});

    try {
      // Validate form data with Zod schema
      const validatedData = contactFormSchema.parse(formData);
      
      // Sanitize input data to prevent XSS
      const sanitizedData = {
        name: sanitizeInput(validatedData.name),
        email: sanitizeInput(validatedData.email),
        phone: validatedData.phone ? sanitizeInput(validatedData.phone) : null,
        message: sanitizeInput(validatedData.message)
      };

      // Call the edge function to submit the contact form
      const { data, error } = await supabase.functions.invoke('submit-contact-form', {
        body: sanitizedData
      });

      if (error) throw error;

      toast({
        title: "Mensagem enviada com sucesso!",
        description: `Seu ticket ${data.ticket_number} foi criado e nossa equipe entrará em contato em breve. Obrigado pelo interesse!`,
      });

      // Reset form and validation errors
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      setValidationErrors({});

    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const errors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setValidationErrors(errors);
        toast({
          title: "Dados inválidos",
          description: "Por favor, corrija os erros no formulário",
          variant: "destructive",
        });
      } else {
        console.error('Error creating support ticket:', error);
        toast({
          title: "Erro ao enviar mensagem",
          description: "Houve um problema ao processar sua solicitação. Tente novamente ou entre em contato por telefone.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[name as keyof ContactFormData]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    // Format phone number on change
    const formattedValue = name === 'phone' ? formatPhoneNumber(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  return (
    <section id="contato" className="py-20 relative section-green">
      {/* Green Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/10 to-secondary/3"></div>
      <div className="absolute inset-0 grid-pattern-light opacity-30"></div>
      <div className="cyber-corner absolute inset-0 opacity-50"></div>
      <div className="cyber-circuit absolute inset-0"></div>

      {/* Additional Cyber Elements */}
      <div className="absolute top-10 right-10 w-24 h-24 cyber-hexagon opacity-25"></div>
      <div className="absolute bottom-10 left-10 w-18 h-18 border border-primary/40 rotate-45"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-cyber font-black">
            <span className="text-neon-green">ENTRE EM</span>{" "}
            <span className="text-neon-red">CONTATO</span>
          </h2>
          <p className="text-xl text-white/90 font-tech max-w-3xl mx-auto">
            Pronto para decolar? Fale conosco e descubra o drone perfeito para você
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="card-cyber-green">
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
                    <p className="font-tech font-semibold text-white">Telefone</p>
                    <p className="text-white/80">+55 (48) 98480-6556</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/20 rounded-lg border border-primary/30">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-tech font-semibold text-white">Email</p>
                    <p className="text-white/80">comercial@dronesxag.com.br</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/20 rounded-lg border border-primary/30">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-tech font-semibold text-white">Endereço</p>
                    <p className="text-white/80">
                      Avenida Mário José Mateus, 220 <br />
                      Bairro Vela Vista - 88.132-705
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="card-cyber-green">
              <CardHeader>
                <CardTitle className="font-cyber text-xl text-secondary">
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-tech text-white/70">Segunda - Sexta</span>
                  <span className="text-white">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-tech text-white/70">Sábado</span>
                  <span className="text-white">9:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-tech text-white/70">Domingo</span>
                  <span className="text-secondary">Fechado</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="card-cyber-green">
            <CardHeader>
              <CardTitle className="font-cyber text-2xl text-primary">
                Envie sua Mensagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-tech font-semibold text-white mb-2">
                      Nome *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={validationErrors.name ? "border-destructive" : ""}
                      placeholder="Seu nome completo"
                    />
                    {validationErrors.name && (
                      <div className="flex items-center mt-1 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {validationErrors.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-tech font-semibold text-white mb-2">
                      Telefone
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={validationErrors.phone ? "border-destructive" : ""}
                      placeholder="(11) 99999-9999"
                    />
                    {validationErrors.phone && (
                      <div className="flex items-center mt-1 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {validationErrors.phone}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-tech font-semibold text-white mb-2">
                    Email *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={validationErrors.email ? "border-destructive" : ""}
                    placeholder="seu@email.com"
                  />
                  {validationErrors.email && (
                    <div className="flex items-center mt-1 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {validationErrors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-tech font-semibold text-white mb-2">
                    Mensagem *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`resize-none ${validationErrors.message ? "border-destructive" : ""}`}
                    placeholder="Conte-nos sobre seu interesse em drones..."
                  />
                  {validationErrors.message && (
                    <div className="flex items-center mt-1 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {validationErrors.message}
                    </div>
                  )}
                </div>

                <Button type="submit" disabled={loading} className="btn-cyber w-full text-lg py-3">
                  <Send className="mr-2 h-5 w-5" />
                  {loading ? "Enviando..." : "Enviar Mensagem"}
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