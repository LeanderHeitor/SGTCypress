describe('Dashboard SGT', () => {
    it('deve acessar o módulo de dashboard', () => {
        cy.submitLoginForm('igor.conde@sistemafiepe.org.br', '123456');
        
        // Clica no link
        cy.get('.FirstSidebar a[href="/dashboard"]')
          .should('be.visible')
          .realHover()
          .click();
        
        // Aguarda página carregar com timeout maior
        cy.contains('h1', 'Dashboard', { timeout: 5000 })
          .should('be.visible');

        cy.log('Módulo de dashboard carregado');
    });
});