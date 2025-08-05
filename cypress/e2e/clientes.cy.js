describe('Gerenciamento de Clientes SGT', () => {
    beforeEach(() => {
        cy.submitLoginForm('igor.conde@sistemafiepe.org.br', '123456');
        cy.goTo('/cad/pessoa/cliente', 'Gerenciar Cliente');
    });
    it('deve acessar o módulo de clientes', () => {
        cy.log('log')
    });
});