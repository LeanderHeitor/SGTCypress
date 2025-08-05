describe('Produção SGT', () => {
    beforeEach(() => {

    });
    it('deve acessar o módulo de produção grupo', () => {
        cy.submitLoginForm('igor.conde@sistemafiepe.org.br', '123456');

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

    it.only('deve acessar o módulo de produção individual', () => {
        cy.viewport('macbook-15');
        cy.submitLoginForm('igor.conde@sistemafiepe.org.br', '123456');

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