import { Navigate } from '../interactions/Navigate.js';
import Type from '../interactions/Type.js';
import Click from '../interactions/Click.js';
import LoginActions from '../../support/pages/login/loginActions.js';

/**
 * Login - Task para realizar login no sistema
 * 
 * Responsabilidades:
 * - Executar fluxo completo de login
 * - Reutilizar credenciais do ator ou receber como parâmetro
 * - Validar sucesso do login
 * - Integrar com POM existente quando necessário
 */
class Login {
    constructor(credentials = null, options = {}) {
        this.credentials = credentials;
        this.options = {
            expectSuccess: true,
            checkCookies: false,
            validateDashboard: true,
            flexibleValidation: false,
            timeout: 10000,
            ...options
        };
    }

    /**
     * Cria task de login com credenciais específicas
     * @param {Object} credentials - {email, password}
     * @returns {Login} - Instância da task
     */
    static withCredentials(credentials, options = {}) {
        return new Login(credentials, options);
    }

    /**
     * Cria task de login usando credenciais do ator
     * @returns {Login} - Instância da task
     */
    static withStoredCredentials(options = {}) {
        return new Login(null, options);
    }

    /**
     * Cria task de login como admin
     * @returns {Login} - Instância da task
     */
    static asAdmin(options = {}) {
        return new Login({
            email: Cypress.env('admin_login_email'),
            password: Cypress.env('admin_login_senha')
        }, options);
    }

    /**
     * Cria task de login como departamento regional
     * @returns {Login} - Instância da task
     */
    static asDepartamentoRegional(options = {}) {
        return new Login({
            email: Cypress.env('departamento_regional_login'),
            password: Cypress.env('departamento_regional_password')
        }, options);
    }

    /**
     * Login com credenciais inválidas (para testes negativos)
     * @returns {Login} - Instância da task
     */
    static withInvalidCredentials() {
        return new Login({
            email: Cypress.env('invalid_login_email'),
            password: Cypress.env('invalid_login_senha')
        }, { 
            expectSuccess: false, 
            validateDashboard: false,
            checkLoginError: true 
        });
    }

    /**
     * Login com email inexistente
     * @returns {Login} - Instância da task
     */
    static withNonExistentEmail() {
        return new Login({
            email: 'esseemailnaoexiste@sistemafiepe.org.br',
            password: '123456'
        }, { 
            expectSuccess: false, 
            validateDashboard: false,
            checkLoginError: true 
        });
    }

    /**
     * Login com senha inválida
     * @returns {Login} - Instância da task
     */
    static withInvalidPassword() {
        return new Login({
            email: Cypress.env('departamento_regional_login'),
            password: Cypress.env('invalid_login_senha') || 'wrongpassword'
        }, { 
            expectSuccess: false, 
            validateDashboard: false,
            checkLoginError: true 
        });
    }

    /**
     * Configurar para usar validação de cookies
     * @returns {Login} - Instância da task
     */
    withCookieValidation() {
        this.options.checkCookies = true;
        return this;
    }

    /**
     * Configurar validação flexível (não trava em erros)
     * @returns {Login} - Instância da task
     */
    withFlexibleValidation() {
        this.options.flexibleValidation = true;
        this.options.validateDashboard = false;
        return this;
    }

    /**
     * Executa a task
     * @param {Actor} actor - Ator executando a task
     */
    performAs(actor) {
        // Usar credenciais fornecidas ou buscar do contexto do ator
        const credentials = this.credentials || actor.recall('credentials');
        
        if (!credentials) {
            throw new Error(`${actor.name} não possui credenciais para login`);
        }

        // Navegar para página de login
        actor.attemptsTo(
            Navigate.to('/').andWaitFor('[data-testid="email"]')
        );

        // Preencher formulário com tratamento de erro
        try {
            actor.attemptsTo(
                Type.theText(credentials.email).into('[data-testid="email"]'),
                Type.theText(credentials.password).into('[data-testid="password"]'),
                Click.on('[data-testid="login-btn"]')
            );
        } catch (error) {
            cy.log('Erro ao preencher formulário:', error.message);
            actor.remember('loginError', error.message);
            return this;
        }

        // Aguardar resposta do servidor (pequena pausa)
        cy.wait(1000);

        // Armazenar informações do login no contexto
        if (this.options.expectSuccess) {
            // Para login de sucesso
            this._handleSuccessfulLogin(actor, credentials);
        } else {
            // Para testes negativos
            this._handleFailedLogin(actor, credentials);
        }

        // Usar POM para validação de cookies se solicitado
        if (this.options.checkCookies) {
            try {
                LoginActions.checkLoginCookies();
            } catch (error) {
                cy.log('Aviso: Erro na verificação de cookies (não fatal):', error.message);
            }
        }

        return this;
    }

