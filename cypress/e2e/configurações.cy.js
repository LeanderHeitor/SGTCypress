describe('Configurações SGT', () => {
    beforeEach(() => {
        //usuario sem acesso
        cy.submitLoginForm('igor.conde@sistemafiepe.org.br', '123456');
        cy.goTo('/cad/parametro', 'Sem acesso');
    });
    it('deve acessar o módulo de configurações usuario sem acesso', () => {
        cy.log('log')
    });
});