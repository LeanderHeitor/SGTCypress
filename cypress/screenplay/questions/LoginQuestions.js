import BrowseTheWeb from '../abilities/BrowseTheWeb.js';
import LoginActions from '../../support/pages/login/loginActions.js';

/**
 * TheLoginState - Question para verificar estado de login
 * 
 * Responsabilidades:
 * - Verificar se usuário está logado
 * - Verificar presença de elementos de login/logout
 * - Integrar com validações POM quando necessário
 */
class TheLoginState {
    static ofCurrentUser() {
        return new TheLoginState();
    }

    async answeredBy(actor) {
        const browser = actor.abilityTo(BrowseTheWeb);
        
        try {
            // Verificar se dashboard está visível (indicador de login)
            await browser.locate('h1:contains("Dashboard")').should('be.visible');
            return 'logged_in';
        } catch {
            try {
                // Verificar se formulário de login está visível
                await browser.locate('[data-testid="email"]').should('be.visible');
                return 'logged_out';
            } catch {
                return 'unknown';
            }
        }
    }

    isLoggedIn() {
        return new LoginStateChecker('logged_in');
    }

    isLoggedOut() {
        return new LoginStateChecker('logged_out');
    }
}

/**
 * LoginStateChecker - Question helper para verificar estado específico
 */
class LoginStateChecker {
    constructor(expectedState) {
        this.expectedState = expectedState;
    }

    async answeredBy(actor) {
        const loginState = new TheLoginState();
        const currentState = await loginState.answeredBy(actor);
        return currentState === this.expectedState;
    }
}

/**
 * TheLoginError - Question para verificar erros de login
 */
class TheLoginError {
    static displayed() {
        return new TheLoginError();
    }

    async answeredBy(actor) {
        const browser = actor.abilityTo(BrowseTheWeb);
        
        try {
            // Procurar por toast de erro
            const errorToast = await browser.locateByText('Email ou Senha incorretos.');
            return 'invalid_credentials';
        } catch {
            try {
                // Procurar por mensagens de campo obrigatório
                const loginError = await browser.locateByText('Login é obrigatório.');
                const passwordError = await browser.locateByText('Senha é obrigatória.');
                return 'required_fields';
            } catch {
                return 'no_error';
            }
        }
    }

    hasInvalidCredentialsError() {
        return new LoginErrorChecker('invalid_credentials');
    }

    hasRequiredFieldsError() {
        return new LoginErrorChecker('required_fields');
    }
}

/**
 * LoginErrorChecker - Question helper para verificar tipo específico de erro
 */
class LoginErrorChecker {
    constructor(expectedErrorType) {
        this.expectedErrorType = expectedErrorType;
    }

    async answeredBy(actor) {
        const loginError = new TheLoginError();
        const currentErrorType = await loginError.answeredBy(actor);
        return currentErrorType === this.expectedErrorType;
    }
}

/**
 * TheLoginCookies - Question para verificar cookies de login
 * Integra com lógica POM existente
 */
class TheLoginCookies {
    static present() {
        return new TheLoginCookies();
    }

    async answeredBy(actor) {
        return new Promise((resolve) => {
            cy.getAllCookies().then((cookies) => {
                const sgtCookie = cookies.find(cookie => cookie.name === 'sgt.sid');
                const jsessionCookie = cookies.find(cookie => cookie.name === 'JSESSIONID');
                
                const result = {
                    sgtCookie: sgtCookie ? { 
                        exists: true, 
                        hasValue: !!sgtCookie.value 
                    } : { exists: false, hasValue: false },
                    jsessionCookie: jsessionCookie ? { 
                        exists: true, 
                        hasValue: !!jsessionCookie.value 
                    } : { exists: false, hasValue: false }
                };
                
                resolve(result);
            });
        });
    }

    areValid() {
        return new LoginCookiesChecker('areValid');
    }

    sgtCookieExists() {
        return new LoginCookiesChecker('sgtCookieExists');
    }

    jsessionCookieExists() {
        return new LoginCookiesChecker('jsessionCookieExists');
    }
}

/**
 * LoginCookiesChecker - Question helper para verificar cookies específicos
 */
class LoginCookiesChecker {
    constructor(checkType) {
        this.checkType = checkType;
    }

    async answeredBy(actor) {
        const loginCookies = new TheLoginCookies();
        const cookies = await loginCookies.answeredBy(actor);
        
        switch (this.checkType) {
            case 'areValid':
                return cookies.sgtCookie.hasValue && cookies.jsessionCookie.hasValue;
            case 'sgtCookieExists':
                return cookies.sgtCookie.exists;
            case 'jsessionCookieExists':
                return cookies.jsessionCookie.exists;
            default:
                return false;
        }
    }
}

export { TheLoginState, TheLoginError, TheLoginCookies };
