import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Componente do Drone 3D
const DroneModel = () => {
  const droneRef = useRef<Group>(null);

  return (
    <group ref={droneRef} position={[0, 0, 0]}>
      {/* Corpo principal do drone */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.6]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Braços do drone */}
      <mesh position={[0.4, 0, 0.4]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.4, 0, 0.4]} rotation={[0, -Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.4, 0, -0.4]} rotation={[0, -Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.4, 0, -0.4]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Motores */}
      <mesh position={[0.5, 0.05, 0.5]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-0.5, 0.05, 0.5]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.5, 0.05, -0.5]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-0.5, 0.05, -0.5]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Hélices */}
      <mesh position={[0.5, 0.1, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.01]} />
        <meshStandardMaterial color="#00ff88" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-0.5, 0.1, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.01]} />
        <meshStandardMaterial color="#00ff88" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.5, 0.1, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.01]} />
        <meshStandardMaterial color="#00ff88" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-0.5, 0.1, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.01]} />
        <meshStandardMaterial color="#00ff88" transparent opacity={0.8} />
      </mesh>

      {/* Câmera */}
      <mesh position={[0, -0.08, 0.3]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* LEDs */}
      <mesh position={[0.1, 0.02, 0.3]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.1, 0.02, 0.3]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

export const DroneViewer3D = () => {
  return (
    <section className="py-20 px-4 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-primary border-primary/50">
            Visualização 3D
          </Badge>
          <h2 className="text-4xl font-cyber font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            EXPLORE NOSSO DRONE EM 360°
          </h2>
          <p className="text-muted-foreground font-tech max-w-2xl mx-auto">
            Interaja com nosso modelo 3D. Clique e arraste para rotacionar, use o scroll para zoom.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Visualizador 3D */}
          <Card className="card-cyber-light h-[500px] overflow-hidden">
            <CardContent className="p-0 h-full">
              <Canvas className="w-full h-full">
                <PerspectiveCamera makeDefault position={[2, 1, 2]} fov={50} />
                <OrbitControls 
                  enablePan={false}
                  minDistance={1.5}
                  maxDistance={5}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 6}
                />
                
                {/* Iluminação */}
                <ambientLight intensity={0.4} />
                <directionalLight 
                  position={[5, 5, 5]} 
                  intensity={1}
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                />
                <pointLight position={[-2, 2, 2]} intensity={0.5} color="#00ff88" />
                
                {/* Ambiente */}
                <Environment preset="studio" />
                
                {/* Modelo do Drone */}
                <DroneModel />
              </Canvas>
            </CardContent>
          </Card>

          {/* Informações do Drone */}
          <div className="space-y-6">
            <Card className="card-cyber-light">
              <CardHeader>
                <CardTitle className="font-cyber text-primary">XAG PHANTOM PRO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-primary/10">
                    <div className="text-2xl font-cyber font-bold text-primary">45min</div>
                    <div className="text-sm text-muted-foreground font-tech">Autonomia</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-primary/10">
                    <div className="text-2xl font-cyber font-bold text-primary">8km</div>
                    <div className="text-sm text-muted-foreground font-tech">Alcance</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-primary/10">
                    <div className="text-2xl font-cyber font-bold text-primary">15kg</div>
                    <div className="text-sm text-muted-foreground font-tech">Carga Útil</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-primary/10">
                    <div className="text-2xl font-cyber font-bold text-primary">4K</div>
                    <div className="text-sm text-muted-foreground font-tech">Câmera</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-cyber-light">
              <CardHeader>
                <CardTitle className="font-cyber text-lg">Características Principais</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-tech text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Sistema de navegação GPS avançado
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Resistente a ventos de até 60 km/h
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Carregamento rápido em 90 minutos
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Controle remoto com display integrado
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-sm text-muted-foreground font-tech mb-4">
                🖱️ Clique e arraste para rotacionar<br/>
                🔍 Use a roda do mouse para zoom
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};