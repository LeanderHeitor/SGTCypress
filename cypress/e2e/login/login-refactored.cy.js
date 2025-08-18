/**
 * 🔄 TESTE REFATORADO: POM + Screenplay Pattern
 * 
 * ESTRUTURA HÍBRIDA:
 * - Screenplay Pattern: Fluxo principal, lógica de negócio, cenários complexos
 * - POM: Validações específicas, elementos complexos, verificações detalhadas
 * 
 * BENEFÍCIOS:
 * - Legibilidade melhorada com linguagem natural
 * - Reutilização de componentes
 * - Separação clara de responsabilidades
 * - Facilidade de manutenção
 */

// 📦 Imports Screenplay Pattern
import { Actor, Cast, Login, VerifyRequiredFields, TheLoginState, TheLoginCookies, TheLoginError, BrowseTheWeb } from '../../screenplay/index.js';

// 📦 Imports POM (para validações específicas)
import LoginActions from '../../support/pages/login/loginActions';

describe('🔐 Login - Refatorado (POM + Screenplay)', () => {
    let admin, departamentoRegional, invalidUser;

    beforeEach(() => {
        // 🎭 PASSO 1: Criar atores do Screenplay
        admin = Cast.actorNamed('Admin').withCredentials('admin');
        departamentoRegional = Cast.actorNamed('Departamento Regional').withCredentials('departamentoRegional');
        invalidUser = Cast.actorNamed('Usuário Inválido');
        
        // 🌐 PASSO 2: Adicionar habilidades aos atores
        admin.whoCan(BrowseTheWeb.using());
        departamentoRegional.whoCan(BrowseTheWeb.using());
        invalidUser.whoCan(BrowseTheWeb.using());
    });

    describe('✅ Cenários de Sucesso', () => {
        
        it('deve fazer login com sucesso usando Screenplay + POM para validação', () => {
            // 🎬 SCREENPLAY: Fluxo principal de login
            admin.attemptsTo(
                Login.asAdmin()
            );

            // 🎭 SCREENPLAY: Verificar estado do login
            admin.asks(TheLoginState.ofCurrentUser().isLoggedIn());

            // 🏠 POM: Validações específicas de cookies (POM é melhor para isso)
            LoginActions.checkLoginCookies();
            
            // 📊 Log do resultado
            cy.log('✅ Login realizado com Screenplay + validação POM');
        });

        it('login como admin com validação híbrida', () => {
            // 🎬 SCREENPLAY: Executar login
            admin.attemptsTo(
                Login.withCredentials(
                    Cypress.env('admin_login_email'), 
                    Cypress.env('admin_login_senha')
                )
            );

            // 🎭 SCREENPLAY: Verificar estado
            admin.asks(TheLoginState.ofCurrentUser().isLoggedIn());
            
            // 🏠 POM: Verificação específica do dashboard (POM tem lógica específica)
            cy.get('body').then($body => {
                if ($body.find('h1:contains("Dashboard")').length > 0) {
                    cy.log('✅ Dashboard validado via DOM');
                } else {
                    cy.url().should('not.include', '/login');
                    cy.log('✅ Login validado via URL');
                }
            });
        });

        it('login como Departamento Regional com contexto gerenciado', () => {
            // 🎬 SCREENPLAY: Login com contexto
            departamentoRegional.attemptsTo(
                Login.asDepartamentoRegional()
            );

            // 🎭 SCREENPLAY: Verificações de estado  
            departamentoRegional.asks(TheLoginState.ofCurrentUser().isLoggedIn());
            departamentoRegional.asks(TheLoginCookies.present().areValid());

            // 📋 Verificar contexto armazenado
            expect(departamentoRegional.recall('isLoggedIn')).to.be.true;
            expect(departamentoRegional.recall('userType')).to.equal('departamentoRegional');

            // 🏠 POM: Validação específica de cookies
            LoginActions.checkLoginCookies();
        });
    });

    describe('❌ Cenários de Erro', () => {

        it('login com email não cadastrado deve falhar', () => {
            // 🎬 SCREENPLAY: Tentar login que deve falhar
            invalidUser.attemptsTo(
                Login.withCredentials('esseemailnaoexiste@sistemafiepe.org.br', '123456')
            );

            // 🎭 SCREENPLAY: Verificar que login falhou
            invalidUser.asks(TheLoginState.ofCurrentUser().isLoggedOut());
            invalidUser.asks(TheLoginError.displayed().hasInvalidCredentialsError());

            // 🏠 POM: Validação específica de erro (POM tem a lógica complexa)
            cy.get('body').then($body => {
                const hasError = $body.find('.Toastify__toast--error, .error-message').length > 0;
                if (hasError) {
                    cy.log('✅ Mensagem de erro encontrada via POM');
                } else {
                    // Verificar se ainda está na página de login
                    cy.get('[data-testid="email"]').should('be.visible');
                    cy.log('✅ Permaneceu na página de login');
                }
            });
        });

        it('login com senha inválida deve falhar', () => {
            // 🎬 SCREENPLAY: Login com senha errada
            invalidUser.attemptsTo(
                Login.withCredentials(
                    Cypress.env('departamento_regional_login'), 
                    'senhaErrada123'
                )
            );

            // 🎭 SCREENPLAY: Verificações
            invalidUser.asks(TheLoginState.ofCurrentUser().isLoggedOut());
            invalidUser.asks(TheLoginError.displayed().hasInvalidCredentialsError());

            // 🏠 POM: Usar método específico do POM para validação
            LoginActions.loginWithInvalidPassword();
        });

        it('deve testar campos obrigatórios', () => {
            // 🎬 SCREENPLAY: Usar task específica para campos obrigatórios
            invalidUser.attemptsTo(
                VerifyRequiredFields.ofLoginForm()
            );

            // 🎭 SCREENPLAY: Verificar que validação funcionou
            expect(invalidUser.recall('requiredFieldsValidated')).to.be.true;

            // 🏠 POM: Validação específica (POM tem os seletores específicos)
            LoginActions.verifyingRequiredFields();
        });
    });

    describe('🔄 Compatibilidade e Integração', () => {

        it('deve poder alternar entre Screenplay e POM no mesmo fluxo', () => {
            // 🎬 SCREENPLAY: Início do fluxo
            admin.attemptsTo(
                Login.asAdmin() // Login simples
            );

            // 🏠 POM: Meio do fluxo (para validação específica)
            LoginActions.checkLoginCookies();

            // 🎭 SCREENPLAY: Final do fluxo (verificação de estado)
            admin.asks(TheLoginState.ofCurrentUser().isLoggedIn());

            // 📊 Demonstrar que ambos funcionam juntos
            cy.log('✅ Fluxo híbrido: Screenplay para lógica + POM para validações específicas');
        });

        it('deve manter compatibilidade total com POM existente', () => {
            // 🏠 POM: Usar métodos POM diretamente quando necessário
            LoginActions.visit();
            LoginActions.loginAsAdmin();

            // 🎬 SCREENPLAY: Adicionar verificações Screenplay por cima
            admin.asks(TheLoginState.ofCurrentUser().isLoggedIn());

            cy.log('✅ POM continua funcionando + Screenplay adiciona valor');
        });
    });

    describe('🧠 Gerenciamento de Estado e Contexto', () => {

        it('deve gerenciar contexto entre diferentes usuários', () => {
            // 🎬 Login com primeiro usuário
            admin.attemptsTo(Login.asAdmin());
            expect(admin.recall('userType')).to.equal('admin');

            // 🎬 Login com segundo usuário  
            departamentoRegional.attemptsTo(Login.asDepartamentoRegional());
            expect(departamentoRegional.recall('userType')).to.equal('departamentoRegional');

            // ✅ Verificar que contextos são independentes
            expect(admin.recall('userType')).to.not.equal(departamentoRegional.recall('userType'));
            cy.log('✅ Contextos independentes mantidos corretamente');
        });
    });
});

/**
 * 📚 GUIA DE APLICAÇÃO PARA PRÓXIMOS TESTES:
 * 
 * 1️⃣ QUANDO USAR SCREENPLAY:
 *    - Fluxos de negócio complexos
 *    - Sequências de ações que fazem sentido como "tarefas"
 *    - Quando você quer linguagem natural legível
 *    - Gerenciamento de estado entre cenários
 * 
 * 2️⃣ QUANDO USAR POM:
 *    - Validações específicas de elementos
 *    - Lógica complexa de seletores
 *    - Reutilização de código já existente
 *    - Verificações detalhadas de DOM
 * 
 * 3️⃣ PADRÃO HÍBRIDO RECOMENDADO:
 *    - Screenplay para o "O QUE" (lógica de negócio)
 *    - POM para o "COMO" (implementação técnica)
 * 
 * 4️⃣ ESTRUTURA DE PASTAS RECOMENDADA:
 *    cypress/
 *    ├── screenplay/           # Screenplay Pattern
 *    │   ├── actors/
 *    │   ├── tasks/
 *    │   ├── questions/
 *    │   └── interactions/
 *    └── support/pages/        # POM tradicional
 *        ├── login/
 *        ├── navigation/
 *        └── ...
 */
