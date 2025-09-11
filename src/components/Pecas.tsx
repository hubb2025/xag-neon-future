import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Settings, Wrench } from "lucide-react";

const Pecas = () => {
    const handleWhatsAppClick = (productName: string) => {
        const phoneNumber = "5548984806556";
        const message = `Olá, gostaria de obter mais informações sobre ${productName}!`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    const accessories = [
        {
            id: 1,
            name: "Gerador de Energia a Diesel - TDG2500XP",
            category: "Gerador",
            description: "Partida Manual",
            image: "/lovable-uploads/gerador-2.png",
            features: [
                "Cilindradas Motor 211 cc",
                "Tensão de Saída 230V ou 115V",
                "Controle de Tensão AVR",
                "Frequência 60 Hz"
            ]
        },
        {
            id: 2,
            name: "Reboque Para Operação com Drone Comprimento útil em torno de 3,50M",
            category: "Reboque",
            description: "Precisão Extrema",
            image: "/lovable-uploads/reboque.jpg",
            features: [
                "Largura aproximada de 2M",
                "Altura interna em torno de 2M",
                "Capacidade de carga até 1.500kg",
                "Eixo duplo para maior estabilidade"
            ]
        },
        {
            id: 3,
            name: "Misturador de calda de 300 Litros Abastecimento com filtro",
            category: "Misturador de calda",
            description: "Modelo Premium",
            image: "/lovable-uploads/mistura-removebg-preview.png",
            features: [
                "Lava frasco",
                "Alças para transporte e para mangueira de abastecimento",
                "Dimensões A × L × P ",
                "140cm x 70cm x 70cm",
            ]
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-background via-background/95 to-primary/5">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <Badge variant="secondary" className="mb-4 text-sm font-semibold">
                        PEÇAS & ACESSÓRIOS
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        Equipamentos e Acessórios
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Complete sua operação com nossos equipamentos de alta qualidade,
                        <span className="text-primary font-semibold"> destacando o gerador Toyama</span> para
                        máxima autonomia em campo
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {accessories.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-[100%] h-[300px] object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                                    />

                                    <div className="absolute top-4 left-4">
                                        <Badge
                                            variant={item.category === "DESTAQUE" ? "default" : "secondary"}
                                            className={item.category === "DESTAQUE" ? "bg-primary text-primary-foreground" : ""}
                                        >
                                            {item.category}
                                        </Badge>
                                    </div>
                                    {item.category === "DESTAQUE" && (
                                        <div className="absolute top-4 right-4">
                                            <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
                                        </div>
                                    )}
                                </div>

                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 mb-6">
                                        {item.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-center mb-4">
                                        <div className="text-center">
                                            <span className="text-lg font-bold text-primary">Solicite seu Orçamento</span>
                                            {item.category === "DESTAQUE" && (
                                                <div className="flex justify-center mt-1">
                                                    <Shield className="h-5 w-5 text-green-500" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => handleWhatsAppClick(item.name)}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <Wrench className="mr-2 h-4 w-4" />
                                        Solicitar Orçamento
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border">
                        <h3 className="text-2xl font-bold mb-4">
                            🔧 Precisa de uma peça específica?
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Nossa equipe técnica pode ajudar você a encontrar exatamente o que precisa
                        </p>
                        <Button
                            onClick={() => handleWhatsAppClick("Peça Específica")}
                            size="lg"
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Settings className="mr-2 h-5 w-5" />
                            Falar com Especialista
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Pecas;