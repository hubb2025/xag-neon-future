import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="card-cyber p-8">
            <h1 className="text-4xl font-bold text-neon-green mb-8 font-tech">
              Termos de Uso
            </h1>
            
            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  1. Aceitação dos Termos
                </h2>
                <p>
                  Ao acessar e usar o website da DroneXag, você concorda em cumprir e estar 
                  vinculado aos seguintes termos e condições de uso.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  2. Descrição do Serviço
                </h2>
                <p>
                  A DroneXag é uma empresa especializada em drones para aplicações agrícolas, 
                  oferecendo produtos, serviços e consultoria no setor de tecnologia agrícola.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  3. Uso Aceitável
                </h2>
                <p className="mb-4">
                  Você concorda em usar nosso website apenas para fins legais e de acordo com estes termos. 
                  É proibido:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Usar o site para qualquer propósito ilegal ou não autorizado</li>
                  <li>Tentar obter acesso não autorizado aos nossos sistemas</li>
                  <li>Interferir no funcionamento normal do website</li>
                  <li>Transmitir vírus ou códigos maliciosos</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  4. Propriedade Intelectual
                </h2>
                <p>
                  Todo o conteúdo do website, incluindo textos, imagens, logos, e design, 
                  é propriedade da DroneXag ou de seus licenciadores e está protegido por 
                  direitos autorais e outras leis de propriedade intelectual.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  5. Limitação de Responsabilidade
                </h2>
                <p>
                  A DroneXag não será responsável por danos diretos, indiretos, incidentais 
                  ou consequenciais decorrentes do uso ou incapacidade de usar nosso website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  6. Modificações
                </h2>
                <p>
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                  As alterações entrarão em vigor imediatamente após a publicação no website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  7. Lei Aplicável
                </h2>
                <p>
                  Estes termos são regidos pelas leis brasileiras, e qualquer disputa será 
                  resolvida nos tribunais competentes do Brasil.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  8. Contato
                </h2>
                <p>
                  Para dúvidas sobre estes termos, entre em contato conosco através do 
                  e-mail: contato@agricampdrones.com
                </p>
              </section>

              <section>
                <p className="text-sm text-muted-foreground/70 border-t border-border/30 pt-4">
                  Estes termos foram atualizados pela última vez em {new Date().toLocaleDateString('pt-BR')}.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;