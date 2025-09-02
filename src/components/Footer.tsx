import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Zap } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Início", href: "#" },
    { name: "Drones", href: "#drones" },
    { name: "Sobre", href: "#sobre" },
    { name: "FAQ", href: "#faq" },
    { name: "Contato", href: "#contato" }
  ];

  const categories = [
    { name: "Drones de Vigilância", href: "#" },
    { name: "Drones de Racing", href: "#" },
    { name: "Drones de Entrega", href: "#" },
    { name: "Drones Profissionais", href: "#" },
    { name: "Acessórios", href: "#" }
  ];

  const support = [
    { name: "Central de Ajuda", href: "#" },
    { name: "Garantia", href: "#" },
    { name: "Manutenção", href: "#" },
    { name: "Treinamentos", href: "#" },
    { name: "Certificação ANAC", href: "#" }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background via-metallic to-cyber-dark border-t border-border/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/20 rounded-lg border border-primary/30 glow-green">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-cyber font-bold text-neon-green">
                DRONES Xag
              </span>
            </div>
            
            <p className="text-muted-foreground font-tech leading-relaxed">
              A mais avançada concessionária de drones do Brasil, oferecendo tecnologia de ponta 
              com design futurista e performance excepcional.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/30 transition-colors group">
                <Facebook className="h-5 w-5 text-primary group-hover:text-neon-green" />
              </a>
              <a href="#" className="p-3 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/30 transition-colors group">
                <Instagram className="h-5 w-5 text-primary group-hover:text-neon-green" />
              </a>
              <a href="#" className="p-3 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/30 transition-colors group">
                <Twitter className="h-5 w-5 text-primary group-hover:text-neon-green" />
              </a>
              <a href="#" className="p-3 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/30 transition-colors group">
                <Youtube className="h-5 w-5 text-primary group-hover:text-neon-green" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-cyber font-bold text-neon-green">
              NAVEGAÇÃO
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground font-tech hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h3 className="text-xl font-cyber font-bold text-neon-red">
              CATEGORIAS
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-muted-foreground font-tech hover:text-primary transition-colors duration-300"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-6">
            <h3 className="text-xl font-cyber font-bold text-neon-green">
              CONTATO
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground font-tech">(11) 9999-8888</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground font-tech">contato@dronesxag.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground font-tech">
                  Av. Paulista, 1000<br />
                  São Paulo - SP
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-tech font-semibold text-foreground">SUPORTE 24/7</h4>
              {support.slice(0, 3).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-muted-foreground font-tech hover:text-primary transition-colors duration-300 text-sm"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-border/30">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-cyber font-bold text-neon-green mb-2">
                FIQUE POR DENTRO
              </h3>
              <p className="text-muted-foreground font-tech">
                Receba novidades sobre lançamentos e promoções exclusivas
              </p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 bg-input/50 border border-border/50 rounded-lg focus:border-primary focus:outline-none font-tech"
              />
              <button className="btn-cyber px-6 py-3 whitespace-nowrap">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground font-tech text-sm">
              © {currentYear} DRONES Xag. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-tech">
                Política de Privacidade
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-tech">
                Termos de Uso
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-tech">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;