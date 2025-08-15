import loginActions from "../../support/pages/login/loginActions";
import navegacaoActions from "../../support/pages/navegação/navegacaoActions";

describe('Laboratórios SGT', () => {
    beforeEach(() => {
        loginActions.visit();
        loginActions.loginAsAdmin();
    });
    it('deve acessar o módulo de laboratórios como Admin', () => {
        navegacaoActions.goToLaboratorios();
        cy.log('Módulo de laboratórios carregado');
    });
});