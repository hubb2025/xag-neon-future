import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye, Zap, Shield, Timer } from "lucide-react";

interface DroneCardProps {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  category: string;
  isNew?: boolean;
}

const DroneCard = ({ 
  name, 
  image, 
  price, 
  originalPrice, 
  description, 
  features, 
  category, 
  isNew 
}: DroneCardProps) => {
  return (
    <Card className="card-cyber group overflow-hidden hover:scale-[1.02] transition-all duration-300">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
            {category}
          </Badge>
          {isNew && (
            <Badge className="bg-secondary/20 text-secondary border-secondary/30">
              NOVO
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" variant="outline" className="bg-background/80 backdrop-blur-sm">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="font-cyber text-xl text-neon-green group-hover:text-primary transition-colors">
          {name}
        </CardTitle>
        <p className="text-muted-foreground font-tech text-sm leading-relaxed">
          {description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
              {index === 0 && <Zap className="h-3 w-3" />}
              {index === 1 && <Shield className="h-3 w-3" />}
              {index === 2 && <Timer className="h-3 w-3" />}
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-cyber font-bold text-neon-green">
                {price}
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {originalPrice}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground font-tech">
              ou 12x sem juros
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button className="btn-cyber flex-1">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Comprar
          </Button>
          <Button variant="outline" className="btn-cyber-red">
            Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DroneCard;