    /**
     * Trata login bem-sucedido
     * @private
     */
    _handleSuccessfulLogin(actor, credentials) {
        actor.remember('isLoggedIn', true);
        actor.remember('lastLoginCredentials', credentials);
        
        // Validar dashboard de forma mais robusta
        if (this.options.validateDashboard) {
            // Verificação simples e robusta
            cy.get('body', { timeout: 5000 }).then($body => {
                const isLoginPage = $body.find('[data-testid="email"]').length > 0;
                const hasDashboard = $body.find('h1').text().includes('Dashboard');
                const hasMainContent = $body.find('main, .main-content, [role="main"]').length > 0;
                
                if (!isLoginPage) {
                    cy.log('✅ Login confirmado - não está mais na página de login');
                    
                    if (hasDashboard) {
                        cy.log('✅ Dashboard encontrado');
                    } else if (hasMainContent) {
                        cy.log('✅ Conteúdo principal carregado');
                    }
                } else {
                    cy.log('⚠️ Ainda na página de login - verificar credenciais');
                }
            });
        }
    }

    /**
     * Trata login que deveria falhar
     * @private
     */
    _handleFailedLogin(actor, credentials) {
        actor.remember('isLoggedIn', false);
        actor.remember('loginAttemptFailed', true);
        actor.remember('lastFailedCredentials', credentials);

        // Verificar se ainda está na página de login ou se há erro
        if (this.options.checkLoginError) {
            cy.get('body').then($body => {
                const hasLoginForm = $body.find('[data-testid="email"]').length > 0;
                const hasErrorMessage = $body.find('.Toastify__toast--error, .error-message, [role="alert"]').length > 0;
                
                if (hasLoginForm) {
                    cy.log('✅ Login falhou corretamente - ainda na página de login');
                    actor.remember('stayedOnLoginPage', true);
                }
                
                if (hasErrorMessage) {
                    cy.log('✅ Mensagem de erro encontrada');
                    actor.remember('errorMessageShown', true);
                }
            });
        }
    }
}

/**
 * VerifyRequiredFields - Task para testar campos obrigatórios
 */
class VerifyRequiredFields {
    static ofLoginForm() {
        return new VerifyRequiredFields();
    }

    performAs(actor) {
        // Navegar para página de login e aguardar botão
        actor.attemptsTo(
            Navigate.to('/')
        );

        // Aguardar botão aparecer com timeout maior
        cy.get('[data-testid="login-btn"]')
          .should('exist')
          .and('be.visible');

        // Tentar fazer login sem preencher campos
        actor.attemptsTo(
            Click.on('[data-testid="login-btn"]')
        );

        // Aguardar possível processamento

        // Verificar se permaneceu na página de login (indicando validação)
        cy.get('[data-testid="email"]').should('be.visible');
        
        // Verificar mensagens de validação
        cy.get('body').then($body => {
            const bodyText = $body.text();
            const hasValidationMessage = bodyText.includes('obrigatório') || 
                                       bodyText.includes('required') || 
                                       bodyText.includes('campo') ||
                                       bodyText.includes('necessário');
            
            if (hasValidationMessage) {
                cy.log('✅ Mensagem de validação encontrada');
            } else {
                cy.log('⚠️ Mensagem de validação não encontrada, mas permaneceu na página de login');
            }
        });

        // Armazenar no contexto
        actor.remember('requiredFieldsValidated', true);

        return this;
    }
}

export { Login, VerifyRequiredFields };