import LoginActions from '../support/pages/login/loginActions';
import NavigationActions from '../support/pages/navegação/navegacaoActions';
describe('Produção SGT', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {
        loginActions.visit();
        loginActions.loginWithValidCredentials();
    });
    it('deve acessar o módulo de produção grupo', () => {
        // Clica no link
        cy.get('.FirstSidebar a[href="/cad/atendimento/producao"]')
            .should('be.visible')
            .realHover()
            .click();

        // Aguarda página carregar com timeout maior
        cy.contains('Produção em Grupo', { timeout: 15000 })
            .should('be.visible');

        cy.log('Módulo de produção grupo carregado');
    });

    it('deve acessar o módulo de produção individual', () => {

        // Clica no link
        cy.get('.FirstSidebar a[href="/cad/atendimento/producao"]')
            .should('be.visible')
            .realHover().wait(5000)
        cy.contains('Produção Individual')
        .should('be.visible')
        .click();

        // Aguarda página carregar com timeout maior
        cy.contains('Produção Individual', { timeout: 15000 })
            .should('be.visible');

        cy.log('Módulo de produção individual carregado');
    });
});