import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="card-cyber p-8">
            <h1 className="text-4xl font-bold text-neon-green mb-8 font-tech">
              Política de Cookies
            </h1>
            
            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  O que são Cookies?
                </h2>
                <p>
                  Cookies são pequenos arquivos de texto que são armazenados em seu dispositivo 
                  quando você visita um website. Eles são amplamente utilizados para fazer os 
                  websites funcionarem de forma mais eficiente e fornecer informações aos proprietários do site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  Como Usamos Cookies
                </h2>
                <p className="mb-4">
                  A DroneXag utiliza cookies para:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Garantir que nosso website funcione corretamente</li>
                  <li>Analisar como nosso website é usado</li>
                  <li>Personalizar conteúdo e anúncios</li>
                  <li>Lembrar suas preferências e configurações</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  Tipos de Cookies que Utilizamos
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      Cookies Essenciais
                    </h3>
                    <p>
                      Estes cookies são necessários para o funcionamento básico do website e 
                      não podem ser desabilitados em nossos sistemas.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      Cookies de Análise
                    </h3>
                    <p>
                      Estes cookies nos permitem contar visitas e fontes de tráfego para que 
                      possamos medir e melhorar o desempenho do nosso website.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      Cookies de Funcionalidade
                    </h3>
                    <p>
                      Estes cookies permitem que o website forneça funcionalidade aprimorada 
                      e personalização, incluindo lembrar suas preferências.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  Cookies de Terceiros
                </h2>
                <p>
                  Também podemos usar cookies de terceiros confiáveis para nos ajudar a analisar 
                  e entender como você usa este website. Estes cookies serão armazenados em seu 
                  navegador apenas com seu consentimento.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  Gerenciando Cookies
                </h2>
                <p className="mb-4">
                  Você pode controlar e/ou excluir cookies conforme desejar. Você pode:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Excluir todos os cookies que já estão em seu computador</li>
                  <li>Configurar a maioria dos navegadores para impedir que cookies sejam colocados</li>
                  <li>Usar as configurações de seu navegador para gerenciar cookies</li>
                </ul>
                <p className="mt-4">
                  Note que desabilitar cookies pode afetar a funcionalidade deste website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  Atualizações desta Política
                </h2>
                <p>
                  Podemos atualizar nossa Política de Cookies periodicamente. Recomendamos que 
                  você revise esta página regularmente para se manter informado sobre nosso uso de cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 font-tech">
                  Contato
                </h2>
                <p>
                  Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato 
                  conosco através do e-mail: contato@agricampdrones.com
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

export default CookiePolicy;