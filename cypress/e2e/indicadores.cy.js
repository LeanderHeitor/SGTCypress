describe('Indicadores SGT', () => {
    beforeEach(() => {
        cy.submitLoginForm('igor.conde@sistemafiepe.org.br', '123456');
        cy.goTo('/cad/sistema/kpi-business', 'KPI List');
    });
    it('deve acessar o módulo de indicadores', () => {
        cy.log('log')
    });
});