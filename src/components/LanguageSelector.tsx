import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState("PT-BR");
  const { toast } = useToast();

  const languages = [
    { code: "PT-BR", name: "Português", flag: "🇧🇷" },
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "DE", name: "Deutsch", flag: "🇩🇪" },
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    const selectedLang = languages.find(lang => lang.code === languageCode);
    
    toast({
      title: "Idioma alterado!",
      description: `Idioma alterado para ${selectedLang?.name} ${selectedLang?.flag}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-background/80 backdrop-blur-sm border-border/30 hover:bg-primary/10 hover:border-primary/50">
          <Globe className="h-4 w-4 mr-2" />
          <span className="text-sm font-tech">{currentLang?.flag} {currentLang?.code}</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background/95 backdrop-blur-sm border-border/30">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer"
          >
            <span className="mr-3">{language.flag}</span>
            <span className="font-tech">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;