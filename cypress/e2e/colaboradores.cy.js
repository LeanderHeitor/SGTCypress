describe('Gerenciamento de Colaboradores SGT', () => {
    beforeEach(() => {
        cy.submitLoginForm('igor.conde@sistemafiepe.org.br', '123456');
        cy.goTo('/cad/pessoa/colaborador', 'Gerenciar Colaborador');
    });
    it('deve acessar o módulo de colaboradores', () => {
        cy.log('log')
    });
});