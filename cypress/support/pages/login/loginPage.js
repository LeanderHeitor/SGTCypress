class LoginPage {
    // Identificador dos campos de login
    loginFields = {
        email: '[data-testid="email"]',
        password: '[data-testid="password"]',
        loginButton: '[data-testid="login-btn"]'
    }



    getDasboardTitle() {
        return cy.contains('h1', 'Dashboard')
    }

    getErrorToast() {

        return cy.contains('Email ou Senha incorretos.')
            .should('be.visible')
    }

    getLoginErrorMessage() {
        return cy.contains('Login é obrigatório. fasfasfasfa')
        .should('be.visible')
        .and('have.class', 'text-red-500')
    }
    getPasswordErrorMessage() {
        return cy.contains('Senha é obrigatória.')
            .should('be.visible')
            .and('have.class', 'text-red-500')
    }


}

export default LoginPage;