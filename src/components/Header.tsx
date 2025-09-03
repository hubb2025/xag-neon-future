import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const navItems = [
    { name: "Início", href: "/" },
    { 
      name: "Produtos", 
      href: "#", 
      hasDropdown: true,
      subItems: [
        { name: "XAG Phantom Pro", href: "/drones/xag-phantom-pro" },
        { name: "XAG Stealth Elite", href: "/drones/xag-stealth-elite" },
        { name: "XAG Cargo Master", href: "/drones/xag-cargo-master" }
      ]
    },
    { name: "Treinamento", href: "#treinamento" },
    { name: "Sobre", href: "#sobre" },
    { name: "FAQ", href: "#faq" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-50/90 backdrop-blur-md border-b border-green-200/30 relative">
      {/* Green decorative lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-300/20 to-transparent"></div>
        <div className="absolute top-2 left-1/4 w-16 h-px bg-green-400/20"></div>
        <div className="absolute bottom-2 right-1/4 w-20 h-px bg-green-300/15"></div>
      </div>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/lovable-uploads/logo-comprida-drone__1_-removebg-preview.png"
              alt="DRONES Xag Logo"
              style={{ height: '60px', width: '190px' }}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <button
                      className="text-green-600 hover:text-green-500 transition-colors duration-300 font-tech uppercase tracking-wide text-sm flex items-center"
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {/* Dropdown Menu */}
                    <div 
                      className={`absolute top-full left-0 w-56 bg-background/95 backdrop-blur-md border border-border/30 rounded-lg shadow-lg transition-all duration-200 z-50 ${
                        isProductsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      {item.subItems?.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 text-green-600 hover:text-green-500 hover:bg-primary/10 transition-colors duration-200 font-tech text-sm first:rounded-t-lg last:rounded-b-lg"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-green-600 hover:text-green-500 transition-colors duration-300 font-tech uppercase tracking-wide text-sm"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Language Selector & CTA Button Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Explorar Drones
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border/30">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        className="text-green-600 hover:text-green-500 transition-colors duration-300 font-tech uppercase tracking-wide text-sm py-2 flex items-center justify-between w-full"
                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                      >
                        {item.name}
                        <ChevronDown className={`h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isProductsOpen && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.subItems?.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-green-600 hover:text-green-500 transition-colors duration-300 font-tech text-sm py-1"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsProductsOpen(false);
                              }}
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className="text-green-600 hover:text-green-500 transition-colors duration-300 font-tech uppercase tracking-wide text-sm py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
              <div className="mt-4 space-y-4">
                <LanguageSelector />
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Explorar Drones
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
