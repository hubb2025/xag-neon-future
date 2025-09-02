import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="card-cyber p-8">
            <h1 className="text-4xl font-bold text-neon-green mb-8 font-tech">
              Política de Privacidade
            </h1>
            
            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  1. Informações que Coletamos
                </h2>
                <p className="mb-4">
                  A DroneXag coleta informações que você nos fornece diretamente, como quando você:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Preenche nossos formulários de contato</li>
                  <li>Se inscreve em nossa newsletter</li>
                  <li>Solicita orçamentos ou informações sobre nossos produtos</li>
                  <li>Entra em contato conosco por e-mail ou telefone</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  2. Como Usamos suas Informações
                </h2>
                <p className="mb-4">
                  Utilizamos as informações coletadas para:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Responder às suas solicitações e fornecer suporte</li>
                  <li>Enviar informações sobre nossos produtos e serviços</li>
                  <li>Melhorar nosso website e experiência do usuário</li>
                  <li>Cumprir obrigações legais e regulamentares</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  3. Compartilhamento de Informações
                </h2>
                <p>
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
                  exceto quando necessário para fornecer nossos serviços ou quando exigido por lei.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  4. Segurança dos Dados
                </h2>
                <p>
                  Implementamos medidas de segurança apropriadas para proteger suas informações 
                  pessoais contra acesso, alteração, divulgação ou destruição não autorizados.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  5. Seus Direitos
                </h2>
                <p className="mb-4">
                  Você tem o direito de:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir informações imprecisas</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Retirar seu consentimento a qualquer momento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  6. Contato
                </h2>
                <p>
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta política, 
                  entre em contato conosco através do e-mail: contato@agricampdrones.com
                </p>
              </section>

              <section>
                <p className="text-sm text-muted-foreground/70 border-t border-border/30 pt-4">
                  Esta política foi atualizada pela última vez em {new Date().toLocaleDateString('pt-BR')}.
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

export default PrivacyPolicy;