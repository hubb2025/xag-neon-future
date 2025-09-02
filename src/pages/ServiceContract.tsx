import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ServiceContract = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="card-cyber p-8">
            <h1 className="text-4xl font-bold text-neon-green mb-8 font-tech">
              Contrato de Prestação de Serviços
            </h1>
            
            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  1. Partes Contratantes
                </h2>
                <p>
                  Este contrato é celebrado entre a DroneXag, empresa especializada em tecnologia 
                  agrícola e drones (PRESTADORA), e o CONTRATANTE dos serviços.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  2. Objeto do Contrato
                </h2>
                <p className="mb-4">
                  A PRESTADORA compromete-se a fornecer os seguintes serviços:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Venda e locação de drones para aplicação agrícola</li>
                  <li>Serviços de pulverização e monitoramento de culturas</li>
                  <li>Treinamento e capacitação técnica</li>
                  <li>Suporte técnico e manutenção de equipamentos</li>
                  <li>Consultoria em tecnologia agrícola</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  3. Obrigações da Prestadora
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Executar os serviços com qualidade e dentro dos prazos acordados</li>
                  <li>Fornecer equipamentos em perfeitas condições de funcionamento</li>
                  <li>Disponibilizar técnicos qualificados e certificados</li>
                  <li>Manter sigilo sobre informações confidenciais do CONTRATANTE</li>
                  <li>Cumprir todas as regulamentações da ANAC para operação de drones</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  4. Obrigações do Contratante
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Efetuar o pagamento conforme condições acordadas</li>
                  <li>Fornecer acesso às áreas de aplicação dos serviços</li>
                  <li>Comunicar antecipadamente alterações nas especificações</li>
                  <li>Zelar pelos equipamentos quando em sua posse</li>
                  <li>Seguir as instruções de segurança fornecidas</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  5. Condições de Pagamento
                </h2>
                <p>
                  Os valores e condições de pagamento serão estabelecidos em proposta 
                  comercial específica, conforme o tipo e complexidade dos serviços contratados.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  6. Prazo e Vigência
                </h2>
                <p>
                  O prazo de execução dos serviços será definido em proposta comercial, 
                  podendo ser renovado mediante acordo entre as partes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  7. Garantias
                </h2>
                <p>
                  A PRESTADORA garante a qualidade dos serviços prestados pelo período de 30 dias 
                  após a conclusão, comprometendo-se a corrigir eventuais falhas sem custo adicional.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  8. Responsabilidades e Seguros
                </h2>
                <p>
                  A PRESTADORA mantém seguro de responsabilidade civil para cobertura de 
                  eventuais danos a terceiros durante a prestação dos serviços.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  9. Rescisão
                </h2>
                <p>
                  O contrato poderá ser rescindido por qualquer das partes mediante aviso 
                  prévio de 30 dias, respeitando-se os compromissos já assumidos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  10. Foro
                </h2>
                <p>
                  Fica eleito o foro da comarca de localização da PRESTADORA para dirimir 
                  quaisquer questões oriundas deste contrato.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  Contato para Contratação
                </h2>
                <p>
                  Para solicitar orçamento ou contratar nossos serviços, entre em contato 
                  através do e-mail: contato@agricampdrones.com
                </p>
              </section>

              <section>
                <p className="text-sm text-muted-foreground/70 border-t border-border/30 pt-4">
                  Este modelo de contrato foi atualizado pela última vez em {new Date().toLocaleDateString('pt-BR')}.
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

export default ServiceContract;