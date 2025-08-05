describe('Atendimento', () => {
    beforeEach(() => {
        cy.submitLoginForm('igor.conde@sistemafiepe.org.br', '123456');
        cy.goTo('/cad/atendimento/atendimento', 'Atendimentos');
    });
    it('deve acessar o módulo de atendimento', () => {
        cy.log('log')
    });
});