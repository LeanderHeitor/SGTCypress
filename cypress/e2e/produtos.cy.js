describe('Produtos Regionais SGT', () => {
    it('deve acessar o módulo de produtos regionais', () => {
        cy.submitLoginForm('igor.conde@sistemafiepe.org.br', '123456');
        cy.goTo('/cad/atendimento/produtoRegional', 'Produtos Regionais');
        cy.log('log')
    });
});