describe('Home SGT', () => {
    beforeEach(() => {
        cy.submitLoginForm('igor.conde@sistemafiepe.org.br', '123456');
        cy.goTo('/home', 'Dashboard');
    });
    it('deve acessar o módulo de home', () => {
        cy.log('log')
    });
});