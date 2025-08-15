import LoginPage from './loginPage';

class LoginActions {
    constructor() {
        this.loginPage = new LoginPage();
    }
    visit() {
        cy.start()
    }
    fillEmail(email) {
        cy.get(this.loginPage.loginFields.email).type(email)
    }

    fillPassword(password) {
        cy.get(this.loginPage.loginFields.password).type(password)
    }

    clickLogin() {
        cy.get(this.loginPage.loginFields.loginButton).click()
    }

    login(email, password) {
        this.fillEmail(email);
        this.fillPassword(password);
        this.clickLogin();
        this.loginPage.getDasboardTitle().should('be.visible');
        return this
    }
    loginWithValidCredentials() {
        const email = Cypress.env('departamento_regional_login') || Cypress.env('admin_login_email');
        const senha = Cypress.env('departamento_regional_password') || Cypress.env('admin_login_senha');
        return this.login(email, senha);
    }
    loginAsDepartamentoRegional() {
        const email = Cypress.env('departamento_regional_login');
        const senha = Cypress.env('departamento_regional_password');
        return this.login(email, senha);
    }
    loginAsAdmin() {
        const email = Cypress.env('admin_login_email');
        const senha = Cypress.env('admin_login_senha');
        return this.login(email, senha);
    }
    loginWithInvalidCredentials() {
        const email = Cypress.env('invalid_login_email');
        const senha = Cypress.env('invalid_login_senha');

        this.fillEmail(email);
        this.fillPassword(senha);
        this.clickLogin();
        this.loginPage.getErrorToast()
        this.loginPage.getDasboardTitle().should('not.exist');
        return this
    }
    loginWithInvalidPassword() {
        const email = Cypress.env('departamento_regional_login');
        const senha = Cypress.env('invalid_login_senha');
        this.fillEmail(email);
        this.fillPassword(senha);
        this.clickLogin();
        this.loginPage.getErrorToast()
        this.loginPage.getDasboardTitle().should('not.exist');
        return this
    }
    verifyingRequiredFields() {
        this.clickLogin();
        this.loginPage.getLoginErrorMessage()
        this.loginPage.getPasswordErrorMessage()
        this.loginPage.getDasboardTitle().should('not.exist');
        return this
    }
    loginWithNonExistentEmail() {
        this.fillEmail('esseemailnaoexiste@sistemafiepe.org.br');
        this.fillPassword('123456');
        this.clickLogin();
        this.loginPage.getErrorToast()
        this.loginPage.getDasboardTitle().should('not.exist');
        return this
    }
    checkLoginCookies() {
        cy.getAllCookies().then((cookies) => {
            //só executa depois que os cookies são recuperados
            // Verifica se os cookies específicos existem no array
            const sgtCookie = cookies.find(cookie => cookie.name === 'sgt.sid');
            const jsessionCookie = cookies.find(cookie => cookie.name === 'JSESSIONID');

            if (sgtCookie) {
                cy.log('Cookie sgt.sid encontrado no array:', JSON.stringify(sgtCookie, null, 2));
                expect(sgtCookie).to.have.property('value');
                expect(sgtCookie.value).to.not.be.empty;
            } else {
                cy.log('Cookie sgt.sid NÃO encontrado no array');
            }

            if (jsessionCookie) {
                cy.log('Cookie JSESSIONID encontrado no array:', JSON.stringify(jsessionCookie, null, 2));
                expect(jsessionCookie).to.have.property('value');
                expect(jsessionCookie.value).to.not.be.empty;
            } else {
                cy.log('Cookie JSESSIONID NÃO encontrado no array');
            }

        })
    }
}
export default new LoginActions();
