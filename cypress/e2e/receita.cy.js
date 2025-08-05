describe('Receita SGT', () => {
    beforeEach(() => {
        cy.submitLoginForm('igor.conde@sistemafiepe.org.br', '123456');
        cy.goTo('/receita', 'Receita');
    });
    it('deve acessar o módulo de receita', () => {
        cy.log('log')
    });
});